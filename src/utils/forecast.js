const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/58b39a3f55f8481290a8883dbaa4c4be/' + latitude + ',' + longitude + '?units=uk2'

    request({ url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const {temperature: temp, precipProbability: precip} = body.currently
            const msg = body.daily.data[0].summary + ' The current temperature is ' + temp + ' degrees. There is a ' + precip + '% chance of rain.'
            callback(undefined, msg)
        }
    })
}
module.exports = forecast