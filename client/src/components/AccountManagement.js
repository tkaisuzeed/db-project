import React from 'react'
import GlobalState from './utils/GlobalState'
import Cookie from 'js-cookie'
import {getUserTripAPI} from './API/ReserveAPI'
import {getUserAPI} from './API/AuthAPI'
const AccountManagement = () => {

    const {client} = React.useContext(GlobalState);

    const creatUserTripTB=async()=>{
        
        const user = await getUserAPI(Cookie.get('id'));
        const list = user.data.trip_list.split(',');
        const trip_body = document.getElementById('trip_tb');
        let count = 1;
        list.map(async(_id)=>{
            const row = document.createElement('tr');
            const trip = await getUserTripAPI({id:_id});
            const no = document.createElement('td');
            no.innerHTML = count;
            const id = document.createElement('td');
            id.innerHTML = trip.data.trip_id; 
            const name = document.createElement('td');
            name.innerHTML = trip.data.trip_name;
            const desp = document.createElement('td');
            desp.innerHTML = trip.data.description;
            const date = document.createElement('td');
            date.innerHTML = new Date(trip.data.date).toLocaleDateString();
            row.appendChild(no);
            row.appendChild(id);
            row.appendChild(name);
            row.appendChild(desp);
            row.appendChild(date);
            trip_body.appendChild(row);
            count++;
        })
    }

    React.useEffect(()=>{
        creatUserTripTB();
    },[])

    return (
        <div className="container">
            <h1>{client.name}</h1>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>ID.</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody id="trip_tb" >
                    {/* All trip of user */}
                </tbody>
            </table>
        </div>
    )
}

export default AccountManagement
