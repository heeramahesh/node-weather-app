const req=require('request')
const geocode=(address,callback)=>
{
    const urll='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiaGVlcmExMSIsImEiOiJja2xvb2w2bHAwZHo3Mm9ud2Q0MjZmNjJqIn0.6r2GInZvjrEksWYNPV9_Kg&limit=1'
     req({url:urll,json:true},(error,response)=>
     {
         if(error)
         {
             callback('unable to call location services!',undefined)

         }
         else if(response.body.features.length===0)
         {
             callback("unable to find location",undefined)
         }
         else
         {
             callback(undefined,
                {
                    latitude:response.body.features[0].center[1],
                    longitude:response.body.features[0].center[0],
                    location:response.body.features[0].place_name
                }
                )
         }
     })
}
module.exports = geocode