import React, { Component } from 'react'
import axios from 'axios'
import { Line } from 'react-chartjs-2';
import { Spin } from 'antd'


function generateAges(start, end) {
    var ages = []
    for(var i = start;  i <= end ; i ++){
        ages.push(i)
    }
    return ages;
}

function generateBlank(n) {
    var ages = []
    for(var i = 1; i <= n ; i++ ){
        ages.push(0)
    }
    return ages;
}

function getAge(birthDate) {
    var today = new Date()
    var birthYear =  parseInt(birthDate.split("-")[0]);
    var age = today.getFullYear() - birthYear
    return age
}

const options = {
    scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Number of Patients'
          }
        }],
        xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Age of Patients'
            }
          }]
      }  
}

export class PatientAgeLine extends Component {
    state = {
        data: {
          labels: generateAges(51, 100),
          datasets: [{
            label: 'Male',
            fill: false,
            lineTension: 0.1,
            backgroundColor: '#0066cc',
            borderColor: '#0066cc',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#000066',
            pointBackgroundColor: '#000066',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#000066',
            pointHoverBorderColor: '#000066',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: generateBlank(50)
          },
          {
            label: 'Female',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'pink',
            borderColor: 'pink',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#ff00ff',
            pointBackgroundColor: '#ff00ff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#ff00ff',
            pointHoverBorderColor: '#ff00ff',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: generateBlank(50)
          }    
        ]
        },
        isReady: false
    }

    componentDidMount () {
        axios.get('https://localhost:5001/api/Patient/')
        .then(res => this.processAges(res.data))
        .then(() => this.setState({isReady: true}))
    }

    processAges = (rawResources) => {
        var agesMale = generateBlank(50);
        var agesFemale = generateBlank(50);
        rawResources.forEach((rawResource) => {
          rawResource.entry.forEach((eachEntry) => {
            var age = getAge(eachEntry.resource.birthDate);
            if(age <= 51){
                return
            }
            if (eachEntry.resource.gender === 'male'){
                agesMale[age - 50 - 1] += 1
            } else if (eachEntry.resource.gender === 'female') {
                agesFemale[age - 50 - 1] += 1
            }
          })
        });

        var dataCopy = this.state.data;
        console.log([agesMale, agesFemale])
        dataCopy.datasets[0].data = agesMale;
        dataCopy.datasets[1].data = agesFemale;

        this.setState({data: dataCopy})
    }


    render() {
      if(this.state.isReady){
        return (
          <div>
              <Line data={this.state.data}  height={250} options={options}/>
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

export default PatientAgeLine
