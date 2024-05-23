import React, { useState, useEffect } from 'react';
import { Table, Button, Dropdown } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


import styles from 'src/components/DynamicTable.module.css';

function DynamicTable({ columns, data, buttons, mainButton, mainButtonClick, isSearching, searchKey }) {

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2);   //could be changed
  const [showFirstDropdown, setShowFirstDropdown] = useState(false);
  const [showSecondDropdown, setShowSecondDropdown] = useState(false);
  const [dropdownMin, setdropdownMin] = useState(2);
  const [dropdownMax, setdropdownMax] = useState(2);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [currentItems, setCurrentItems] = useState(data.slice(indexOfFirstItem, indexOfLastItem));
  const [copyItems, setCopyItems] = useState(data.slice(indexOfFirstItem, indexOfLastItem));

  const options = Array.from({ length: 10 }, (_, i) => i+1);//could be changed

  //Search
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    if (isSearching) {
      const value = event.target.value;
      setSearchTerm(value);

      const filteredItems = copyItems.filter(item =>
        item[searchKey].toLowerCase().includes(value.toLowerCase())
      );
      setCurrentItems(filteredItems);
    }
  };

  useEffect(() => {
    handleSearchChange({ target: { value: searchTerm } });
  }, [copyItems]);



  //Sort
  const [sort, setSort] = useState({});

  const handleSort = (sortField) => {
    if (sort.sortField === sortField) {
      setSort({
        sortField,
        sortOrder: sort.sortOrder === 'asc' ? 'desc' : 'asc'
      });
    } else {
      setSort({
        sortField,
        sortOrder: 'asc'
      });
    }
  };

  useEffect(() => {
    const newCurrent = data.slice(indexOfFirstItem, indexOfLastItem)
    setCurrentItems(newCurrent);
    setCopyItems(newCurrent)
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    const newSortedData = [...currentItems].sort((a, b) => {
      if (sort.sortOrder === 'asc') {
        return a[sort.sortField] > b[sort.sortField] ? 1 : -1;
      } else {
        return a[sort.sortField] < b[sort.sortField] ? 1 : -1;
      }
    });
    setCurrentItems(newSortedData);
    setCopyItems(newSortedData)
  }, [sort]);



  //Pagination
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setdropdownMin(currentPage - 3);
      setdropdownMax(currentPage);
    }
  };

  const nextPage = () => {
    setdropdownMin(currentPage - 1);
    setdropdownMax(currentPage + 2);
    if (indexOfLastItem < data.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    setShowFirstDropdown(false);
    setShowSecondDropdown(false);
    setdropdownMin(pageNumber - 2);
    setdropdownMax(pageNumber + 1);
  };

  //Pagination vector
  const pageNumbers = [];
  if (totalPages > 1) {
    pageNumbers.push( //Always button "1"
      <Button
        key={1}
        onClick={() => goToPage(1)}
        variant="light"
        className={currentPage === 1 ? styles.pageNumber : ''}>
        1
      </Button>
    );
    if (currentPage > 1) {
      let list = []
      for (let i = 2; i <= dropdownMin; i++) list.push(i); //First Btn "..." with its options
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
    for (let i = currentPage - 1; i <= currentPage + 1; i++) { //Buttons in middle => maximun 3 btns
      if (i > 1 && i < totalPages) {
        pageNumbers.push(
          <Button
            key={i}
            onClick={() => goToPage(i)}
            variant="light"
            className={currentPage === i ? styles.pageNumber : ''}>
            {i}
          </Button>
        );
      }
    }
    if (currentPage < totalPages - 1) {
      let list = []
      for (let i = dropdownMax + 1; i <= totalPages - 1; i++) list.push(i); //Second Btn "..." with its options
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
    pageNumbers.push( //Always last button "totalPages"
      <Button
        key={totalPages}
        onClick={() => goToPage(totalPages)}
        variant="light"
        className={currentPage === totalPages ? styles.pageNumber : ''}>
        {totalPages}
      </Button>
    );
  }


  return (
    <div>
      {isSearching && (
        <div >
          <Form>
            <Row>
              <Col xs={12} sm={8} md={6} lg={4}>
                <Form.Group controlId="formSearch">
                  <div className={styles.searchContainer}>
                    <Form.Control
                      className={styles.inputSearch}
                      type="text"
                      placeholder="Buscar en resultados"
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                    <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
                  </div>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </div>
      )}
      <Table striped hover responsive borderless className='mt-4'>
        <thead >
          <tr className={styles.headBorder}>
            {columns.map((column, index) => (
              <th style={{ color: '#1D2D8C' }} key={index} >
                {column} {
                  <span
                    className={`${styles.sortButton} ${sort.sortField === column ? styles.active : ''}`}
                    onClick={() => handleSort(column)}>
                    <FontAwesomeIcon icon={faSort} rotation={sort.sortOrder === 'asc' ? 180 : 0} />
                  </span>
                }
              </th>
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
              {Object.values(rowData).map((cellData, cellIndex) => {
                if (cellIndex < columns.length) {
                  return <td key={cellIndex}>{cellData}</td>;
                }
                return null;
              })}
              {buttons && (
                <td style={{ textAlign: 'right' }}>
                  {buttons.map((btn, btnIndex) => (
                    <Button
                      className={styles.optionsButton}
                      key={btnIndex}
                      onClick={() => btn.onButtonClick(rowData)}>
                      <FontAwesomeIcon icon={btn.button} size='2x' />
                    </Button>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
      <div className={styles.paginationContainer}>
        {totalPages > 1 && (
          <div className={styles.pagination}>
            <Button key="prev" onClick={prevPage} className={styles.movePgaeBtn} variant="light">&lt;</Button>
            {pageNumbers}
            <Button key="next" onClick={nextPage} className={styles.movePgaeBtn} variant="light">&gt;</Button>
          </div>
        )}
        <div className={styles.itemsPerPage}>
          <span>Items por página:</span>
          <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              {itemsPerPage}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {options.map((option) => (
                <Dropdown.Item key={option} onClick={() => setItemsPerPage(option)}>{option}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

export default DynamicTable;
