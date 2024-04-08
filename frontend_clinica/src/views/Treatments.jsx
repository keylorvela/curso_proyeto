import styles from 'src/views/Treatments.module.css'
import MainLayout from 'src/components/MainLayout.jsx'
import Treatment from 'src/components/Treatment.jsx'
import ContentTable from 'src/components/ContentTable.jsx'
import Col from 'react-bootstrap/Col'


import { useNavigate } from "react-router-dom";


function Treatments() {
    const navigate = useNavigate();
    const handleClick = (id) => {
        navigate(`/treatment/${id}`);
    };
    const treatments = [
        {
          "id": 1,
          "nombre": "Limpieza Facial",
          "llamativo": "Revitaliza tu piel y elimina impurezas",
          "explicacion": "La limpieza facial es un procedimiento que ayuda a eliminar las impurezas de la piel, como el exceso de grasa, células muertas y residuos de maquillaje. Ayuda a limpiar los poros, prevenir el acné y revitalizar la piel.",
          "razon": "La limpieza facial regular puede mejorar la apariencia y la textura de la piel, dejándola más suave y radiante. También puede ayudar a prevenir problemas de la piel y a mantenerla saludable.",
          "sesion": "Se recomienda realizar una limpieza facial al menos una vez al mes para mantener la piel limpia y saludable.",
          "recomendacion": "Después de una limpieza facial, es importante mantener una rutina de cuidado de la piel adecuada, incluyendo la hidratación y protección solar."
        },
        {
          "id": 2,
          "nombre": "Tratamiento de Microdermoabrasión",
          "llamativo": "Renueva tu piel y reduce las imperfecciones",
          "explicacion": "La microdermoabrasión es un tratamiento estético que utiliza un dispositivo mecánico para exfoliar suavemente la capa superior de la piel. Ayuda a eliminar células muertas, reducir manchas y mejorar la textura de la piel.",
          "razon": "La microdermoabrasión puede ayudar a mejorar el aspecto de la piel, reduciendo la apariencia de líneas finas, arrugas, manchas oscuras y cicatrices de acné. También puede estimular la producción de colágeno, promoviendo la renovación celular.",
          "sesion": "El número de sesiones de microdermoabrasión necesarias puede variar según las necesidades individuales de la piel. Se recomienda generalmente realizar varias sesiones para obtener resultados óptimos.",
          "recomendacion": "Después del tratamiento de microdermoabrasión, es importante proteger la piel del sol y mantenerla bien hidratada para ayudar en el proceso de recuperación."
        },
        {
          "id": 3,
          "nombre": "Tratamiento de Radiofrecuencia Facial",
          "llamativo": "Reafirma y rejuvenece tu piel",
          "explicacion": "La radiofrecuencia facial es un procedimiento estético no invasivo que utiliza energía de radiofrecuencia para calentar las capas profundas de la piel. Esto estimula la producción de colágeno y elastina, mejorando la firmeza y la elasticidad de la piel.",
          "razon": "La radiofrecuencia facial puede ayudar a reducir la flacidez de la piel, mejorar la definición del contorno facial y suavizar las arrugas y líneas de expresión. También puede mejorar la textura de la piel y reducir el tamaño de los poros.",
          "sesion": "El número de sesiones de radiofrecuencia facial necesarias puede variar según las necesidades individuales de la piel y los objetivos de tratamiento. Se recomienda un plan de tratamiento personalizado para obtener los mejores resultados.",
          "recomendacion": "Después del tratamiento de radiofrecuencia facial, es importante seguir las recomendaciones del profesional y mantener una rutina de cuidado de la piel adecuada para prolongar los resultados."
        },
        {
          "id": 4,
          "nombre": "Tratamiento de Peelings Químicos",
          "llamativo": "Renueva tu piel y mejora su textura",
          "explicacion": "Los peelings químicos son tratamientos estéticos que utilizan ácidos para exfoliar la capa externa de la piel. Ayudan a eliminar células muertas, mejorar la textura de la piel y reducir la apariencia de manchas, cicatrices y arrugas.",
          "razon": "Los peelings químicos pueden ser beneficiosos para tratar una variedad de problemas de la piel, incluyendo el acné, la hiperpigmentación, el envejecimiento prematuro y la textura irregular. Ayudan a promover la renovación celular y estimulan la producción de colágeno.",
          "sesion": "El tipo de peeling químico y el número de sesiones necesarias pueden variar según las necesidades individuales de la piel y los objetivos de tratamiento. Es importante consultar con un profesional para determinar el plan de tratamiento adecuado.",
          "recomendacion": "Después del tratamiento de peelings químicos, es importante proteger la piel del sol y seguir las recomendaciones del profesional para cuidar la piel durante el proceso de recuperación."
        },
        {
          "id": 5,
          "nombre": "Tratamiento de Hidratación Profunda",
          "llamativo": "Restaura la hidratación y la luminosidad de tu piel",
          "explicacion": "El tratamiento de hidratación profunda es un procedimiento estético que utiliza ingredientes hidratantes para restaurar la humedad de la piel. Ayuda a suavizar, calmar y revitalizar la piel, dejándola más luminosa y saludable.",
          "razon": "La hidratación profunda es esencial para mantener la piel sana y protegida contra los efectos del envejecimiento, la contaminación y otros factores ambientales. Ayuda a fortalecer la barrera cutánea y a mantener el equilibrio de humedad de la piel.",
          "sesion": "El tratamiento de hidratación profunda puede ser beneficioso para todo tipo de piel, especialmente para la piel seca, deshidratada o sensible. Se puede realizar como un tratamiento único o como parte de un régimen de cuidado de la piel regular.",
          "recomendacion": "Después del tratamiento de hidratación profunda, es importante mantener una rutina de cuidado de la piel adecuada, incluyendo la aplicación regular de humectantes y protectores solares."
        }
      ]
      



    return (
        <MainLayout>

            <div className={styles.page}>

                <div className={styles.main}>
                </div>
                <div className={styles.treatments}>
                    <ContentTable title="Tratamientos disponibles" >
                        {treatments.map((item, index) => (
                            <Col key={index} sm={4}>
                                <Treatment
                                    title={item.nombre}
                                    event={() => handleClick(item.id)}
                                />
                            </Col>
                        ))}
                    </ContentTable>
                </div>
            </div>


        </MainLayout >
    );
}

export default Treatments;  