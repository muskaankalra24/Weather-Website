console.log('client side js')

const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')
// messageone.textContent= 'javascropt'
weatherform.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = search.value
    messageone.textContent = 'Loading...'
    messagetwo.textContent = ''
    fetch('http://localhost:3000/weather?address='+ location +' ').then((response) => {
response.json().then((data) => {
if (data.error) {
// console.log(data.error)
messageone.textContent = data.error
} else {
// console.log(data.place)
// console.log(data.forecastdata)
messageone.textContent = data.place

messagetwo.textContent = data.forecastdata
 }
})
})
    
})

