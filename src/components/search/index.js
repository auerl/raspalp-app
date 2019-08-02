import React, { Component } from 'react';
import { View, Text, TextInput, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { searchPlanets } from '../../actions/PlanetActions';
import { Spinner } from '../common';
import { Item } from './Item';
import { planetStyle, itemStyle } from './style'


import { ListItem } from 'react-native-elements'

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            isTypeAheadSearch: false,
        };
    }

    componentDidMount() {
        this.props.searchPlanets('');
    }

    onSearchTextChange = (text) => {
        if (text !== this.state.searchText) {
            this.setState({ searchText: text, isTypeAheadSearch: (text.length > 2) });
        }
        this.props.searchPlanets(this.state.searchText);
    }

    onSearchSubmit = () => {
        this.props.searchPlanets(this.state.searchText);
        this.setState({ isTypeAheadSearch: false });
    }

    onPressItem = (item) => {
        Actions.planetDetails({ item, title: item.name });
    }

    keyExtractor = (item, index) => index.toString()

    renderLoading = () => {
        if (this.props.loading) {
            return <Spinner size="large" />;
        }
        return <FlatList
                 data={this.props.planetSearch}
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
              subtitle={item.terrain}
              leftAvatar={{ source: require("../../../assets/profile.png"), rounded: true }}
              onPress={() => this.onPressItem(item)}
            />)
    }

    render() {
        const { containerStyle, searchViewStyle, loginText } = planetStyle;
        return (
            <View style={containerStyle}>
                <View style={searchViewStyle}>
                    <TextInput
                        placeholder={"Search"}
                        value={this.state.searchText}
                        onChangeText={this.onSearchTextChange}
                        underlineColorAndroid={'transparent'}
                        returnKeyType={'search'}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onSubmitEditing={this.onSearchSubmit}
                    />
                </View>
                {this.renderLoading()}
            </View>
        );
    }
}

const mapStateToProps = state => ({
    planetSearch: state.planets.data,
    loading: state.planets.loading,
    loginUser: state.login.loginUser,
});
export default connect(mapStateToProps, { searchPlanets })(Search);
