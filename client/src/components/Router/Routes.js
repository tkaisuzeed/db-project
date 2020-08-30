import React,{useContext} from 'react'
import {Switch,Route, Redirect} from 'react-router-dom'
import GlobalState from '../utils/GlobalState'
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import Home from '../Home';
import Reservation from '../Reservation'
import EditReservation from '../EditReservation'
import AccountManage from '../AccountManagement'

const Routes = () => {

    

    return (
        <Switch>
            <AuthRoute path="/signin" component={SignIn} />        
            <AuthRoute path="/signup" component={SignUp} />        
            <Route path="/home" component={Home} />        
            <Route path="/reservation" component={Reservation} />        
            <Route path="/edit_reservation" component={EditReservation} />
            <Route path="/account_management" component={AccountManage} />
        </Switch>
    )
}
export const AuthRoute=({component:Component,...rest})=>{
    const {auth} = useContext(GlobalState);
    return(
        <Route  {...rest} render={prop=>!auth?(<Component {...prop}/>):(<Redirect to="/home" />)} />
    )
}
export const ProtectRoute=({component:Component,...rest})=>{
    const {auth} = useContext(GlobalState);
    return(
        <Route  {...rest} render={prop=>!auth?(<Component {...prop}/>):(<Redirect to="/home" />)} />
    )
}
export const AdminRoute=({component:Component,...rest})=>{
    const {auth} = useContext(GlobalState);
    return(
        <Route  {...rest} render={prop=>!auth?(<Component {...prop}/>):(<Redirect to="/home" />)} />
    )
}

export default Routes
