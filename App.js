import { useEffect, useState } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

function App() {


  const [set, setData] = useState({});
  const [inputCity, setInputCity] = useState("");

  const apiKey = "f56f24967aaf51182d1d4df628297c6d";

  const getWeatherDetails = (cityName) => {
    if(!cityName) return;
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid="+apiKey
    axios.get(apiURL).then((res) => {
      console.log("response", res.data);
      setData(res.data);
    }).catch((err) => {
      console.log("error",err);
    })
  }

  const handleChangeInput= (e) => {
    console.log("input",e.target.value);
    setInputCity(e.target.value);
  }

  useEffect(() => {
    getWeatherDetails("London");
  },[])

  const handleSearch = () => {
    getWeatherDetails(inputCity);
  }  
  return (
    <div className='col-md-12'> 
      <div className='weatherBg'>

        <h1 className='heading'>Weather App</h1>

      <div className='d-grid gap-3 col-4 mt-4'>  
        <input type='text' className='form-control' onChange={handleChangeInput} value={inputCity}/>
        <button className='btn btn-primary' type='button' onClick={handleSearch}>Search</button>
      </div> 

      </div>

      <div className='col-md-12 text-center mt-5'>
        <div className='shadow rounded weatherResultBox'>
            <img src="https://media.gettyimages.com/id/1318246787/vector/planetary-sunrise.jpg?s=612x612&w=0&k=20&c=c0VtrJiUW2E4p8hK8sCW_3mx6aXlMsQ7P9ZcgqXVAYg=" className='weatherIcon'></img>

          <h5 className='weatherCity'>
            {set?.name}
          </h5>

            <h6 className='weatherTemp'>
              {((set?.main?.temp) - 273.15).toFixed(2)} c
            </h6>
        </div>
      </div>
    </div>
  );
}

export default App;
