import axios from 'axios'
export const url = "http://api.weatherapi.com/v1"
export const apiKey = "8466bad1b3ea4668985161550230411"
export  let name,time,temperature,humidity,status
//retrieving api data
export async function datafetch(city){
    try{
        const response = await axios.get(`${url}/current.json?key=${apiKey}&q=${city}&aqi=no`) 
        name = response.data.location.name;
        time = response.data.location.localtime.split(" ")[1]
        temperature = response.data.current.temp_c + "C"
        humidity = response.data.current.humidity +"%"
        status = response.data.current.condition.text
    }
    catch(error){
        throw error;
    }
}




