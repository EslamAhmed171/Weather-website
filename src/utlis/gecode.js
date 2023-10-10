const request = require('postman-request');

const gecode = (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZXNsYW1haG1lZDE3MSIsImEiOiJjbG1taDJjbGQwbnB4MnFzNWl5aWxpbXpwIn0.wnjyVbCRYRAzGde19b190g&limit=1'
    
    request({url, json: true}, (error, {body})=>{
        if (error){
            callback('Unable to connect location service!', undefined)
        }
        else if (!body.features.length){
            callback('Unable to find loaction!', undefined)
        }
        else{
        const data = {
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0],
            location: body.features[0].place_name
        }
        callback(undefined, data)
        }
    })
}

module.exports = gecode