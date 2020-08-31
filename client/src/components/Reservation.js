import React,{useState} from 'react'
import Cookie from 'js-cookie'
import {getAllTripAPI,buyTicketAPI} from './API/ReserveAPI'


const Reserve = () => {

    const [trips, setTrips] = useState();
    const [trips_id, setTrips_id] = useState(0);
    const [reserveData, setReserveData] = useState({});
    const [seat, setSeat] = useState(0);

    const get_trip=async()=>{
        const data = await getAllTripAPI();
        setTrips(data.data)
        let trip_body = document.getElementById('trip_tb');
        
        data.data.map(item=>{
            const row = document.createElement('tr');
            const id = document.createElement('td');
            id.innerHTML = item.trip_id;
            const name = document.createElement('td');
            name.innerHTML = item.trip_name;
            const desp = document.createElement('td');
            desp.innerHTML = item.description;
            const date = document.createElement('td');
            date.innerHTML = new Date(item.date).toLocaleDateString();
            const seat = document.createElement('td');
            seat.innerHTML = item.seat;
            const price = document.createElement('td');
            price.innerHTML = item.price;
            const btn = document.createElement('button');
            btn.innerHTML = 'Select';
            btn.classList.add('btn','btn-outline-success');
            btn.addEventListener('click',()=>{
                setTrips_id(item.trip_id);
                setReserveData({
                    no:item.trip_id,
                    name:item.trip_name,
                    date:new Date(item.date).toLocaleDateString(),
                    seat:parseInt(item.seat)
                })
            })
            row.appendChild(id);
            row.appendChild(name);
            row.appendChild(desp);
            row.appendChild(date);
            row.appendChild(seat);
            row.appendChild(price);
            row.appendChild(btn);
            trip_body.appendChild(row);
        })
    }

    const buyTrip=async()=>{

        if((parseInt(seat)+parseInt(reserveData.seat))<=10){
            if(seat<6&&seat>0){
                const newData = {
                    list:manageAmountTrip(trips_id,seat),
                    seat:parseInt(seat)+parseInt(reserveData.seat),
                    user_id:Cookie.get('id'),
                    trip_id:trips_id
                };
                console.log(newData);
                const res = buyTicketAPI(newData);
            }else{
            window.alert(`Pls enter seat amount between 0-5.`)
            }
        }else{
            window.alert(`This trip is full or Pls select trip.`)
        }
    }

    const manageAmountTrip=(id,amount)=>{
        let x=''+id;
        let y=''+id;
        for(let i =0;i<amount-1;i++){
            x+=','+y;
        }
        return x;
    }

    React.useEffect(()=>{
        get_trip();
    },[])

    return (
        <div className="container">
            <h1>Reservation</h1>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th>ID.</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Seat</th>
                        <th>Price</th>
                        <th>Selector</th>
                    </tr>
                </thead>    
                <tbody id="trip_tb">
                    {/* Data of All Trips. */}
                </tbody>
            </table>    
            <div className="row reservation-bar">
                <div className="col-1">
                    <input type="text" className="form-control" value={reserveData.no?(reserveData.no):''} placeholder="NO." disabled/>
                </div>
                <div className="col-3">
                    <input type="text" className="form-control" value={reserveData.name?(reserveData.name):''} placeholder="TRIP NAME." disabled/>
                </div>
                <div className="col-3">
                    <input type="text" className="form-control" value={reserveData.date?(reserveData.date):''} placeholder="DATE." disabled/>
                </div>
                <div className="col-3">
                <input type="number" className="form-control" placeholder="0" min="1" max="5" onChange={e=>setSeat(e.target.value)} />
                </div>
                <div className="col-2">
                    <button className="btn btn-primary form-control" onClick={buyTrip} >Reserve</button>
                </div>
            </div>
        </div>
    )
}

export default Reserve
