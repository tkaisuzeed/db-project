import React,{useState} from 'react'
import Cookie from 'js-cookie'
// 
import {SignInAPI} from './API/AuthAPI'

const SignIn = () => {

    const [uname, setUname] = useState('');
    const [pass, setPass] = useState('');

    const handleSignin = async(e) =>{
        e.preventDefault();
        const newAccount = {
            username:uname,
            password:pass
        }
        const data = await SignInAPI(newAccount);
        if(data.data.auth){
            Cookie.set('id',data.data.id);
            window.location.reload(true);
        }
    }


    return (
        <div className="container">
            <h1>SignIn</h1>
            <hr/>
            <form>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" onChange={e=>setUname(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" onChange={e=>setPass(e.target.value)} />
                </div>
                <div className="form-group">
                    <small>If you don't have an account, <a href="/signup">Sign Up</a></small>
                </div>
                <button className="btn btn-success" onClick={handleSignin}>SignIn</button>
            </form>
        </div>
    )
}

export default SignIn
