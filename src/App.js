import './App.css';
import 'antd/dist/antd.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Card, Result, Input } from 'antd';
import { AreaChartOutlined } from '@ant-design/icons';

import GenderRatioPie from './components/GenderRatioPie';
import MaritalStatusPie from './components/MaritalStatusPie';
import PatientAgeLine from './components/PatientAgeLineYoung';
import PatientAgeLineOld from './components/PatientAgeLineOld';
import Observations from './components/observations/Observations';

export class App extends Component {
  state = {
    resources: [],
    isLoading: true
  }

  render() {
    const { Search } = Input
      return (
        <Router>
          <div>
            <Route path="/observations/:uid" render={props => (
              <React.Fragment>
                <Observations {...props} />
              </React.Fragment>
            )} />

            <Route exact path="/" >
              <React.Fragment>
                <Result style={{height:'80%', backgroundColor: '#d8e5f3'}}
                  icon={<AreaChartOutlined />}
                  title="Patient-Extract: Analyse Patient Medical Info"
                />
                  
                <div style={{padding: '10px 10% 5px 10%'}}>
                  a0b15d4d-a2d1-4dd4-a096-cc99ddf7f735<br></br>
                  b86f60b7-1ec5-47df-8a1c-f90b14f810ed<br></br>
                  ea95f498-7929-4d50-be55-9bf7baee3a8d<br></br>
                  <strong>Search Patient for Observations:</strong>
                  <Search placeholder="Enter Patient ID" size="large" onSearch={value => window.location=`/observations/${value}`} enterButton />
                  <hr style={{padding: '2px 0 0 0'}}></hr><br></br>
                  <strong>General Statistics of All Patients:</strong>
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
                    <Card size="small" title="Age Range of Patients (0 - 50 y/o)" style={cardItem}>
                      <div>
                        <PatientAgeLine />
                      </div>
                    </Card>
                  </div>

                  <div>
                    <Card size="small" title="Age Range of Patients (51 - 100 y/o)" style={cardItem}>
                      <div>
                        <PatientAgeLineOld />
                      </div>
                    </Card>
                  </div>
                </div> 

              </React.Fragment>
            </Route>
          </div>
        </Router>
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
