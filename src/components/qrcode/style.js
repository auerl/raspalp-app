/**
 * Plannet Screen UI Styles
 */
import {
    PADDING_TOP,
    PADDING_LEFT,
    PADDING_BOTTOM,
    PADDING_RIGHT,
    SIZE_NORMAL,
    SIZE_SMALL,
} from '../../config/dimen';
import { COLOR_WHITE, COLOR_BLACK } from '../../config/colors';

export const qrcodeStyle = {
    containerStyle: {
        flex: 1,
        paddingLeft: PADDING_LEFT,
        paddingTop: PADDING_TOP,
        paddingBottom: PADDING_BOTTOM,
        paddingRight: PADDING_RIGHT,
    },
    errorTextStyle: {
        fontSize: 16,
        alignSelf: 'center',
        color: 'orange',
        marginBottom: 10,
        marginTop:10
    },
    textStyle: {
        alignSelf: 'center',
        margin: 40
    },
    logoStyle: {
        flex: 1,
        width: "80%",
        resizeMode: "contain",
        alignSelf: "center"
    },
    buttonStyle: {
        flex: 1,
        marginTop: 5
    }
};
