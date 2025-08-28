const {app} = require('./index');
const {login} = require('./controllers/loginController')
const {register} = require('./controllers/registerController')
const {logout} = require('./controllers/logoutController')
const {sendOtp} = require('./controllers/sendOtpController')
const {newPassword} = require('./controllers/newPasswordController') 
const {getAllProducts,getProductById,addProduct,deleteProduct,editProduct}=require('./controllers/productsController')


app.post('/login', login)
app.post('/register', register)
app.post('/logout', logout)
app.post('/send-otp',sendOtp)
app.post('/new-password',newPassword)
app.get('/products',getAllProducts)
app.get('/product/:id',getProductById)
app.post('/add-product',addProduct)
app.delete('/delete-product/:id',deleteProduct)
app.put('/edit-product/:id',editProduct)