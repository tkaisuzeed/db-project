import axios from 'axios'

export const getAllTripAPI=async()=>{
    const res = await axios.get(`http://localhost:5555/reserve/get_trip`);
    return res;
}
export const buyTicketAPI=async(data)=>{
    const res = await axios.post(`http://localhost:5555/reserve/buy_trip`,data);
    return res;
}
export const insertTripAPI=async(data)=>{
    const res = await axios.post(`http://localhost:5555/reserve/insert_trip`,data);
    return res;
}
export const deleteTripAPI=async(data)=>{
    const res = await axios.post(`http://localhost:5555/reserve/delete_trip`,data);
    return res;
}