import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios'


export class GenderRatioPie extends Component {
    state = {
        data: {
          labels: [
            'Male',
            'Female'
          ],
          datasets: [{
            data: [0, 0],
            backgroundColor: [
            '#36A2EB',
            '#FF6384'
            ],
            hoverBackgroundColor: [
            '#36A2EB',
            '#FF6384',
            ]
          }]
        },
    }

    componentDidMount() {
        axios.get('https://localhost:5001/api/Patient/')
        .then(res => this.processGender(res.data))
        
    }

    processGender = (rawResources) => {
        var male = 0;
        var female = 0;
        rawResources.forEach((rawResource) => {
          rawResource.entry.forEach((eachEntry) => {
            if (eachEntry.resource.gender === 'male'){
              male += 1
            } else if (eachEntry.resource.gender === 'female') {
              female += 1
            }
          })
        });
        var dataCopy = this.state.data;
        dataCopy.datasets[0].data = [male, female];
        this.setState({data: dataCopy})
    }

    render() {
        return (
            <div>
                <Doughnut data={this.state.data} height={250} />
            </div>
        )
    }
}

export default GenderRatioPie
