const baseUrl = import.meta.env.VITE_APP_BASE_API

const EnvConfig = {
    development:{
        baseApi: baseUrl,
        // mockApi: '/devMock',
        mockApi:'https://mock.apifox.com/m1/4068509-0-default/api'
    },
    staging:{
        baseApi: baseUrl,
        mockApi: '/staingMock'
    },
    production:{
        baseApi: baseUrl,
        mockApi: '/prodMock'
    }
}

export default {
    // mock的总开关
    mock: true,
    ...EnvConfig[import.meta.env.VITE_APP_ENV]
}