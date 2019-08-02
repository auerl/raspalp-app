import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { tasksStyle } from './style'

class Tasks extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { containerStyle } = tasksStyle;
        return (
            <View style={containerStyle}>
                <Text style={{ marginTop: 10, marginBottom: 10, marginLeft: 10 }}>Tasks tab</Text>
            </View>
        );
    }
}

export default Tasks;
