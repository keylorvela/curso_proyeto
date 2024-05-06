
import AlertModal from 'src/components/utils/AlertModal.jsx'

import { useState } from "react";
import { Button } from 'react-bootstrap';


function Test() {
    const [showAlert, setShowAlert] = useState(false);


    return (
        <>
            <Button onClick = {() => setShowAlert(true)}>CLICK</Button>
            <AlertModal
                  type="info"
                  title="Atención"
                  message="No se encontraron tratamientos."
                  showAlert={showAlert}
                  setShowAlert={setShowAlert}
                />
        </>
    );

}


export default Test;