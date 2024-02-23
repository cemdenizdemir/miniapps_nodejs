var express = require('express');
var router = express.Router();

const getSections = require("../controller/getSections")
const getSectionDatas = require("../controller/getSectionDatas")
const getObjectDatas = require("../controller/getObjectDatas")

router.get('/', async function(req, res, next) {
  var sections = await getSections()

  res.render('index', { 
    title: 'Sections',
    sections
  });
});

router.get("/:path", async function(req, res, next) {
  try {
    const sections = await getSections();
    const sectionDatas = await getSectionDatas(req.params.path);
    
    res.render("section", {
      title: req.params.path,
      sectionName: req.params.path,
      sections,
      sectionDatas
    });
  } catch (error) {
    console.error(error);
    res.redirect("/")
  }
});



router.get("/:path/:id", async function(req, res, next) {
  try {
    var sections = await getSections()
    var objectDatas = await getObjectDatas(req.params.path, req.params.id)
  
      res.render("object", {
        title: objectDatas.name,
        sections,
        objectDatas
      })
  }
  catch(error) {
    res.redirect(`/${req.params.path}`)
  }
})


module.exports = router;
