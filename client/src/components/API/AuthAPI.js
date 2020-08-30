import axios from 'axios'

export const SignInAPI = async(account)=>{
    const res = await axios.post('http://localhost:5555/auth/signin',account);
    return res;
}
export const SignUpAPI = async(account)=>{
    const res = await axios.post('http://localhost:5555/auth/signup',account);
    return res;
}
export const hasUserAPI = async(account)=>{
    const res = await axios.post('http://localhost:5555/auth/hasUsername',account);
    return res;
}
export const hasEmailAPI = async(account)=>{
    const res = await axios.post('http://localhost:5555/auth/hasEmail',account);
    return res;
}
export const getUserAPI =async(id)=>{
    const res = await axios.get(`http://localhost:5555/auth/get_user/${id}`);
    return res;
}