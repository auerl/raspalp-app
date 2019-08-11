//export const RALP_API_BASE_URL= 'http://192.168.8.100:5000/v1';
export const RALP_API_BASE_URL= 'http://api.hiddenpeak.org/v1';
export const RALP_BOX_BASE_URL= 'http://192.168.50.5/v1';


export const USER_LOGIN_ENDPOINT =`${RALP_API_BASE_URL}/users/authorize`;
export const USER_SIGNUP_ENDPOINT =`${RALP_API_BASE_URL}/users`;
export const USER_LIST_DEVICES_ENDPOINT = `${RALP_API_BASE_URL}/users/listDevices`;
export const USER_BASE_DATA_ENDPOINT = `${RALP_API_BASE_URL}/data/`;
export const USER_LIST_USERS_ENDPOINT= `${RALP_API_BASE_URL}/users`;
export const USER_DETAILS_ENDPOINT= `${RALP_API_BASE_URL}/users/`;

export const DEVICE_ADD_ENDPOINT= `${RALP_API_BASE_URL}/users/registerDevice`;
export const DEVICE_REGISTER_ENDPOINT= `${RALP_API_BASE_URL}/devices`;
export const DEVICE_LOGIN_ENDPOINT= `${RALP_API_BASE_URL}/devices/authorize`;

export const BOX_UPDATE_TOKEN_ENDPOINT= `${RALP_BOX_BASE_URL}/setup/token`;
export const BOX_UPDATE_WIFI_ENDPOINT= `${RALP_BOX_BASE_URL}/setup/wifi`;
