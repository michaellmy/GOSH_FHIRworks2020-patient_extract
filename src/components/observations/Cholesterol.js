import React, { Component } from 'react';
import { Row, Col, Card, Result} from 'antd'
import {Bar} from 'react-chartjs-2';


export class Cholesterol extends Component {
    generateLabels = () => {
        var labels = [];
        for(var i=0; i < this.props.totalChol.length; i++) {
            labels.push(i+1)
        }
        return labels
    }

    
    render() {
        const cholesterolData = {
            labels: this.generateLabels(),
            datasets: [
              {
                label: 'Total Cholesterol',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: 'rgba(75,192,192,1)',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: this.props.totalChol
              },
              {
                label: 'High Density Lipoprotein Cholesterol',
                fill: false,
                lineTension: 0.1,
                backgroundColor: '#339933',
                borderColor: '#339933',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: '#339933',
                pointBackgroundColor: '#339933',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: '#339933',
                pointHoverBorderColor: '#339933',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: this.props.highDensityChol
              }
            ],
        };

        if(this.props.totalChol.length === 0){
            return (
                <div style={cardContainer}>
                    <h4>Patient Blood Pressure Over Time</h4>
                    <Result style={{backgroundColor: 'white'}}
                    status="warning"
                    title="No observations found for Cholesterol"
                />
                </div>
                
            )
        }

        return (
            <div style={cardContainer}>
                <h4>Cholesterol Recordings Over All Observations</h4>
                <Row gutter={16}>
                    <Col span={24}>
                        <Card style={{backgroundColor: 'white'}}>
                            <div >
                                <Bar data={cholesterolData} height={300} options={options} />
                            </div>
                        </Card>
                    </Col>               
                </Row>
            </div>
        )
    }
}

const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        yAxes: [{
            scaleLabel: {
            display: true,
            labelString: 'Cholesterol / (mg / dL)'
            }
        }],
        xAxes: [{
            scaleLabel: {
            display: true,
            labelString: 'Observation Number'
            }
        }]
    }    
}

const cardContainer ={
    background: '#fff0b3',
    padding: '30px'
}

export default Cholesterol
