import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import MainLayout from 'src/components/MainLayout.jsx'
import DynamicForm from 'src/components/DynamicForm.jsx'
import Loading from 'src/components/utils/Loading.jsx'

import styles from 'src/views/admin/AdminPage.module.css'
import noImage from 'src/assets/noImage.jpg'

import AlertModal from 'src/components/utils/AlertModal.jsx'
import YesNoModal from 'src/components/utils/YesNoModal.jsx'

import { Container, Row, Col, Image } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import tServ from 'src/services/Treatments.service.js'
import CategoriesService from 'src/services/Categories.service';
import ImageService from 'src/services/Image.service.js'


function ManageTreatment() {
    const navigate = useNavigate();
    const location = useLocation();

    const [alertMessage, setAlertMessage] = useState("");
    const [showAlertTreatment, setShowAlertTreatment] = useState(false);
    const [showAlertDeleteTreatment, setShowAlertDeleteTreatment] = useState(false);

    const [categoryList, setCategoryList] = useState([]);
    const [values, setValues] = useState(location.state?.treatmentInfo);
    const [loading, setLoading] = useState(true);
    const [updatedData, setUpdatedData] = useState(false);
    const [imageUrl, setImageUrl] = useState(location.state?.treatmentInfo?.TreatmentImage || noImage);

    const { id } = useParams() || null;

    //  A possible use
    useEffect(() => {
        async function fetchData() {
            try {
                const data_raw = await CategoriesService.getCategories();
                const new_data = data_raw.map(category => ({
                    label: category.CategoryName,
                    value: category.ID,
                }))
                setCategoryList(new_data);
                //if (updatedData || (!(values ?? null) && (id ?? null))) {
                const data = await tServ.getTreatment(id);
                setValues(data);
                setUpdatedData(false);
                //}
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [updatedData]);

    const uploadImage = async () => {
        try {
            if (imageUrl) {
                const data = await ImageService.uploadImage(imageUrl);
                setImageUrl(data.data.image.url);
                return data.data.image.url;
            }

        } catch (error) {
            console.error("ERROR: Upload Failed ", error);
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageUrl(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleButtonFile = () => {
        document.getElementById('fileInput').click();
    };

    const handleDelete = async () => {
        try {
            setLoading(true);
            if (id) {
                const request = await tServ.deleteTreatment( id );
                if (request.status === 200)
                    setShowAlertDeleteTreatment(false);
                navigate('/admin/treatments');
            }

        } catch (error) {
            console.error('Treatments failed:', error);
        } finally {
            setLoading(false);
        }
    }

    const handleFormSubmit = async (formValues) => {
        try {
            setLoading(true);
            let imgPromise = null;
            let imageURL = (imageUrl === noImage) ? '' : imageUrl;

            if (imageUrl !== noImage) {
                imgPromise = uploadImage();
                await imgPromise.then(url => {
                    imageURL = url;
                });
            }
            if (!id) {
                const request = await tServ.createTreatment(formValues, imageURL);
                if (request.status === 200) {
                    setAlertMessage("Se registro el tratamiento con éxito.");
                    setImageUrl(noImage);
                }
            }
            else {
                const request = await tServ.updateTreatment(formValues, imageURL);
                if (request.status === 200) {
                    setAlertMessage("Se modifico el tratamiento con éxito.");
                    setUpdatedData(true);
                }
            }
            setShowAlertTreatment(true);
        } catch (error) {
            console.error('Treatments failed:', error);
        } finally {
            setLoading(false);
        }
    };

    //TODO Workaround categories
    // No todos los campos son necesarios
    const fields = [
        {
            id: 'Name',
            label: 'Nombre del tratamiento:',
            type: 'text',
            placeholder: 'Ingresa el nombre del tratamiento',
            required: true,
        },
        {
            id: 'Description',
            label: 'Descripción:',
            type: 'textarea',
            placeholder: 'Ingresa la descripción del tratamiento',
            required: true,
            rows: 6
        },
        {
            id: 'Includes',
            label: 'Incluye:',
            type: 'textarea',
            placeholder: 'Ingresa las características del tratamiento',
            required: false,
            rows: 6
        },
        {
            id: 'ProcedureDuration',
            label: 'Duración del procedimiento:',
            type: 'text',
            placeholder: 'Ingresa la duración',
            required: false,
        },
        {
            id: 'EffectDuration',
            label: 'Duración del efecto:',
            type: 'text',
            placeholder: 'Ingresa la duración del efecto',
            required: false,
        },
        {
            id: 'Information',
            label: 'Información adicional:',
            type: 'textarea',
            placeholder: 'Ingresa información adicional del tratamiento',
            required: false,
            rows: 6
        },
        {
            id: 'Price',
            label: 'Costo:',
            type: 'number',
            placeholder: 'Costo del tratamiento',
            required: true,
        },
        {
            id: 'PayLink',
            label: 'Link de pago:',
            type: 'text',
            placeholder: 'Ingrese la url para el pago en linea',
            required: true,
        },
        {
            id: 'category',
            label: 'Categoría',
            type: 'select',
            placeholder: 'Selecciona la categoría',
            options: categoryList,
            required: true,
        }
    ];

    const buttons = []
    if (id) {
        buttons.push(
            {
                variant: 'danger',
                type: 'button',
                label: 'Eliminar tratamiento',
                onClick: () => setShowAlertDeleteTreatment(true),
                parameter: id
            }
        )
    }

    //Always at the end
    buttons.push({ variant: 'primary', type: 'submit', label: 'Guardar cambios' });

    return (
        <MainLayout type={1}>
            <AlertModal
                type="light"
                title="Información"
                message={alertMessage}
                showAlert={showAlertTreatment}
                setShowAlert={setShowAlertTreatment}
            />
            <YesNoModal
                question={"¿Estás seguro que deseas continuar con esta acción?"}
                message={"Se eliminará el tratamiento permanentemente."}
                showAlert={showAlertDeleteTreatment}
                setShowAlert={setShowAlertDeleteTreatment}
                handleYes={handleDelete}
            />

            <div className={styles.page}>
                <Container fluid>

                    {loading && (
                        <div className='text-center my-5 position-absolute w-100'>
                            <Loading size={11} />
                        </div>
                    )}
                    <Row className='d-flex flex-wrap'>
                        <Col className='mt-2 flex-grow-1 d-flex justify-content-center' sm={12} lg={5}>

                            <div className={styles.image_container}>
                                <Image src={imageUrl} className={styles.ProfilePicture} fluid rounded/>
                                <input
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    id="fileInput"
                                    onChange={handleImageChange}
                                />
                                <button
                                    className={`fw-bold ${styles.btnImage}`}
                                    onClick={handleButtonFile}>
                                    <FontAwesomeIcon icon={faEdit} style={{ fontSize: '1.5em' }} />
                                </button>

                            </div>

                        </Col>

                        <Col className='mt-2 flex-grow-1' sm={12} lg={7}>
                            <DynamicForm
                                fields={fields}
                                onSubmit={handleFormSubmit}
                                buttons={buttons}
                                initialValues={values}
                            />

                        </Col>
                    </Row>

                </Container>
            </div>


        </MainLayout>
    );
}

export default ManageTreatment;