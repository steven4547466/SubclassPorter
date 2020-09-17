const express = require('express')
const router = express.Router()
const formidable = require("formidable")
const fs = require("fs")
const mv = require("mv")
const mime = require("mime")

router.post('/', (req, res) => {
  let form = new formidable.IncomingForm()
  form.parse(req, (err, fields, files) => {
    if(!files.fileToUpload) return res.redirect("/")
    let rand = ~~(Math.random() * 10000000)
    let oldPath = files.fileToUpload.path
    let newPath = `${process.cwd()}/${rand}${files.fileToUpload.name}`
    mv(oldPath, newPath, async (err) => {
      if(err)
        console.error(err)
      else {
        let path = await require("../port")(newPath)
        // console.log(path)
        let filename = require("path").basename(path)
        let mimetype = mime.getType(path)

        res.setHeader('Content-disposition', 'attachment; filename=' + filename.replace(/\d/g, ""))
        res.setHeader('Content-type', mimetype)

        let filestream = fs.createReadStream(path)
        filestream.pipe(res)
      }
    })
  })
})

module.exports = router
