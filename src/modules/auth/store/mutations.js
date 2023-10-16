
export const user = (state,user) => {
    console.log(user);
    state.status = 'authenticated'
    state.user = user
}

export const logout = (state) => {
    state.user = null
    state.status = 'not-authenticated'
    localStorage.removeItem('session_id')
    localStorage.removeItem('request_token')
}