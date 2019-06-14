const request = require('request')
const forecast = (lat,long,callback) =>{
const url = 'https://api.darksky.net/forecast/cea1516a4103bc42632a9609362b30c4/'+ lat + ',' + long 

request({url , json: true}, (error, {body})=>{
      if(error){
         callback('Unable to connect to weather service', undefined)
    }else if(body.error){
        callback('Unable to find location', undefined)
    }else{
        callback( undefined, body.daily.data[0].summary + ' It is currently ' +body.currently.temperature +' degrees out. There is a '+  body.currently.precipProbability  +  '% chance of a rain')
     }
    })
}


module.exports = forecast

