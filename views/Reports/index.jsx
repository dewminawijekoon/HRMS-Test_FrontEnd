import React, { useState } from 'react';
import { Row, Col, Card, DropdownButton, Dropdown, Form } from 'react-bootstrap';
import PieChart from '../PieChart';

function Reports() {
  
  /*
    Employee by department
      data -> employee count of the particular department
      labels -> department names

    Employees by Job Title
      data -> employee count of the particular job title
      labels -> job titles
    
    Employees by Pay Grade
      data -> employee count of the particular pay grade
      labels -> pay grades
    
    **Leaves given within last month
      data -> leave count of the last month given by a particular department
      labels -> department names
  */

  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: 'Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };


  const [selectedItem, setSelectedItem] = useState('');

  const handleSelect = (eventKey) => {
    setSelectedItem(eventKey);

    if (eventKey === 'Employees by Department') {
      console.log('Fetch Employees by Department Data');
    } else if (eventKey === 'Roles') {
      console.log('Fetch Roles Data');
    }
  };

  return (
    <React.Fragment>
      <h4 className="mb-4">Reports</h4>

      <Card>
        <Card.Body>
          <Row>
            <Col>
            <Dropdown.Header>Select Report Type</Dropdown.Header>
            </Col>

            <Col>
              <DropdownButton
              title={selectedItem ? selectedItem : 'Select an Option'}
              onSelect={handleSelect}
              variant="success"
              id="dropdown-basic"
            >
              <Dropdown.Item eventKey="Employees by Department">Employees by Department</Dropdown.Item>
              <Dropdown.Item eventKey="Roles">Roles</Dropdown.Item>
              <Dropdown.Item eventKey="Employees by Pay Grade">Employees by Pay Grade</Dropdown.Item>
              <Dropdown.Item eventKey="Leaves given within last month">Leaves given within last month</Dropdown.Item>
              
            </DropdownButton>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Row className="d-flex justify-content-around">
        <Card className="deptChart">
          <Card.Header>{selectedItem || 'Employees by Department'}</Card.Header>
          <Card.Body className="d-flex justify-content-center align-items-center">
            <Col key={0} md={6} lg={6} xl={4} xxl={4} className="d-flex justify-content-left align-items-justify">
              <PieChart data={data} />
            </Col>

            <Col key={1} md={6} lg={6} xl={4} xxl={4} className="d-flex justify-content-right align-items-justify">
              <Form>
                {data.labels.map((label, index) => (
                  <Form.Group as={Row} className="mb-3" key={index} controlId={label}>
                    <Form.Label column sm={4}>{label}</Form.Label>
                    <Col sm={8}>
                      <Form.Control type="text" defaultValue={(data.datasets[0].data[index])} readOnly />
                    </Col>
                  </Form.Group>
                ))};
             
            </Form>
            </Col>
              
          </Card.Body>
        </Card>
      </Row>
    </React.Fragment>
  );
}

export default Reports;