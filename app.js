const express=require('express')
const path=require('path')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

const homeRouter=require('./routes/home')
const productRouter=require('./routes/product')
const usersRouter=require('./routes/users')
const cartRouter=require('./routes/cart')
const orderRouter=require('./routes/orders')
const adminRouter=require('./routes/add_product')
const app=express()



app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())
app.use(flash())
app.use(
	session({
		secret: 'something',
		cookie: { maxAge: 60000 },
		resave: true,
		saveUninitialized: true,
	})
)

app.use(express.static(path.join(__dirname,'assets')))
app.use(express.static(path.join(__dirname,'tmp')))
app.set('view engine','ejs')

app.set('views','views')

require('./config/db')



app.use(homeRouter)
app.use(usersRouter)
app.use('/product',productRouter)
app.use('/cart',cartRouter)
app.use('/admin',adminRouter)
app.use("/", orderRouter)

app.all('*',(req,res,next)=>{
    res.status(404);
   res.render('error',{
		title:'Page Not Found'
	})
})



const port = process.env.PORT || 3000

app.listen(port,(err)=>{
    
    console.log('server listen on port 3000')
})
