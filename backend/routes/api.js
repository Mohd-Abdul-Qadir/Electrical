const router = require('express').Router()
const {registerValidation,loginValidation,auth} = require('../app/middlewares/auth')
const {register} = require('../app/controllers/Auth/RegisterController')
const {login} = require('../app/controllers/Auth/LoginController')
const { refreshToken } = require('../app/controllers/Auth/RefreshTokenController')
const { fileUpload } = require('../app/controllers/FileHandling/FileUploadController')
const { downloadFile } = require('../app/controllers/FileHandling/FileDownloadController')
const { submitForm, deleteFormData } = require('../app/controllers/Form/UserFormController')
const { listAll } = require('../app/controllers/Form/ListController')
const { getEmployees, deleteEmployee } = require('../app/controllers/Employee/EmployeeList')
const { getCsv, filterData } = require('../app/controllers/Employee/GetCSV')

router.post('/register',registerValidation,register)
router.post('/login',loginValidation,login)
router.post('/refresh_session',refreshToken)

router.get('/protected',auth,(req,res) => {
    res.json({message:"ACCESSED"}).status(200);
})

router.post('/upload',auth,fileUpload)
router.post('/submitForm',auth,submitForm)
router.post('/deleteForm',auth,deleteFormData)
router.get('/download/:filename/:originalname',downloadFile)

router.post('/getList',auth,listAll);
router.get('/getEmployees',auth,getEmployees);
router.post('/deleteEmployee',auth,deleteEmployee);
router.post('/getCSV',auth,getCsv);
router.post('/getFilterData',auth,filterData);


router.post('/validate',auth,(req,res)=> {
    return res.json({message:"Done",type: req.user.type}).status(200);
})


module.exports = router