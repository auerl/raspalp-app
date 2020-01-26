export const RALP_API_BASE_URL = 'http://api.hiddenpeak.org/v1';
export const RALP_BOX_BASE_URL = 'http://192.168.8.120/v1';

export const UserEndpoints = {
    login: `${RALP_API_BASE_URL}/users/authorize`,
    signup: `${RALP_API_BASE_URL}/users`,
    getData: `${RALP_API_BASE_URL}/data/`,
    getDetails: `${RALP_API_BASE_URL}/users/`,
    listUsers: `${RALP_API_BASE_URL}/users`,
    listDevices: `${RALP_API_BASE_URL}/users/listDevices`
}

export const DeviceEndpoints = {
    addDevice: `${RALP_API_BASE_URL}/users/registerDevice`,
    registerDevice: `${RALP_API_BASE_URL}/devices`,
    login: `${RALP_API_BASE_URL}/devices/authorize`,
    sendTask: `${RALP_API_BASE_URL}/devices/sendTask/`
}

export const BoxEndpoints = {
    updateToken: `${RALP_BOX_BASE_URL}/setup/token`,
    updateWifi: `${RALP_BOX_BASE_URL}/setup/wifi`
}

export const HttpStatus = {
    ok: 200,
    noContent: 204,
    badRequest: 400,
    forbidden: 403,
    notFound: 404,
    notAllowed: 405,
    serverError: 500,
    // custom
    userNotFound: 21,
    wrongPassword: 22,
    deviceNotFound: 23,
    deviceAlreadyAdded: 24,
    userAlreadyExists: 25
}

export const RequestMethods = {
    get: 'GET',
    put: 'PUT',
    post: 'POST',
    patch: 'PATCH',
    delete: 'DELETE'
}
