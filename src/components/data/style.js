/**
 * Plannet Screen UI Styles
 */
import {
    PADDING_TOP,
    PADDING_LEFT,
    PADDING_BOTTOM,
    PADDING_RIGHT,
    SIZE_LARGE,
    SIZE_NORMAL,
} from '../../config/dimen';
import { COLOR_WHITE, COLOR_BLACK, COLOR_GREY } from '../../config/colors';

export const dataStyle = {
    containerStyle: {
        flex: 1,
        paddingLeft: PADDING_LEFT,
        paddingTop: PADDING_TOP,
        paddingBottom: PADDING_BOTTOM,
        paddingRight: PADDING_RIGHT,
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
    graphText: {
        fontFamily: 'Roboto',
        color: 'white',
        fontSize: SIZE_NORMAL,
        paddingLeft: 20,
        paddingRight: 10,
        paddingBottom: 5,
        paddingTop: 20,
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: SIZE_LARGE,
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
    buttonStyle: {
        flex: 1,
        marginTop: 5
    },
    errorTextStyle: {
        fontSize: 16,
        alignSelf: 'center',
        color: 'orange',
        marginBottom: 10,
        marginTop:10
    },
};
