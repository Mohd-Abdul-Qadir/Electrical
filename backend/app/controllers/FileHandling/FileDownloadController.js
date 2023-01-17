
exports.downloadFile = (req,res) => {
    let filePath = "uploads/" + req.params.filename;

    console.log(filePath);
	res.download(filePath,req.params.originalname,(err)=>{console.log(err);})
}


