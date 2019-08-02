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
import { COLOR_WHITE, COLOR_BLACK } from '../../config/colors';

export const planetStyle = {
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
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingTop: 10,
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: SIZE_LARGE,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingTop: 10,
    },
    loginText: {
        fontFamily: 'Roboto',
        fontSize: SIZE_NORMAL,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingTop: 10,
    },
};
