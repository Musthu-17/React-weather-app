import sun from './sun.png';
import moon from "./moon.png";
import './App.css';
import React , { useRef,useState, useEffect } from 'react';
import {name,time,temperature,humidity,status,datafetch} from './api.js'

function App() {
  return (
    <div className="App">           
      <Search/>
    </div>
  );
}

function Search(){
    //useref is used here for interactable searchbar
    const searchRef = useRef(null)
    //useState to catch what is searching (useless at the moment)
    const [city,setCity]=useState("");
    //Api data stored in state
    const [apidata,setApidata] = useState({name:"Enter City Name",time:"6:00",temperature:"",humidity:"",status:""})
    //useffect to configure searchRef
    useEffect(()=>{
      //when clicked outside the searchbar remove class clicked and shrink
      const handleSearch=(event)=>{
        if (searchRef.current && !searchRef.current.contains(event.target)){
          searchRef.current.classList.remove("clicked")
        }
      }
      //when clicked anywhere in the document handlesearch function is triggered
      document.addEventListener("click",handleSearch)
    })
    //changing state to value of input
    const handleChange = (event) =>{
      setCity(event.target.value)
    }
    //if clicked in class, remove it if not add it
    const handleClick=()=>{
      searchRef.current.classList.add("clicked")
    }
    //if enter key is pressed searches city and returns data
    const handleKeyPress = async (event)=>{
      if(event.key === "Enter"){
      try{
        await datafetch(city)
        setApidata({name,time,temperature,humidity,status})
      }
      catch(error){
        setCity("Something went wrong")
      }
    }
  }
    //changing header background according to night adn day
    const headerStyle={  
      background: 
      apidata.time.split(":")[0] >= 6 && apidata.time.split(":")[0] < 18
      ? "linear-gradient(to bottom,#b9e2f5,#84cdee,#50b8e7)" 
      : "linear-gradient(to bottom,#353283,#253569,#1e2b58)",
    }
    //logo change during night and day
    const imgSource = ()=>{
      return apidata.time.split(":")[0] >= 6 && apidata.time.split(":")[0] < 18
      ? sun:moon
    }

    return (
      <>
      <header className="App-header" style={headerStyle}>
      <div className='blur-back'>
      <div id="searchbar">
      <input id="search" ref={searchRef} value={city} onChange={handleChange} onClick={handleClick} className="search" type="text" placeholder='Search' onKeyPress={handleKeyPress} autoComplete='off'/>
      <p id="cityName">{apidata.name}</p>
      </div>
      <img src={imgSource()} className="App-logo" alt="logo" />
      <Weather data={apidata}/>
      </div>
      </header>
      </>
    )
}
//apidata passed as prop
function Weather(props){
  return(
  <div className="ending">
    <div className='details'>
      <div className="constant">
        <p id="temp">Temperature</p>
        <p id="det">{props.data.temperature}</p>
      </div>
      <div className="constant">   
        <p id="det">{props.data.time}</p>
      </div>
      <div className="constant">    
        <p id="hum">Humidity</p>
        <p id="det">{props.data.humidity}</p>
      </div> 
    </div>
      <p id="desc">{props.data.status}</p>
  </div>  
  )
}

export default App;

