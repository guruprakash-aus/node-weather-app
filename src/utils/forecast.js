const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=12a988977acde33c01cb384df83942fb&query=' + latitude + ',' + longitude + '&units=m'
    //
    request({ url, json: true}, (error,{body}) => {
        if (error) {
            callback('Unable to Connect to Weather API',undefined)
        } else if (body.error) {
            callback({
                code: body.error.code,
                info: body.error.info
            },undefined)
        } else {
            callback(undefined, {
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                description: body.current.weather_descriptions[0],
                humidity: body.current.humidity
            })
        }
    })
}

module.exports = forecast