//console.log("Client Side Java Script file is loaded")

//fetch-api can only be used in the front end and cannot be used in the 
//back-end javascript

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     }) 
// })



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
//messageOne.textContent = 'From Javascript'

weatherForm.addEventListener('submit', (e) => {
    //This prevents the default behaviour of the browser
    e.preventDefault()
    const location = search.value
    const addressURL = '/weather?address=' + location
    messageOne.textContent = "Loading Message"
    messageTwo.textContent = ''

    fetch(addressURL).then((response) => {
    response.json().then((data) => {
        if (data.error) {
           //console.log(data.error)
           messageOne.textContent = data.error

        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = 'The Weather is ' + data.temperature + ' degrees. '
             + data.description + ' predicted. ' + 'It feels like ' + data.feelslike + ' degrees. '
             + 'The Humidity is ' + data.humidity + '%'
            
            //console.log(data.location)
            //console.log(data.temperature)
        }
        //console.log(data)

    })
})
    console.log(location)
})