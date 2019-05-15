console.log('Client side js loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg-1')
const msg2 = document.querySelector('#msg-2')

const getWeather = (targetLocation) => {
    msg1.textContent = 'Loading...'
    msg2.textContent = ''
    fetch('/weather?location='+targetLocation).then((response) => {

        response.json().then(({error, forecast, location}) => {
            if (error) {
                console.log(error)
                msg1.textContent = error
            } else {
                console.log(location)
                console.log(forecast)
                msg1.textContent = location
                msg2.textContent = forecast
            }
        })
    })
}

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    getWeather(location)
})