import React from 'react';
import DynamicTable from 'src/components/DynamicTable.jsx';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

function Professors() {
    const columns = ['Nombre', 'Edad', 'Email'];
    const data = [
        { Nombre: 'Juan', Edad: 25, Email: 'juan@example.com' },
        { Nombre: 'María', Edad: 30, Email: 'maria@example.com' },
        { Nombre: 'Pedro', Edad: 28, Email: 'pedro@example.com' },
    ];


    const handleButtonClick = (rowData) => {
        alert(`Botón clickeado para ${rowData.Nombre}`);
    };

    const handleButtonClick2 = (rowData) => {
        alert(`Botón2 clickeado para ${rowData.Nombre}`);
    };

    const handleButtonClick3 = () => {
        alert(`Botón3`);
    };

    const btn = [
        { button: faEdit, onButtonClick: handleButtonClick },
        { button: faEdit, onButtonClick: handleButtonClick2 }
    ]
    return (
        <div>
            <h1>Tabla Dinámica</h1>
            <DynamicTable
                columns={columns}
                data={data}
                buttons={btn}
                mainButton='Hola'
                mainButtonClick={handleButtonClick3}
            />
        </div>
    );
}

export default Professors;
