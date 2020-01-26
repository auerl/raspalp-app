
import {
    PADDING_TOP,
    PADDING_LEFT,
    PADDING_BOTTOM,
    PADDING_RIGHT,
} from '../../config/dimen';

export const loginStyle = {
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
        margin: 40,
        color: 'white'
    },
    logoStyle: {
        flex: 1,
        width: "80%",
        resizeMode: "contain",
        alignSelf: "center",
    },
    buttonStyle: {
        flex: 1,
        marginTop: 5
    }
};


export const colors = {
    BLACK: "#000",
    WHITE: "#FFF",
    DODGER_BLUE: "#428AF8",
    SILVER: "#BEBEBE",
    TORCH_RED: "#F8262F",
    MISCHKA: "#E5E4E6",
    FRENCH_GRAY: "#BEBEBE",
    LIGHT_GRAY: "#BEBEBE",
};
