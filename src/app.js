const express= require('express')
const path=require('path')
const hbs=require('hbs')
const { send } = require('process')
console.log(path.join(__dirname,'../public'))
const viewsPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')
const geocode=require('./util/geocode.js')
const forecast=require('./util/forecast.js')
const { request } = require('http')
const app=express()
app.set('view engine', 'hbs')
app.set('views',viewsPath)
app.use(express.static(path.join(__dirname,'../public')))
hbs.registerPartials(partialPath)
app.get('/',(req,res)=>
 {
       res.render('index',{title :'Weather',name : 'Heera'})

 })
 app.get('/help',(req,res)=>
 
 {
          res.render('help',{title:'weather',name : 'heera'})
 })

// app.get('/about',(req,res)=>
// {
//     res.send('<h1>about</h1>')
// })
app.get('/weather',(req,res)=>
{
    if(!req.query.address)
    {   console.log("inside me")
        return res.send(
        {   
            error:'please provide address'
        }
    )
        
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>
    {      console.log("inside me")
           if(error)
           {   
               return res.send({error:'cannot find the details'})
           }
           forecast(latitude,longitude,(error,data)=>
           {
               if(error)
               {
                   return res.send('weather data doesnt exist')
               }
               res.send({
                   forecast:data,
                   location,
                   address:req.query.address
               })
           })


    })




   
    
   
   // res.send({location:'boston',temperature:35,address:req.query.address})
})
app.listen(3000,()=>
{
    console.log('server is up and running')
})
app.get('/product',(req,res)=>{
    if(!req.query.search)
    {
     return res.send(
         {
             error:'u must provide a search term'
         }
     )   
    }
    else{
        res.send({
            products : []
        })
    }
})
app.get('/help/*',(req,res)=>{
    res.render('404',{error:'help page not found',name:"Heera"})
})
app.get('*',(req,res)=>{
    res.render('404',{error:'page 404 not found',name:"Heera"})
})


module.exports = app