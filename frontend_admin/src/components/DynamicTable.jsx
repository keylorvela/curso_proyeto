import React from 'react';
import { Table, Button } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from 'src/components/DynamicTable.module.css';

function DynamicTable({ columns, data, buttons, mainButton, mainButtonClick }) {

  return (
    <Table striped bordered hover>
      <thead className = {styles.headBorder}>
        <tr>
          {columns.map((column, index) => (
            <th key={index} className = {styles.headBorder}>{column}</th>
          ))}
          {mainButton && (
            <th className = {styles.headBorder}>
              <Button onClick={() => mainButtonClick()}>
                {mainButton}
              </Button>
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((rowData, rowIndex) => (
          <tr key={rowIndex}>
            {Object.values(rowData).map((cellData, cellIndex) => (
              <td key={cellIndex}>{cellData}</td>
            ))}
            {buttons && (
              <td>
                {buttons.map((btn, btnIndex) => (
                  <Button
                    key={btnIndex}
                    onClick={() => btn.onButtonClick(rowData)}
                  >
                    <FontAwesomeIcon icon={btn.button} />
                  </Button>
                ))}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default DynamicTable;
