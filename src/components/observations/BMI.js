import React, { Component } from 'react';
import { Statistic, Card, Row, Col } from 'antd';
import { IssuesCloseOutlined, DashboardOutlined, RiseOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';



export class BMI extends Component {
    getBMIState = (BMI) => {
        if(BMI <= 18.5 ) {
            return ['#ffcc00', 'BMI: Underweight']
        } else if(BMI >= 30 ) {
            return ['#b32400', 'BMI: Obese']
        } else if(BMI >= 25 ) {
            return ['#e6b800', 'BMI: Overweight']
        } else{
            return ['#009933', 'BMI: Healthy.']
        }
    }

    render() {
        return (
            <div style={cardContainer}>
                <h4>Averages Over All Recorded Patient Observations</h4>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card>
                            <Statistic
                                title="Average Height:"
                                value={this.props.averageHeight}
                                precision={2}
                                valueStyle={{ color: '#336699' }}
                                prefix={<RiseOutlined />}
                                suffix="cm"
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Statistic
                                title="Average Weight:"
                                value={this.props.averageWeight}
                                precision={2}
                                valueStyle={{ color: '#336699' }}
                                prefix={<DashboardOutlined />}
                                suffix="kg"
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Statistic
                                title={this.getBMIState(this.props.averageBMI)[1]}
                                value={this.props.averageBMI}
                                precision={2}
                                valueStyle={{color:this.getBMIState(this.props.averageBMI)[0]}}
                                prefix={<IssuesCloseOutlined />}
                                suffix={`kg/m2`}
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

const cardContainer ={
    background: '#c8d9ea',
    padding: '30px'
}

export default BMI
