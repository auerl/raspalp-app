import React, { Component } from 'react';
import { Dimensions, ScrollView, View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { deviceDataAction, deviceTaskAction } from '../../actions/DeviceDataActions';
import { Card, CardSection, Spinner } from '../common';
import { dataStyle, itemStyle } from './style'
import { utcToIso, utcToTime, utcToTimeSecsLabel } from '../../utils/time'

import { Path, Defs, LinearGradient, Stop } from 'react-native-svg'
import { PieChart, LineChart, Grid, ProgressCircle, AreaChart } from 'react-native-svg-charts'
import { XAxis, YAxis } from 'react-native-svg-charts'
import { Button } from 'react-native-elements';

import DialogInput from 'react-native-dialog-input';

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
      myDataMoisture: new Array(15).fill(500),
      myTimesMoisture: new Array(15).fill(500),
      myLabelsMoisture: new Array(15).fill(500),
      myDataSoiltemp: new Array(15).fill(15),
      myTimesSoiltemp: new Array(15).fill(15),
      myLabelsSoiltemp: new Array(15).fill(15),
      myDataRange: new Array(15).fill(20),
      myTimesRange: new Array(15).fill(20),
      myLabelsRange: new Array(15).fill(20),
      isDialogVisible: false,
      message: ''
    }
  }

  onSubmitJob = (liter) =>  {
    this.setState({isDialogVisible:false})
    this.props.deviceTaskAction(liter, this.props.item.device_id, this.props.userToken)
    console.log("job hinzugefügt")
  }

  onCloseDialog = () =>  {
    this.setState({isDialogVisible:false})
  }

  onShowDialog = () => {
    this.setState({isDialogVisible:true})
  }

  updateAirtemp = (data) => {
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

  updateHumidity = (data) => {
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

  updateSoiltemp = (data) => {
    this.setState(state => {
      var tempTimes = state.myTimesSoiltemp;
      var tempData = state.myDataSoiltemp;
      var tempLabels = state.myLabelsSoiltemp;
      var myTimesSoiltemp = [];
      var myLabelsSoiltemp = [];
      var myDataSoiltemp = [];
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        myTimesSoiltemp.push(parseInt(item.timestamp));
        myLabelsSoiltemp.push(parseInt(item.timestamp));
        myDataSoiltemp.push(parseInt(item.value));
      }
      return {myDataSoiltemp, myTimesSoiltemp, myLabelsSoiltemp};
    });
  };

  updateMoisture = (data) => {
    this.setState(state => {
      var tempTimes = state.myTimesMoisture;
      var tempData = state.myDataMoisture;
      var tempLabels = state.myLabelsMoisture;
      var myTimesMoisture = [];
      var myLabelsMoisture = [];
      var myDataMoisture = [];
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        myTimesMoisture.push(parseInt(item.timestamp));
        myLabelsMoisture.push(parseInt(item.timestamp));
        myDataMoisture.push(parseInt(item.value));
      }
      return {myDataMoisture, myTimesMoisture, myLabelsMoisture};
    });
  };

  updateRange = (data) => {
    this.setState(state => {
      var tempTimes = state.myTimesRange;
      var tempData = state.myDataRange;
      var tempLabels = state.myLabelsRange;
      var myTimesRange = [];
      var myLabelsRange = [];
      var myDataRange = [];
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        myTimesRange.push(parseInt(item.timestamp));
        myLabelsRange.push(parseInt(item.timestamp));
        myDataRange.push(item.value);
      }
      return {myDataRange, myTimesRange, myLabelsRange};
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.data_humidity) {
      this.updateHumidity(nextProps.data_humidity);
    }
    if (nextProps.data_airtemp) {
      this.updateAirtemp(nextProps.data_airtemp);
    }
    if (nextProps.data_soiltemp) {
      this.updateSoiltemp(nextProps.data_soiltemp);
    }
    if (nextProps.data_moisture) {
      this.updateMoisture(nextProps.data_moisture);
    }
    if (nextProps.data_range) {
      this.updateRange(nextProps.data_range);
    }

  }

  componentDidMount() {
    if (this.props.item && this.props.item.device_id) {
      this.props.deviceDataAction(this.props.item.device_id, this.props.userToken, 'airtemp');
      this.props.deviceDataAction(this.props.item.device_id, this.props.userToken, 'humidity');
      this.props.deviceDataAction(this.props.item.device_id, this.props.userToken, 'soiltemp');
      this.props.deviceDataAction(this.props.item.device_id, this.props.userToken, 'moisture');
      this.props.deviceDataAction(this.props.item.device_id, this.props.userToken, 'range');
      this.timer = setInterval(() => this.props.deviceDataAction(this.props.item.device_id, this.props.userToken, 'airtemp'), 10000);
      this.timer = setInterval(() => this.props.deviceDataAction(this.props.item.device_id, this.props.userToken, 'humidity'), 10000);
      this.timer = setInterval(() => this.props.deviceDataAction(this.props.item.device_id, this.props.userToken, 'soiltemp'), 10000);
      this.timer = setInterval(() => this.props.deviceDataAction(this.props.item.device_id, this.props.userToken, 'moisture'), 10000);
      this.timer = setInterval(() => this.props.deviceDataAction(this.props.item.device_id, this.props.userToken, 'range'), 10000);
    }
  }

  render() {

    const {
      myDataAirtemp,
      myLabelsAirtemp,
      myDataHumidity,
      myLabelsHumidity,
      myDataSoiltemp,
      myLabelsSoiltemp,
      myDataMoisture,
      myLabelsMoisture,
      myDataRange,
      myLabelsRange
    } = this.state;

    const { serial_number, device_id, name, created, status } = this.props.item;
    const { containerStyle, titleText, baseText, bottomText, graphText } = dataStyle;

    const axesSvg = { fontSize: 9, fill: 'grey'};
    const axesSvgX = { fontSize: 9, fill: 'grey', rotation: 315, originY: 30, y: 5 };
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
    const Line = ({ line }) => (
      <Path
        key={'line'}
        d={line}
        stroke={'rgb(134, 65, 244)'}
        fill={'none'}
      />
    )

    const deviceWidth = Dimensions.get('window').width

    return (
      <ScrollView style={containerStyle}>
        <DialogInput isDialogVisible={this.state.isDialogVisible}
                     title={"Wassermenge eingeben"}
                     message={"Bitte geben Sie die Wassermenge ein, mit der Sie bewässern möchten:"}
                     hintInput ={"Liter"}
                     submitInput={ (liter) => {this.onSubmitJob(liter)} }
                     submitText={"Giessen"}
                     cancelText={"Abbrechen"}
                     closeDialog={ () => {this.onCloseDialog()}}>
        </DialogInput>
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
          <Text style={graphText}>Luftfeuchtigkeit: {myDataHumidity[myDataHumidity.length-1]}%</Text>
        </View>
        <View style={{ height: 230, padding: 20, flexDirection: 'row' }}>
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
              formatLabel={(value, index) => utcToTimeSecsLabel(value, index) }
              xAccessor={({ item }) => item}
              contentInset={{ left: 10, right: 10 }}
              svg={axesSvgX}
            />
          </View>
        </View>
        <View>
          <Text style={graphText}>Erdfeuchte: {myDataMoisture[myDataMoisture.length-1]}</Text>
        </View>
        <View style={{ height: 230, padding: 20, flexDirection: 'row' }}>
          <YAxis
            data={myDataMoisture}
            style={{ marginBottom: xAxisHeight }}
            contentInset={verticalContentInset}
            svg={axesSvg}
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <LineChart
              style={{ flex: 1 }}
              data={myDataMoisture}
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
              data={myLabelsMoisture}
              formatLabel={(value, index) => utcToTimeSecsLabel(value, index)}
              xAccessor={({ item }) => item}
              contentInset={{ left: 10, right: 10 }}
              svg={axesSvgX}
            />
          </View>
        </View>
        <View>
          <Text style={graphText}>Luft- und Erdtemperatur: {myDataAirtemp[myDataAirtemp.length-1]} | {myDataSoiltemp[myDataSoiltemp.length-1]} &deg;C</Text>
        </View>
        <View style={{ height: 230, padding: 20, flexDirection: 'row' }}>
          <YAxis
            data={myDataAirtemp}
            style={{ marginBottom: xAxisHeight }}
            contentInset={verticalContentInset}
            svg={axesSvg}
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <LineChart
              style={{ flex: 1 }}
              data={myDataAirtemp}
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
              data={myLabelsAirtemp}
              formatLabel={(value, index) => utcToTimeSecsLabel(value, index)}
              xAccessor={({ item }) => item}
              contentInset={{ left: 10, right: 10 }}
              svg={axesSvgX}
            />
          </View>
        </View>
        <View style={{ height: 230, padding: 20, flexDirection: 'row' }}>
          <YAxis
            data={myDataSoiltemp}
            style={{ marginBottom: xAxisHeight }}
            contentInset={verticalContentInset}
            svg={axesSvg}
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <LineChart
              style={{ flex: 1 }}
              data={myDataSoiltemp}
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
              data={myLabelsSoiltemp}
              formatLabel={(value, index) => utcToTimeSecsLabel(value, index)}
              xAccessor={({ item }) => item}
              contentInset={{ left: 10, right: 10 }}
              svg={axesSvgX}
            />
          </View>
        </View>
        <View>
          <Text style={graphText}>Wasserstand: {parseInt(myDataRange[myDataRange.length-1]*100)}%</Text>
        </View>
        <View style={{padding: 50}}>
          <ProgressCircle
            style={ { height: 200 } }
            progress={ myDataRange[myDataRange.length-1] || 1.0}
            progressColor={'rgb(134, 65, 244)'}
            startAngle={ -Math.PI * 0.8 }
            endAngle={ Math.PI * 0.8 }
            animate={true}
          />
        </View>
        <View style={{width: "60%", alignSelf: "center"}}>
          <Button
            title="Bewässerung starten"
            style={dataStyle.buttonStyle}
            onPress={this.onShowDialog}>
          </Button>
        </View>
        <Text style={dataStyle.errorTextStyle}>
          {this.props.message}
        </Text>
        <View>
          <Text style={graphText}>  </Text>
        </View>
      </ScrollView>
    )
    }

}


const mapStateToProps = state => ({
  data_airtemp: state.deviceData.data_airtemp,
  data_humidity: state.deviceData.data_humidity,
  data_moisture: state.deviceData.data_moisture,
  data_soiltemp: state.deviceData.data_soiltemp,
  data_range: state.deviceData.data_range,
  loading: state.deviceData.loading,
  userToken: state.login.userToken,
  message: state.deviceData.message,
});

export default connect(mapStateToProps, { deviceDataAction, deviceTaskAction })(DeviceData);
