import React, { Component } from 'react';
import { ScrollView, View, Text, TextInput, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { getFriendDetails } from '../../actions/FriendDetailsActions';
import { Card, CardSection, Spinner } from '../common';
import { friendsStyle } from './style'

class FriendDetails extends Component {

    componentDidMount() {
        if (this.props.item && this.props.item.id) {
            console.log(this.props.item)
            // now we could get statistics about the user itself
            //this.props.getFriendDetails(this.props.userTokne, this.props.item.user_id);
        }
    }

    render() {
        const { containerStyle, titleText, baseText, bottomText } = friendsStyle;
        if (this.props.loading) {
            return <Spinner size="large" />;
        }

        const { username, id, email } = this.props.item;

        return (<ScrollView style={containerStyle}>
                  <Card>
                    <CardSection>
                      <Text style={titleText}>{username}</Text>
                    </CardSection>
                    <Text style={baseText}>Username: {username}</Text>
                    <Text style={baseText}>E-Mail: {email}</Text>
                    <Text style={bottomText}>User ID: {id}</Text>
                  </Card>
                <View paddingTop={20}>
                </View>
                </ScrollView>
               );
    }
}

const mapStateToProps = state => ({
    friendDetails: state.friendDetails.data || {},
    loading: state.friendDetails.loading,
    userToken: state.login.userToken,
});

export default connect(mapStateToProps, { getFriendDetails })(FriendDetails);
