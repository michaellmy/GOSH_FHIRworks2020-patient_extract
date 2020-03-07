import './App.css';
import 'antd/dist/antd.css';
import React, { Component } from 'react';
import { Card, Result, Button, Input, Row, Col } from 'antd';
import { AreaChartOutlined } from '@ant-design/icons';

import GenderRatioPie from './components/GenderRatioPie';
import MaritalStatusPie from './components/MaritalStatusPie';
import PatientAgeLine from './components/PatientAgeLineYoung';
import PatientAgeLineOld from './components/PatientAgeLineOld';

export class App extends Component {
  state = {
    resources: [],
    isLoading: true
  }

  componentDidMount () {
    
  }

  render() {
    const { Search } = Input
      return (
        <div>
          
          <Result style={{height:'80%', backgroundColor: '#d8e5f3'}}
            icon={<AreaChartOutlined />}
            title="Welcome to Statistics!"/>

          
          <div style={{padding: '10px 10% 5px 10%'}}>
            <strong>Search Patient for Observations:</strong>
            <Search placeholder="Enter Patient ID" size="large" onSearch={value => console.log(value)} enterButton />
            <hr style={{padding: '2px 0 0 0'}}></hr><br></br>
            <strong>General Statistics:</strong>
          </div>
          
          
          <div style={container}>
            <div>
              <Card size="small" title="Patient Gender Ratio" style={cardItem}>
                <div>
                  <GenderRatioPie />
                </div>
              </Card>
            </div>
            
            <div>
              <Card size="small" title="Patient Marital Status" style={cardItem}>
                <div>
                  <MaritalStatusPie />
                </div>
              </Card>
            </div>

            <div>
              <Card size="small" title="Age Range of Patients (Young)" style={cardItem}>
                <div>
                  <PatientAgeLine />
                </div>
              </Card>
            </div>

            <div>
              <Card size="small" title="Age Range of Patients (Older)" style={cardItem}>
                <div>
                  <PatientAgeLineOld />
                </div>
              </Card>
            </div>
          </div> 
     

        </div>
      )
  }
}

const container = {
    padding: "0px 3% 20px 3%",
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center'
}

const cardItem = {
    margin: "0 10px 15px 10px",
    width: '400px',
    height: '380px',
    textAlign: 'center'
}

export default App;
