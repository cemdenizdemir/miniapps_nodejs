const cheerio = require("cheerio")
const axios = require("axios")

const getSections = async () => {
    var page
    await axios.get("https://www.api-onepiece.com/en/documentation")
        .then(res => {
            page = res.data
        })

    const $ = cheerio.load(page)

    const sections = $(".row.align-content-center.justify-content-center > *").map((i, el) => {
        var name = $(el).find(".card-title.text-center.font-weight-bold").text()
        
        return {
            name,
            img: $(el).find("img").attr("src"),
            tag: setTag(name)
        }
    }).get()
        .filter(section => section)

    const sectionsList = sections.map(section => ({
        name: section.name,
        img: section.img,
        tag: section.tag
    }));

    return sectionsList
}

var setTag = (name) => {
    if (name.startsWith("The")) {
        name = name.replace("The ", "")
    }
    else if (name.startsWith("Luffy")) {
        name = name.replace("Luffy's ", "luffy-")
        if (!name.endsWith('s')) {
            name += 's';
        }
    }

    name = name.toLowerCase()

    if (name == "volumes") {
        name = "tomes"
    }
    else if (name == "films") {
        name = "movies"
    }
    else if (name == "bows") {
        name = "arcs"
    }
    
    return name
}

module.exports = getSections