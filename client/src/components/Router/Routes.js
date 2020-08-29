import React,{useContext} from 'react'
import {Switch,Route, Redirect} from 'react-router-dom'
import GlobalState from '../utils/GlobalState'
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import Home from '../Home';

const Routes = () => {

    

    return (
        <Switch>
            <AuthRoute path="/signin" component={SignIn} />        
            <AuthRoute path="/signup" component={SignUp} />        
            <Route path="/home" component={Home} />        
        </Switch>
    )
}
export const AuthRoute=({component:Component,...rest})=>{
    const {auth} = useContext(GlobalState);
    return(
        <Route  {...rest} render={prop=>!auth?(<Component {...prop}/>):(<Redirect to="/home" />)} />
    )
}

export default Routes
