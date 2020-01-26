export const AUTHORIZED_USER = 'authorized_user';

export const Auth = {
    login: {
        success: 'auth_success',
        loading: 'auth_loading',
        fail: 'auth_fail',
    },
    signup: {
        success: 'auth_success',
        loading: 'auth_loading',
        fail: 'auth_fail',
    }
}

export const Friend = {
    list: {
        success: 'friend_list_success',
        fail: 'friend_list_fail',
        default: 'friend_list'
    },
    details: {
        success: 'friend_details_success',
        fail: 'friend_details_fail',
        default: 'friend_details'
    }
}

export const Device = {
    add: {
        fail: 'device_add_fail',
        success: 'device_add_success',
        loading: 'device_add_loading',
        failExists: 'device_add_fail_already_added',
        failNotFound: 'device_add_fail_not_found',
    },
    login: {
        fail: 'device_login_fail',
        success: 'device_login_success',
        loading: 'device_login_loading'
    },
    register: {
        fail: 'device_register_fail',
        success: 'device_register_success',
        loading: 'device_register_loading'
    },
    setup: {
        fail: 'device_setup_fail',
        success: 'device_setup_success',
        loading: 'device_setup_loading',
    },
    list: {
        success: 'device_list_success',
        fail: 'device_list_fail',
        default: 'device_list'
    },
    data: {
        success: 'device_data_success',
        fail: 'device_data_fail',
        default: 'device_data',
    },
    task: {
        success: 'device_task_success',
        fail: 'device_task_fail',
        default: 'device_task'
    },
    sensor: {
        range: 'range',
        airtemp: 'airtemp',
        soiltemp: 'soiltemp',
        humidity: 'humidity',
        moisture: 'moisture'
    }
}
