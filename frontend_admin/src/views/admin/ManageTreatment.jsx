
import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import MainLayout from 'src/components/MainLayout.jsx'
import DynamicForm from 'src/components/DynamicForm.jsx'
import Loading from 'src/components/utils/Loading.jsx'

import img from 'src/assets/stock2.jpg'
import styles from 'src/views/admin/AdminPage.module.css'

import { Container, Row, Col, Image } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import tServ from 'src/services/Treatments.service.js'
import ImageService from 'src/services/Image.service.js'


function ManageTreatment() {
    const location = useLocation();
    const [values, setValues] = useState(location.state?.treatmentInfo);
    const [loading, setLoading] = useState(true);
    const [imageUrl, setImageUrl] = useState(img);


    const { id } = useParams() || null;


    //  A possible use
    useEffect(() => {
        async function fetchData() {

            try {
                if (!(values ?? null) && (id ?? null)) {
                    const data = await tServ.getTreatment(id);
                    setValues(data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);


    const uploadImage = async () => {
        try {
            if (imageUrl) {
                const data = await ImageService.uploadImage(imageUrl);
                console.log(data.data.image.url);
                setImageUrl(data.data.image.url);
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

    const handleDelete = (id_p) => {
        alert(id_p);
    }

    const handleFormSubmit = async (formValues) => {
        uploadImage();
        alert(JSON.stringify(formValues))
    };



    //TODO Workaround categories
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
            id: 'Price',
            label: 'Costo:',
            type: 'number',
            placeholder: 'Costo del tratamiento',
            required: true,
        },
        {
            id: 'categoria',
            label: 'Categoría',
            type: 'select',
            placeholder: 'Selecciona la categoría',
            options: [
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
                { value: 'other', label: 'Other' },
            ],
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
                onClick: (id) => handleDelete(id),
                parameter: id
            }
        )
    }


    //Always at the end
    buttons.push({ variant: 'primary', type: 'submit', label: 'Guardar cambios' });


    return (
        <MainLayout type={1}>

            <div className={styles.page}>
                <Container>

                    {loading ? (
                        <div className='text-center'>
                            <Loading size={15} />
                        </div>
                    ) : (
                        <Row >
                            <Col className='mt-2' xs={12} md={4} style={{ position: 'relative' }}>
                                <Image
                                    src={imageUrl}
                                    fluid
                                    rounded
                                    style={{ width: '100%', height: '50%', objectFit: 'cover' }}
                                />
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
                            </Col>

                            {/*filler*/}
                            <Col md={1}>
                            </Col>

                            <Col className='mt-2' xs={12} md={7}>
                                <DynamicForm
                                    fields={fields}
                                    onSubmit={handleFormSubmit}
                                    buttons={buttons}
                                    initialValues={values}
                                />

                            </Col>
                        </Row>
                    )}

                </Container>
            </div>


        </MainLayout>
    );
}

export default ManageTreatment;