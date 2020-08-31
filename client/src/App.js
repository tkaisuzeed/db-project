import React,{useState} from 'react';
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom'
import Cookie from 'js-cookie'
import {getUserAPI} from './components/API/AuthAPI'
// 
import GlobalState from './components/utils/GlobalState'
import Route from './components/Router/Routes'
import Nav from './components/sub/Navbar'

function App() {

  const [auth, setAuth] = useState(false);
  const [user, setUser] = React.useState('');
  const [client, setClient] = React.useState();

  const getUser=async()=>{
    const res = await getUserAPI(Cookie.get('id'));
    console.log(res.data);
    setUser(res.data.name)
  }

  const isAuth = () =>{
    if(Cookie.get('id')!=null){
      setAuth(true);
    }else{
      setAuth(false);
    }
    
  }
  // Cookie.remove('id')
  React.useEffect(()=>{
    getUser();
    isAuth();
  },[])

  return (
    <GlobalState.Provider value={{
      auth,setAuth,
      user,setUser,
    }}>
      <Nav/>
      <Router>
        <Route/>
      </Router>
    </GlobalState.Provider>
  );
}

export default App;
