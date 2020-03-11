import React, { Component } from 'react';
import axios from 'axios';
import { Result, PageHeader, Descriptions, Card, Input, Button, Breadcrumb, Spin } from 'antd';
import { HomeOutlined, ReconciliationOutlined } from '@ant-design/icons';
import BMI from './BMI';
import Blood from './Blood';
import Cholesterol from './Cholesterol';

const systolicBP = "8480-6"
const bloodPressure = "85354-9"
const diastolicBP = "8462-4"

const bodyHeight = "8302-2"
const bodyWeight = "29463-7"
const bodyMassIndex = "39156-5"

const totalChol = "2093-3"
const highDensityChol = "2085-9"

export class Observations extends Component {

    // a0b15d4d-a2d1-4dd4-a096-cc99ddf7f735
    state = {
        patient: {},
        observations: [],
        isReady: false
    }

    componentDidMount(){
        axios.get(`http://localhost:5000/api/Patient/${this.props.match.params.uid}`)
        .then(res => this.setState({patient: res.data}))

        
        axios.get(`http://localhost:5000/api/Observation/${this.props.match.params.uid}`)
        .then(res => this.setState({observations: res.data}))
        .then(() => this.setState({isReady: true}));
    }

    getAverage = (values) => {
        var sum = 0;
        var average = 0;
        for(var i = 0; i < values.length; i++){
            sum += parseInt(values[i], 10)
        }
        average = sum / values.length
        return average
    }

    // MUST have 'valueQuantity' property
    processData = (code) => {
        var values = []
        this.state.observations.forEach((observation) => {
            observation.entry.forEach((eachEntry) => {
                if (eachEntry.resource.code.coding[0].code === code) {
                    values.push(eachEntry.resource.valueQuantity.value)
                }
            })
        })
        return values
    }

    processBlood = (code, type) => {
        var values = []
        this.state.observations.forEach((observation) => {
            observation.entry.forEach((eachEntry) => {
                if(eachEntry.resource.code.coding[0].code === code){
                    eachEntry.resource.component.forEach((eachComponent) => {
                        if(eachComponent.code.coding[0].code === type){
                            values.push(eachComponent.valueQuantity.value)
                        }
                    })
                }
            })
        })
        return values
    }

    render() {
        const {Search} = Input;
        if(this.state.isReady){
            if('name' in this.state.patient){
                return (
                    <div>
                        <Result style={{height:'80%', backgroundColor: '#d8e5f3'}} icon={<ReconciliationOutlined />}
                        title={`Observations for "${this.state.patient.name[0].given}, ${this.state.patient.name[0].family}"`} />

                        <div style={{padding: '20px 15% 50px 15%'}}>
                            <Breadcrumb style={{padding: '0 0 5px 0'}}>
                                <Breadcrumb.Item href="/">
                                <HomeOutlined />
                                <span>Home</span>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>Observation</Breadcrumb.Item>
                            </Breadcrumb>

                            <strong>Search Patient for Observations:</strong>
                            <Search placeholder="Enter Patient ID" size="large" onSearch={value => window.location=`/observations/${value}`} enterButton />
                            <br></br>&nbsp;

                            <Card size="small">
                                <PageHeader className="site-page-header" onBack={() => window.location="/"} title="Patient Details" />
                                <Descriptions size="small" column={3}>
                                    <Descriptions.Item label="Given Name">{`${this.state.patient.name[0].given.toString().replace(/[0-9]/g, '')}`}</Descriptions.Item>
                                    <Descriptions.Item label="Last Name">{`${this.state.patient.name[0].family.toString().replace(/[0-9]/g, '')}`}</Descriptions.Item>
                                    <Descriptions.Item label="Gender">{this.state.patient.gender}</Descriptions.Item>
                                    <Descriptions.Item label="Birth Date">{this.state.patient.birthDate}</Descriptions.Item>
                                    <Descriptions.Item label="Marital Status">{this.state.patient.maritalStatus.text}</Descriptions.Item>
                                    <Descriptions.Item label="Residential City">{`${this.state.patient.address[0].city}` }</Descriptions.Item>
                                </Descriptions>
                            </Card> 

                            <BMI averageHeight={this.getAverage(this.processData(bodyHeight))}
                                averageWeight={this.getAverage(this.processData(bodyWeight))}
                                averageBMI={this.getAverage(this.processData(bodyMassIndex))} />

                            <Cholesterol totalChol={this.processData(totalChol)} 
                                highDensityChol={this.processData(highDensityChol)} />

                            <Blood diastolicBP={this.processBlood(bloodPressure, diastolicBP)}
                                systolicBP={this.processBlood(bloodPressure, systolicBP)} />

                        </div>
                    </div>
                )

            } else{
                return (
                    <div style={{textAlign: 'center'}}>
                        <Result
                            status="warning"
                            title="No observations found for this patient ID."
                            extra={
                            <Button onClick={() => window.location="/"} type="primary" key="console">
                                Go Back
                            </Button>
                            }
                        />
                    </div>
                )
            }

        } else {
            return (
                <div style={{textAlign: 'center', marginTop: '20%'}}>
                    <Spin size="large" />
                </div>
            )
        }
    }
}

export default Observations
