const request = require('postman-request');

const forcast = (latitude, longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=be1e85021c6888183d3d7ba8194690a0&query=' + latitude +',' + + longitude +' &units=m'
    request({url, json: true}, (error, {body}) =>{
        if (error){
        callback("Unable to connect weather service!", undefined)
        }
        else if (body.error){
            callback(body.error.info, undefined);
        }
        else{
            const data = 'it is ' + body.current. weather_descriptions[0] + ', ' +  body.current.temperature + '°C,' + ' and it feels like ' + body.current.feelslike + '°C ' + ' outside, '+ 'and the humidity is ' + body.current.humidity + '%.' 
            callback(undefined, data)
        }
    })
}

module.exports = forcast