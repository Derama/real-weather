const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/edc215b684499b4281e9f6a1972c3baa/' + latitude + ',' + longitude
    request({url, json: true}, (error, {body}) => {
        
        if(error){
            callback('Low level error, you\'re out of connection!', undefined)
        } else if(body.error){
            callback('Sorry, there is no longitude at all. API is not correct', undefined)
        } else{
            callback(undefined, 'Clear thoughout the day. It\'s currently ' + body.latitude + ' and longitude: ' + body.longitude)
        }
    })
}

module.exports = forecast