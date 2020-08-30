import React from 'react'
import Cookie from 'js-cookie'

import GlobalState from '../utils/GlobalState'
import {getUserAPI} from '../API/AuthAPI'

const Navbar = () => {
    
    const {auth} = React.useContext(GlobalState);

    const [user, setUser] = React.useState('');

    const getUser=async()=>{
        const res = await getUserAPI(Cookie.get('id'));
        console.log(res.data);
        setUser(res.data.name)
    }

    const handleLogout=()=>{
        Cookie.remove('id');
        window.location.reload(true);
    }
    
    React.useEffect(()=>{
        getUser();
    },[])

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="/home">OMAKASE</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    {
                        !auth?
                            (<li className="nav-item">
                                <a className="nav-link" href="/signin">SignIn</a>
                            </li>):
                            (<>
                                <li className="nav-item">
                                    <a className="nav-link" href="/reservation">Reserve</a>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {user}
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <a className="dropdown-item" href="#">Reserve List</a>
                                        <a className="dropdown-item" href="#" onClick={handleLogout}>LogOut</a>
                                    </div>
                                </li>
                            </>)
                    }
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
