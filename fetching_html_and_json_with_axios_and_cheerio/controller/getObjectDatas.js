const axios = require("axios")

var getObjectDatas = async (section, id) => {
    var data
    await axios.get(`https://api.api-onepiece.com/v2/${section}/en/${id}`)
    .then(response => {
        data = response.data
        data.name = data.roman_name || data.name || data.title

        Object.entries(data).forEach( ([key, value]) => {
            if (typeof value == "object") {
                data[key] = value.roman_name || value.name || value.title
            }
        })
        
        //console.log(data)

    })
    .catch(error => {
        console.log("error in getObjectDatas", error.message)
    })

    return data
}

module.exports = getObjectDatas