import React, { Component } from 'react';
import { Dimensions, ScrollView, View, Text, TextInput, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { deviceDataAction } from '../../actions/DeviceDataActions';
import { Card, CardSection, Spinner } from '../common';
import { dataStyle, itemStyle } from './style'
import { utcToIso, utcToTime } from '../../utils/time'

import { Defs, LinearGradient, Stop } from 'react-native-svg'
import { PieChart, LineChart, Grid, ProgressCircle } from 'react-native-svg-charts'
import { XAxis, YAxis } from 'react-native-svg-charts'

import * as shape from 'd3-shape'

class DeviceData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myDataHumidity: new Array(15).fill(65),
      myTimesHumidity: new Array(15).fill(65),
      myLabelsHumidity: new Array(15).fill(65),
      myDataAirtemp: new Array(15).fill(15),
      myTimesAirtemp: new Array(15).fill(15),
      myLabelsAirtemp: new Array(15).fill(15),
    }
  }

  updateAirtemp = (data) => {
    this.setState(state => {
      var tempTimes = state.myTimesAirtemp;
      var tempData = state.myDataAirtemp;
      var tempLabels = state.myLabelsAirtemp;
      const myTimesAirtemp = [...tempTimes];
      const myLabelsAirtemp = [...tempLabels];
      const myDataAirtemp = [...tempData];
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        if (!myTimesAirtemp.includes(item.timestamp)) {
          tempTimes.shift();
          tempData.shift();
          tempLabels.shift();
          const myTimesAirtemp = [...tempTimes, item.timestamp];
          const myLabelsAirtemp = [...tempLabels, utcToTime(item.timestamp)];
          const myDataAirtemp = [...tempData, item.value];
        }
      };
      return {myDataAirtemp, myTimesAirtemp, myLabelsAirtemp};
    });
  };


  updateHumidity = (data) => {
    this.setState(state => {
      var tempTimes = state.myTimesHumidity;
      var tempData = state.myDataHumidity;
      var tempLabels = state.myLabelsHumidity;
      var myTimesHumidity = [...tempTimes];
      var myLabelsHumidity = [...tempLabels];
      var myDataHumidity = [...tempData];
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        if (!myTimesHumidity.includes(item.timestamp)) {
          tempTimes.shift();
          tempData.shift();
          tempLabels.shift();
          myTimesHumidity = [...tempTimes, parseInt(item.timestamp)];
          myLabelsHumidity = [...tempLabels, parseInt(item.timestamp)]; //utcToTime(item.timestamp)];
          myDataHumidity = [...tempData, parseInt(item.value)];
          tempTimes = myTimesHumidity;
          tempLabels = myLabelsHumidity;
          tempData = myDataHumidity;
        }
      };
      return {myDataHumidity, myTimesHumidity, myLabelsHumidity};
    });
  };

  updateAirtemp = (data) => {
    this.setState(state => {
      var tempTimes = state.myTimesAirtemp;
      var tempData = state.myDataAirtemp;
      var tempLabels = state.myLabelsAirtemp;
      var myTimesAirtemp = [...tempTimes];
      var myLabelsAirtemp = [...tempLabels];
      var myDataAirtemp = [...tempData];
      console.log(data.length)
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        if (!myTimesAirtemp.includes(item.timestamp)) {
          tempTimes.shift();
          tempData.shift();
          tempLabels.shift();
          myTimesAirtemp = [...tempTimes, parseInt(item.timestamp)];
          myLabelsAirtemp = [...tempLabels, parseInt(item.timestamp)]; //utcToTime(item.timestamp)];
          myDataAirtemp = [...tempData, parseInt(item.value)];
          tempTimes = myTimesAirtemp;
          tempLabels = myLabelsAirtemp;
          tempData = myDataAirtemp;
        }
      };
      return {myDataAirtemp, myTimesAirtemp, myLabelsAirtemp};
    });
  };


  updateAirtemp2 = (data) => {
    this.setState(state => {
      var tempTimes = state.myTimesAirtemp;
      var tempData = state.myDataAirtemp;
      var tempLabels = state.myLabelsAirtemp;
      var myTimesAirtemp = [];
      var myLabelsAirtemp = [];
      var myDataAirtemp = [];
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        myTimesAirtemp.push(parseInt(item.timestamp));
        myLabelsAirtemp.push(parseInt(item.timestamp));
        myDataAirtemp.push(parseInt(item.value));
      }
      return {myDataAirtemp, myTimesAirtemp, myLabelsAirtemp};
    });
  };

  updateHumidity2 = (data) => {
    this.setState(state => {
      var tempTimes = state.myTimesHumidity;
      var tempData = state.myDataHumidity;
      var tempLabels = state.myLabelsHumidity;
      var myTimesHumidity = [];
      var myLabelsHumidity = [];
      var myDataHumidity = [];
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        myTimesHumidity.push(parseInt(item.timestamp));
        myLabelsHumidity.push(parseInt(item.timestamp));
        myDataHumidity.push(parseInt(item.value));
      }
      return {myDataHumidity, myTimesHumidity, myLabelsHumidity};
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.data_humidity) {
      this.updateHumidity2(nextProps.data_humidity);
    }
    if (nextProps.data_airtemp) {
      this.updateAirtemp2(nextProps.data_airtemp);
    }
  }

  componentDidMount() {
    if (this.props.item && this.props.item.device_id) {
      console.log(this.props.item.device_id);
      this.props.deviceDataAction(this.props.item.device_id, this.props.userToken, 'airtemp');
      this.props.deviceDataAction(this.props.item.device_id, this.props.userToken, 'humidity');
      this.timer = setInterval(() => this.props.deviceDataAction(this.props.item.device_id, this.props.userToken, 'airtemp'), 5000);
      this.timer = setInterval(() => this.props.deviceDataAction(this.props.item.device_id, this.props.userToken, 'humidity'), 5000);
      //this.timer = setInterval(() => this.onAddItem(Math.random() * 20), 1000);
    }
  }

  render() {

    const { myDataAirtemp, myLabelsAirtemp, myDataHumidity, myLabelsHumidity } = this.state;
    const { serial_number, device_id, name, created, status } = this.props.item;
    const { containerStyle, titleText, baseText, bottomText, graphText } = dataStyle;

    const myLabelsAirtempTest = [10, 20];

    const axesSvg = { fontSize: 10, fill: 'grey' };
    const verticalContentInset = { top: 20, bottom: 20 }
    const xAxisHeight = 50

    const Gradient = () => (
        <Defs key={'gradient'}>
            <LinearGradient id={'gradient'} x1={'0'} y={'0%'} x2={'100%'} y2={'0%'}>
                <Stop offset={'0%'} stopColor={'rgb(134, 65, 244)'}/>
                <Stop offset={'100%'} stopColor={'rgb(66, 194, 244)'}/>
            </LinearGradient>
        </Defs>
    )

    // const { labelWidth, selectedSlice } = this.state;
    // const { label, value } = selectedSlice;
    // const keys = ['google', 'facebook', 'linkedin', 'youtube', 'Twitter'];

    // const values = [15, 25, 35, 45, 55];
    // const colors = ['#600080', '#9900cc', '#c61aff', '#d966ff', '#ecb3ff']
    // const data = keys.map((key, index) => {
    //     return {
    //       key,
    //       value: values[index],
    //       svg: { fill: colors[index] },
    //       arc: { outerRadius: (70 + values[index]) + '%', padAngle: label === key ? 0.1 : 0 },
    //       onPress: () => this.setState({ selectedSlice: { label: key, value: values[index] } })
    //     }
    //   })
    // const deviceWidth = Dimensions.get('window').width
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
              <View style={{ height: 200, padding: 20, flexDirection: 'row' }}>
                <YAxis
                  data={myDataHumidity}
                  style={{ marginBottom: xAxisHeight }}
                  contentInset={verticalContentInset}
                  svg={axesSvg}
                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <LineChart
                    style={{ flex: 1 }}
                    data={myDataHumidity}
                    contentInset={verticalContentInset}
                    curve={shape.curveNatural}
                    animate={true}
                    svg={{
                      strokeWidth: 2,
                      stroke: 'url(#gradient)',
                    }}
                  >
                    <Grid/>
                    <Gradient/>
                  </LineChart>
                  <XAxis
                    style={{ marginHorizontal: -10, height: xAxisHeight }}
                    data={myLabelsHumidity}
                    formatLabel={(value, index) => index}
                    contentInset={{ left: 10, right: 10 }}
                    svg={axesSvg}
                  />
                </View>
              </View>
              <View>
                <Text style={graphText}>Lufttemperatur</Text>
              </View>
              <View style={{ height: 200, padding: 20, flexDirection: 'row' }}>
                <YAxis
                  data={myLabelsAirtempTest}
                  style={{ marginBottom: xAxisHeight }}
                  contentInset={verticalContentInset}
                  svg={axesSvg}
                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <LineChart
                    style={{ flex: 1 }}
                    data={myDataAirtemp}
                    contentInset={verticalContentInset}
                    /* curve={shape.curveNatural} */
                    animate={true}
                    yMax={20}
                    yMin={10}
                    svg={{
                      strokeWidth: 2,
                      stroke: 'url(#gradient)',
                    }}
                  >
                    <Grid/>
                    <Gradient/>
                  </LineChart>
                  <XAxis
                    style={{ marginHorizontal: -10, height: xAxisHeight }}
                    data={myLabelsAirtemp}
                    formatLabel={(value, index) => value}
                    contentInset={{ left: 10, right: 10 }}
                    svg={axesSvg}
                  />
                </View>
              </View>
              <View>
                <Text style={graphText}>Wasserstand</Text>
              </View>
              <View style={{padding: 50}}>
                <ProgressCircle
                  style={ { height: 200 } }
                  progress={ 0.7 }
                  progressColor={'rgb(134, 65, 244)'}
                  startAngle={ -Math.PI * 0.8 }
                  endAngle={ Math.PI * 0.8 }
                />
              </View>
            </ScrollView>
    )
        // const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]

        // const Gradient = () => (
        //     <Defs key={'gradient'}>
        //         <LinearGradient id={'gradient'} x1={'0'} y={'0%'} x2={'100%'} y2={'0%'}>
        //             <Stop offset={'0%'} stopColor={'rgb(134, 65, 244)'}/>
        //             <Stop offset={'100%'} stopColor={'rgb(66, 194, 244)'}/>
        //         </LinearGradient>
        //     </Defs>
        // )

        // return (
        //     <LineChart
        //         style={ { height: 200 } }
        //         data={ data }
        //         contentInset={ { top: 20, bottom: 20 } }
        //         svg={{
        //             strokeWidth: 2,
        //             stroke: 'url(#gradient)',
        //         }}
        //     >
        //         <Grid/>
        //         <Gradient/>
        //     </LineChart>
        // )
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
