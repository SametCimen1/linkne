import axios from 'axios';
import TokenService from './token.service'

const instance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:5500",
    headers:{
        "Content-Type": "application/json",
    },
})

//before the request, execute
instance.interceptors.request.use(
    (config) => {
        
        const token = TokenService.getLocalRefreshToken()
        if(token){
            config.headers['x-auth-token'] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;

        
        if(err.response){
            if(err.response.status === 403 && !originalConfig._retry){
                originalConfig._retry = true;

                try{
                    const rs = await instance.post('/auth/check', {
                      refreshToken: TokenService.getLocalRefreshToken(),
                    });

   

                    const {accessToken} = rs.data;


                    TokenService.updateAccessToken(accessToken);
                    return instance(originalConfig)
                }
                catch(_error){
                    return Promise.reject(_error);
                }
            }
        }
        return Promise.reject(err)
    }
)

export default instance;