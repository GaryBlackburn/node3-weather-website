const getLocation = () => {
    if (process.argv.length < 3) {
        console.log("You must provide a location")
        return undefined
    }
    return process.argv[2]
}

module.exports = getLocation