import React,{useState} from 'react';
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom'
import Cookie from 'js-cookie'
// 
import GlobalState from './components/utils/GlobalState'
import Route from './components/Router/Routes'
import SignIn from './components/SignIn';

import Nav from './components/sub/Navbar'
function App() {

  const [auth, setAuth] = useState(false);
  
  const isAuth = () =>{
    if(Cookie.get('id')!=null){
      setAuth(true);
    }else{
      setAuth(false);
    }
    
  }
  // Cookie.remove('id')
  React.useEffect(()=>{
    isAuth();
  },[])

  return (
    <GlobalState.Provider value={{
      auth,setAuth
    }}>
      <Nav/>
      <Router>
        <Route/>
      </Router>
    </GlobalState.Provider>
  );
}

export default App;
