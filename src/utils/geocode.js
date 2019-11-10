const request = require('request')


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicmFtYWRldmEiLCJhIjoiY2syMjR3aHc1MTc2NTNubWZsaHRrOGZqbiJ9.SfQLZgu3YlJP4vpxszXEHw&limit=1'

    request({url, json: true}, (error, {body}) => {
        //let's handle the error
        if(error){
            callback('Unable to connect to locate the service', undefined)
        }else if(body.features.length === 0){
            callback('Unable to find the location!', undefined)
        } else {
            callback(undefined, {
                longitude: body.features[0].center[1], 
                latitude: body.features[0].center[0], 
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode