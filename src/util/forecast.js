
const req=require('request')
const forecast=(lat,long,callback)=>
{
    const url = 'http://api.weatherstack.com/current?access_key=172ad31fb995a68ead5de93d56b2a9b2&query=' + lat + ' ,' + long
req({url,json:true},(error,{body})=>{
  //  const data = JSON.parse(response.body)
  if(error)
  {
      //console.log("Unalbe to connect")
      callback("unable to find error",undefined)
  }
  else if(body.error)
  {    callback("unable to find location",undefined)
      //console.log("unable to find loc")
  }
  else
  {
      callback(undefined,body.current.weather_descriptions[0] +" .it is currently "+ body.current.temperature + " and there is " + body.current.precip + "% chance of rain")
    }
    //console.log(response.body.current.weather_descriptions[0] +" .it is currently "+ response.body.current.temperature + " and there is " + response.body.current.precip + "% chance of rain")
})
  
}


module.exports=forecast