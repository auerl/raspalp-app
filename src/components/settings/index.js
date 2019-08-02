import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { settingsStyle } from './style'

class Settings extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { containerStyle } = settingsStyle;
        return (
            <View style={containerStyle}>
                <Text style={{ marginTop: 10, marginBottom: 10, marginLeft: 10 }}>Settings Tab</Text>
            </View>
        );
    }
}

export default Settings;
