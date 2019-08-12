import React, { Component } from 'react';
import { Dimensions, ScrollView, View, Text, TextInput, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { deviceDataAction } from '../../actions/DeviceDataActions';
import { Card, CardSection, Spinner } from '../common';
import { dataStyle, itemStyle } from './style'
import { utcToIso, utcToTime } from '../../utils/time'

import {
    PieChart,
    BarChart,
    LineChart,
    ProgressChart,
    StackedBarChart
} from 'react-native-chart-kit'

class DeviceData extends Component {
    state = {
      data_airtemp: [],
      airtemp: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{
          data: [ 20, 45, 28, 80, 99, 43 ],
          color: (opacity = 1) => `rgba(32, 34, 38, ${opacity})`, // optional
          strokeWidth: 2 // optional
        }]
      },
      data_soiltemp: [],
      soiltemp: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{
          data: [ 20, 45, 28, 80, 99, 43 ],
          color: (opacity = 1) => `rgba(32, 34, 38, ${opacity})`, // optional
          strokeWidth: 2 // optional
        }]
      },
      data_humidity: [],
      humidity: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{
          data: [ 20, 45, 28, 80, 99, 43 ],
          color: (opacity = 1) => `rgba(32, 34, 38, ${opacity})`, // optional
          strokeWidth: 2 // optional
        }]
      },
      data_moisture: [],
      moisture: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{
          data: [ 20, 45, 28, 80, 99, 43 ],
          color: (opacity = 1) => `rgba(32, 34, 38, ${opacity})`, // optional
          strokeWidth: 2 // optional
        }]
      }
    }

    componentDidMount() {
        if (this.props.item && this.props.item.device_id) {
          console.log(this.props.item.device_id);
          this.props.deviceDataAction(this.props.item.device_id, this.props.userToken, 'airtemp');
          this.props.deviceDataAction(this.props.item.device_id, this.props.userToken, 'humidity');
          this.timer = setInterval(() => this.props.deviceDataAction(this.props.item.device_id, this.props.userToken, 'airtemp'), 5000);
          this.timer = setInterval(() => this.props.deviceDataAction(this.props.item.device_id, this.props.userToken, 'humidity'), 5000);
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }

    transformData(data) {
      var my_labels = [];
      var my_data = [];
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        if (i % 2 == 0) {
          my_labels.push('')
        } else {
          my_labels.push(utcToTime(item.timestamp));
        }
        my_data.push(item.value);
      }
      return {my_labels, my_data}
    };

    componentWillReceiveProps(nextProps) {
      if (nextProps.data_humidity) {
        let {my_labels, my_data} = this.transformData(nextProps.data_humidity)
        this.setState({
          humidity: {
            labels: my_labels,
            datasets: [{ data: my_data, color: (opacity = 1) => `rgba(32, 34, 38, ${opacity})`, strokeWidth: 2}]
          }
        })
      }
      if (nextProps.data_airtemp) {
        let {my_labels, my_data} = this.transformData(nextProps.data_airtemp)
        this.setState({
          airtemp: {
            labels: my_labels,
            datasets: [{ data: my_data, color: (opacity = 1) => `rgba(32, 34, 38, ${opacity})`, strokeWidth: 2}]
          }
        })
      }
    }

    render() {
        const { humidity, airtemp } = this.state;
        const { containerStyle, titleText, baseText, bottomText, graphText } = dataStyle;
      //console.log(this.props)
        if (this.props.loading) {
            return <Spinner size="large" />;
        }
        const { serial_number, device_id, name, created, status } = this.props.item;

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
                  <View>
                    <Text style={graphText}>Luftfeuchtigkeit</Text>
                  </View>
                  <View paddingTop={20}>
                    <LineChart
                      data={humidity}
                      width={screenWidth-20}
                      height={220}
                      chartConfig={chartConfig}
                      bezier
                    />
                  </View>
                  <View>
                    <Text style={graphText}>Lufttemperatur</Text>
                  </View>
                  <View paddingTop={20}>
                    <LineChart
                      data={airtemp}
                      width={screenWidth-20}
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
  data_airtemp: state.deviceData.data_airtemp,
  data_humidity: state.deviceData.data_humidity,
  data_moisture: state.deviceData.data_moisture,
  data_soiltemp: state.deviceData.data_soiltemp,
  loading: state.deviceData.loading,
  userToken: state.login.userToken,
});

export default connect(mapStateToProps, { deviceDataAction })(DeviceData);
