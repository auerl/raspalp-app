import React, { Component } from 'react';
import { View, Text, TextInput, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { getUserDevices } from '../../actions/DevicesActions';
import { Spinner } from '../common';
import { devicesStyle, itemStyle } from './style'
import { Button } from 'react-native-elements';

import { ListItem } from 'react-native-elements'

class Devices extends Component {

    constructor(props) {
      super(props);
      this.state = {
        searchText: '',
        isTypeAheadSearch: false,
      };
    }

    componentDidMount() {
      this.props.getUserDevices(this.props.userToken);
    }

    onPressItem = (item) => {
      Actions.deviceData({ item, title: item.name });
    }

    onAddButtonPress() {
      console.log("button pressed");
      Actions.QRCode();
    }

    keyExtractor = (item, index) => index.toString()

    renderLoading = () => {
        if (this.props.loading) {
            return <Spinner size="large" />;
        }
        return <FlatList
                 data={this.props.devicesList}
                 renderItem={this.renderItem}
                 keyExtractor={this.keyExtractor}
                 ItemSeparatorComponent={this.renderSeparator}
               />;
    }

    renderSeparator = () => {
        return (
            <View
              style={{
                  height: 1.0,
                  width: "100%",
                  backgroundColor: "#ededed",
                  marginLeft: "0%"
              }}
            />
        );
    };

    renderItem = ({ item }) => {
        return (
            <ListItem
              title={item.name}
              subtitle={"(" + item.device_id + ") " + item.serial_number}
              leftAvatar={{ source: require("../../../assets/device.png"), rounded: true }}
              onPress={() => this.onPressItem(item)}
            />)
    }

    render() {
        const { containerStyle, searchViewStyle, loginText } = devicesStyle;
        return (
            <View style={containerStyle}>
                {this.renderLoading()}
              <View style={{width: "60%", alignSelf: "center"}}>
                <Button
                  title="Hinzufügen"
                  style={devicesStyle.buttonStyle}
                  onPress={this.onAddButtonPress}>
                </Button>
              </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    devicesList: state.devices.data,
    loading: state.devices.loading,
    userToken: state.login.userToken,
});
export default connect(mapStateToProps, { getUserDevices })(Devices);
