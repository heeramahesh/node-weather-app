


console.log("This is client side script")


const weatherForm=document.querySelector('form')
const search = document.querySelector('input')
const messageone=document.querySelector('#p1')
const messagetwi=document.querySelector('#p2')
weatherForm.addEventListener('submit',(e)=>
{   e.preventDefault()
    const loc=search.value
    messageone.textContent="Loading"
    fetch('/weather?address='+loc).then((response)=>
{
    response.json().then((data)=>{
    if(data.error)
    {
        messageone.textContent=data.error
       // console.log(data.error)
    }
    else
    {   messageone.textContent=data.location
        messagetwi.textContent=data.forecast
        //console.log(data.location)
        //console.log(data.forecast)
    }
})

})
})