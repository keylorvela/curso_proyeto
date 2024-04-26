import React, { useState } from 'react';
import { Table, Button, Dropdown } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from 'src/components/DynamicTable.module.css';

function DynamicTable({ columns, data, buttons, mainButton, mainButtonClick }) {

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(1); 
  const [showFirstDropdown, setShowFirstDropdown] = useState(false);
  const [showSecondDropdown, setShowSecondDropdown] = useState(false);
  const [dropdownMin, setdropdownMin] = useState(2);
  const [dropdownMax, setdropdownMax] = useState(2);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);


  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setdropdownMin(currentPage - 3)
      setdropdownMax(currentPage)
    }
  };

  const nextPage = () => {
    setdropdownMin(currentPage - 1)
    setdropdownMax(currentPage + 2)
    if (indexOfLastItem < data.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    setShowFirstDropdown(false);
    setShowSecondDropdown(false);
    setdropdownMin(pageNumber - 2)
    setdropdownMax(pageNumber + 1)
  };

  
  const pageNumbers = [];
  if (totalPages > 1) {
    pageNumbers.push(
      <Button
        key={1}
        onClick={() => goToPage(1)}
        variant= "light"
        className={currentPage === 1 ? styles.pageNumber : ''}
      >
        1
      </Button>
    );
    if (currentPage > 1) {
      let list = []
      for (let i = 2; i <= dropdownMin; i++) list.push(i);
      pageNumbers.push(
        <Dropdown key="firstDropdown" show={showFirstDropdown} onToggle={(isOpen) => setShowFirstDropdown(isOpen)}>
          <Button variant="light" id="first-dropdown" className={styles.customToggle} 
          onClick={() => setShowFirstDropdown(!showFirstDropdown)}>
            ....
          </Button>
          <Dropdown.Menu>
            {list.map(page => (
              <Dropdown.Item key={page} onClick={() => goToPage(page)}>{page}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      );
    }
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      if (i > 1 && i < totalPages) {
        pageNumbers.push(
          <Button
            key={i}
            onClick={() => goToPage(i)}
            variant="light"
            className={currentPage === i ? styles.pageNumber : ''}
          >
            {i}
          </Button>
        );
      }
    }
    if (currentPage < totalPages - 1) {
      let list = []
      for (let i = dropdownMax + 1; i <= totalPages - 1; i++) list.push(i);
      pageNumbers.push(
        <Dropdown key="secondDropdown" show={showSecondDropdown} onToggle={(isOpen) => setShowSecondDropdown(isOpen)}>
          <Button variant="light" id="second-dropdown" className={styles.customToggle} 
          onClick={() => setShowSecondDropdown(!showSecondDropdown)}>
            ....
          </Button>
          <Dropdown.Menu>
            {list.map(page => (
              <Dropdown.Item key={page} onClick={() => goToPage(page)}>{page}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      );
    }
    pageNumbers.push(
      <Button
        key={totalPages}
        onClick={() => goToPage(totalPages)}
        variant= "light"
        className={currentPage === totalPages ? styles.pageNumber : ''}
      >
        {totalPages}
      </Button>
    );
  }


  return (
    <div>
      <Table striped hover responsive borderless>
        <thead >
          <tr className={styles.headBorder}>
            {columns.map((column, index) => (
              <th style={{ color: '#1D2D8C' }} key={index} >{column}</th>
            ))}
            {mainButton && (

              <th className={styles.columnBtn} >
                <Button className={styles.customButton} onClick={() => mainButtonClick()}>
                  {mainButton}
                </Button>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((rowData, rowIndex) => (
            <tr key={rowIndex}>
              {Object.values(rowData).map((cellData, cellIndex) => (
                <td key={cellIndex}>{cellData}</td>
              ))}
              {buttons && (
                <td style={{ textAlign: 'right' }}>
                  {buttons.map((btn, btnIndex) => (
                    <Button
                      className={styles.optionsButton}
                      key={btnIndex}
                      onClick={() => btn.onButtonClick(rowData)}
                    >
                      <FontAwesomeIcon icon={btn.button} size='2x'/>
                    </Button>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <Button key="prev" onClick={prevPage} className={styles.movePgaeBtn} variant="light">&lt;</Button>
          {pageNumbers}
          <Button key="next" onClick={nextPage} className={styles.movePgaeBtn}  variant="light">&gt;</Button>
        </div>
      )}
    </div>
  );
}

export default DynamicTable;
