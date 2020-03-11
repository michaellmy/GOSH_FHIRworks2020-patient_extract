import React, { Component } from 'react'
import axios from 'axios'

import {Polar} from 'react-chartjs-2';
import { Spin } from 'antd'

export class MaritalStatusPie extends Component {
    state = {
        data: {
          labels: [
            'Single',
            'Married',
            'Never Married',
          ],
          datasets: [{
            data: [0, 0, 0],
            backgroundColor: [
            '#36A2EB',
            '#FF6384',
            '#006600'
            ],
            hoverBackgroundColor: [
            '#000099',
            '#cc00cc',
            '#00e600'
            ]
          }]
        },
        isReady: false
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/Patient/')
        .then(res => this.processMarital(res.data))
        .then(() => this.setState({isReady: true}))
    }

    processMarital = (rawResources) => {
        var married = 0;
        var single = 0;
        var neverMarried = 0;
        rawResources.forEach((rawResource) => {
            rawResource.entry.forEach((eachEntry) => {
                if (eachEntry.resource.maritalStatus.text === 'M') {
                    married += 1
                } else if (eachEntry.resource.maritalStatus.text === 'S') {
                    single += 1
                } else if (eachEntry.resource.maritalStatus.text === 'Never Married'){
                    neverMarried += 1
                }
            })
        });

        console.log([married, single, neverMarried])

        var dataCopy = this.state.data
        dataCopy.datasets[0].data = [married, single, neverMarried];
        this.setState({data: dataCopy})
    }


    render() {
        if(this.state.isReady){
            return (
                <div>
                    <Polar data={this.state.data} height={250} />
                </div>
            )
        } else{ 
            return (
                <div>
                  <Spin size="large" style={{marginTop: '35%'}}/>
                </div>
            )
        }
    }
}

export default MaritalStatusPie
