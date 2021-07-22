export const WatherApi = async (long)=>{
   let url =  `http://api.weatherapi.com/v1/current.json?key=d30ef1887425411aa27220443210507&q=${long}&aqi=no`;
   const fetchUrl = await fetch(url); 
   const data = await fetchUrl.json();
   return data
}