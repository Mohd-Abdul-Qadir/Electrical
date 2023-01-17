const formidable = require('formidable')

exports.fileUpload = (req,res) => {
    try {
        
        let form = new formidable.IncomingForm()
        form.uploadDir = "./uploads"
        form.keepExtensions = true
        console.log(req.body)
        form.parse(req, (err, fields, files) => {
            console.log(files)
            if (Object.keys(files).length) {
                res.json({message: "File uploaded successfully",filename: files.fileUploaded.path}).status(200)
            }
            else res.json({message: "No file Selected", filename: "NULL"})
        })
    } catch (err) {
        res.json({message: "File Not Found",filename: "NULL"})
    }
}