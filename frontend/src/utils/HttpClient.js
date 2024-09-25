import axios from 'axios'
import join from 'url-join'
import { apiUrl, NOT_CONNECT_NETWORK, NETWORK_CONNECTION_MESSAGE, key} from '../constants'

const isAbsoluteURLRegex = /^(?:\w+:)\/\//

axios.interceptors.request.use(async (config) => {
    if (!isAbsoluteURLRegex.test(config.url)) {
        config.url = join(apiUrl, config.url) 
        //Add Token
        const jwtToken = localStorage.getItem(key.JWT_TOKEN);
        if(jwtToken != null) {
            config.headers = { 'x-access-token': jwtToken}
        }
    }
    config.timeout = 0 // 10 Second 
    return config
})

axios.interceptors.response.use((response) => {
    return response
}, error => { 
    // debugger
    console.log(JSON.stringify(error, undefined, 2))
    if (axios.isCancel(error)) {
        return Promise.reject(error)
    } else if (!error.response) {
        return Promise.reject({ code: NOT_CONNECT_NETWORK, message: NETWORK_CONNECTION_MESSAGE })
    }
    return Promise.reject(error)
})

export const httpClient = axios

