import axios from 'axios'

export const getAllTripAPI=async()=>{
    const res = await axios.get(`http://localhost:5555/reserve/get_trip`);
    return res;
}
export const butTicketAPI=async()=>{
    
}