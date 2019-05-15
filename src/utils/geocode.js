const request = require('request')

const geocode = (address, callback) => {
    const mapUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZ2FyeS1ibGFja2J1cm4iLCJhIjoiY2p2aTRoeGd3MDIyYTN5dDY3dXd3NWo0YiJ9.-hsxVPExNTh4wyTTDUF-sA&limit=1'

    request({ url: mapUrl, json: true}, (error, {body = {}} = {}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.message || body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode