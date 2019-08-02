import {
    PADDING_TOP,
    PADDING_LEFT,
    PADDING_BOTTOM,
    PADDING_RIGHT,
    SIZE_LARGE,
    SIZE_NORMAL,
    SIZE_SMALL,
} from '../../config/dimen';
import { COLOR_WHITE, COLOR_BLACK } from '../../config/colors';

export const friendsStyle = {
    containerStyle: {
        flex: 1,
        paddingLeft: PADDING_LEFT,
        paddingTop: PADDING_TOP,
        paddingBottom: PADDING_BOTTOM,
        paddingRight: PADDING_RIGHT,
    },
    searchViewStyle: {
        backgroundColor: COLOR_WHITE,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingTop: 10,
        marginBottom: 10,
        marginLeft: 5,
        marginRight: 5,
        borderRadius:10,
      },
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red',
        fontSize: SIZE_NORMAL,
    },
    baseText: {
        backgroundColor: COLOR_WHITE,
        fontFamily: 'Roboto',
        fontSize: SIZE_NORMAL,
        paddingLeft: 20,
        paddingRight: 10,
        paddingBottom: 3,
        paddingTop: 3,
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: SIZE_LARGE,
        fontFamily: 'Roboto',
        paddingLeft: 15,
        paddingRight: 10,
        paddingBottom: 3,
        paddingTop: 10,
    },
    bottomText: {
        backgroundColor: COLOR_WHITE,
        fontFamily: 'Roboto',
        fontSize: SIZE_NORMAL,
        paddingLeft: 20,
        paddingRight: 10,
        paddingBottom: 15,
        paddingTop: 3,
    },
  };
  export const itemStyle = {
      titleStyle: {
        fontSize: SIZE_NORMAL,
        fontWeight: 'bold',
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
      },
      descStyle: {
        fontSize: SIZE_NORMAL,
        fontFamily: 'Roboto',
        paddingLeft: 10,
        paddingBottom: 10,
        paddingRight: 10,
      }
  };
