import tmdbApi from "@/api/tmdbApi"

export const createRequestToken= async () => {
    try {
        const {data} = await tmdbApi.get('/authentication/token/new')
        localStorage.setItem('request_token',data.request_token)
        return data
        
    } catch (error) {
        return error.response.data
    }
}

export const createSessionWithLogin = async(_,user) => {
    try {
        const {username,password} = user
        const {data} = await tmdbApi.post('/authentication/token/validate_with_login',{
            username,
            password,
            request_token: localStorage.getItem('request_token') 
        })
        return data;
    } catch (error) {
        return error.response.data
    }  
}

export const createSession = async(_,request_token) => {
    try {
        const {data} = await tmdbApi.post('/authentication/session/new',{
            request_token
        })
        localStorage.setItem('session_id',data.session_id)
        return data;
    } catch (error) {
        return error.response.data
    }  
}