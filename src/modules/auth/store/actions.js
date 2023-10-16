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

export const account = async({commit},session_id) => {
    try {
        const {data} = await tmdbApi.get(`/account`,{
            params: {
                session_id
            }
        })
        commit('user',data)
        return data;
    } catch (error) {
        return error.response.data
    }  
}

export const checkAuthentication = async ({commit}) => {
    const session_id = localStorage.getItem('session_id')

    if (!session_id) {
        commit('logout')
        return {ok:false, message:'Not authorized'}
    }
    try {
        const {data} = await tmdbApi.get(`/account`,{
            params: {
                session_id
            }
        })

        commit('user',data)

        return {ok:true, message:'Authorized'}

    } catch (error) {
        commit('logout')
        return {ok:false, message:'Not authorized'}
    }
}