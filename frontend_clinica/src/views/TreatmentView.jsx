import { useParams } from "react-router-dom";
import styles from 'src/views/TreatmentView.module.css';
import MainLayout from 'src/components/MainLayout.jsx';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import img from 'src/assets/stock2.jpg'
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from "react";

async function getItem(numero, lista) {
  try {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(1);
    for (let i = 0; i < lista.length; i++) {
      if (lista[i].id === parseInt(numero)) {
        return lista[i];
      }
    }
    return null;
  } catch (error) {
    console.error('Error fetching item:', error);
    return null;
  }
}




function TreatmentView() {
  const { id } = useParams();
  const [treatment, setTreatment] = useState(null);
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


  useEffect(() => {
    const fetchData = async () => {
      const result = await getItem(id, treatments);
      setTreatment(result);
    };
    fetchData();
  }, [id]);

  return (
    <MainLayout>
      <div className={styles.page}>
        <Container>
          <Row >
            <Col className={styles.title} xs={10}>
              <h2 className="text-center fs-1 fw-semibold my-3">{treatment?.nombre}</h2>
            </Col>
          </Row>
          <Row className='mt-5'>
            <Col className="align-self-center" xs={12} md={4}>
              <Image src={img} fluid />
            </Col>
            <Col xs={12} md={8}>
              <p className="fs-3">{treatment?.llamativo}</p>
              <p className="fs-3">{treatment?.explicacion}</p>
              <p className="fs-3">{treatment?.razon}</p>
            </Col>
          </Row>

          {/*Content carousel*/}
          <Row>

            <Col>

            </Col>
          </Row>


          <Row className="mt-5">
            <Col className="my-5" xs={12}>
              <h3 className="fs-1 mb-3">Sobre la sesión:</h3> <br />
              <p className="fs-3">{treatment?.sesion} </p>
            </Col>
            <Col className="my-5" xs={12}>
              <h3 className="fs-1 mb-3">Recomendaciones:</h3> <br />
              <p className="fs-3">{treatment?.recomendacion} </p>
            </Col>
            <Col className="my-5" xs={12}>
              <h3 className="fs-1 mb-3">Métodos de pago:</h3> <br />
              <p className="fs-3">Ofrecemos los siguientes métodos de pago: transferencia bancaria, Sinpe Móvil y link de pago directo con Conexión BP. ¿Listo para realizar tu compra? ¡Contáctanos por WhatsApp y agenda tu cita hoy mismo! </p>
            </Col>
          </Row>
          <Row>
            <Col>
            <Button variant="success btn-lg">Agenda tu cita</Button> <br />
            <Button variant="success btn-lg">Conexión BP</Button>
            </Col>
            <Col>
            
            </Col>
            <Col>
            
            </Col>
          </Row>

          

        </Container>
      </div>
    </MainLayout>
  );
}

export default TreatmentView;
