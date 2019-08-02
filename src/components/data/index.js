import React, { Component } from 'react';
import { Dimensions, ScrollView, View, Text, TextInput, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { deviceDataAction } from '../../actions/DeviceDataActions';
import { Card, CardSection, Spinner } from '../common';
import { dataStyle, itemStyle } from './style'
import { utcToIso } from '../../utils/time'

import {
    PieChart,
    BarChart,
    LineChart,
    ProgressChart,
    StackedBarChart
} from 'react-native-chart-kit'

class DeviceData extends Component {

    componentDidMount() {
        if (this.props.item && this.props.item.device_id) {
            this.props.deviceDataAction(
                this.props.item.device_id,
                this.props.userToken,
                'temperature',
                1464141239.78,
                1564138279.23
            );
            console.log("yay");
        }

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data) {
            console.log("component update data");
        }
    }

    render() {
        const { containerStyle, titleText, baseText, bottomText } = dataStyle;
        console.log(this.props)
        if (this.props.loading) {
            return <Spinner size="large" />;
        }
        const { serial_number, device_id, name, created, status } = this.props.item;

        const testdata1 = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [{
                data: [ 20, 45, 28, 80, 99, 43 ],
                color: (opacity = 1) => `rgba(32, 34, 38, ${opacity})`, // optional
                strokeWidth: 2 // optional
            }]
        }
        const testdata2 = {
            labels: ['Swim', 'Bike', 'Run'], // optional
            data: [0.4, 0.6, 0.8]
        }
        const testdata3 = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [{
                data: [ 20, 45, 28, 80, 99, 43 ]
            }]
        }
        const testdata4 ={
            labels: ['Test1', 'Test2'],
            legend: ['L1', 'L2', 'L3'],
            data: [
                [60, 60, 60],
                [30,30,60],
            ],
            barColors: ['#dfe4ea', '#ced6e0', '#a4b0be'],
        }
        const testdata5 = [
            { name: 'Seoul', population: 21500000, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
            { name: 'Toronto', population: 2800000, color: '#F00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
            { name: 'Beijing', population: 527612, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 15 },
            { name: 'New York', population: 8538000, color: '#ffffff', legendFontColor: '#7F7F7F', legendFontSize: 15 },
            { name: 'Moscow', population: 11920000, color: 'rgb(0, 0, 255)', legendFontColor: '#7F7F7F', legendFontSize: 15 }
        ]




        const screenWidth = Dimensions.get('window').width
        const chartConfig = {
            backgroundGradientFrom: '#e9e9ef',
            backgroundGradientTo: '#e9e9ef',
            color: (opacity = 1) => `rgba(32, 34, 38, ${opacity})`,
            strokeWidth: 2 // optional, default 3
        }

        return (<ScrollView style={containerStyle}>
                  <Card>
                    <CardSection>
                      <Text style={titleText}>{name}</Text>
                    </CardSection>
                    <Text style={baseText}>Serial number: {serial_number}</Text>
                    <Text style={baseText}>Device ID: {device_id}</Text>
                    <Text style={baseText}>Status: {status}</Text>
                    <Text style={bottomText}>Created: {utcToIso(created)}</Text>
                  </Card>
                  <View paddingTop={20}>
                    <LineChart
                      data={testdata1}
                      width={screenWidth}
                      height={220}
                      chartConfig={chartConfig}
                      bezier
                    />
                  </View>
                  <View paddingTop={20}>
                    <ProgressChart
                      data={testdata2}
                      width={screenWidth}
                      height={220}
                      chartConfig={chartConfig}
                    />
                  </View>
                  <View paddingTop={20}>
                    <BarChart
                      data={testdata3}
                      width={screenWidth}
                      height={220}
                      yAxisLabel={'$'}
                      chartConfig={chartConfig}
                    />
                  </View>
                  <View paddingTop={20}>
                    <StackedBarChart
                      data={testdata4}
                      width={screenWidth}
                      height={220}
                      chartConfig={chartConfig}
                    />
                  </View>
                  <View paddingTop={20} paddingBottom={30}>
                    <PieChart
                      data={testdata5}
                      width={screenWidth}
                      height={220}
                      chartConfig={chartConfig}
                      accessor="population"
                      backgroundColor="transparent"
                      paddingLeft="15"
                      absolute
                    />
                  </View>
                </ScrollView>

               );
    }
}

const mapStateToProps = state => ({
    data: state.deviceData.data || [],
    loading: state.deviceData.loading,
    userToken: state.login.userToken,
});

export default connect(mapStateToProps, { deviceDataAction })(DeviceData);
