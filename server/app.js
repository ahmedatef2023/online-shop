const express=require('express')
const path=require('path')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const cors =require('cors')
const flash = require('connect-flash')
const dotenv=require('dotenv')


const homeRouter=require('./routes/home')
const productRouter=require('./routes/product')
const usersRouter=require('./routes/users')
const cartRouter=require('./routes/cart')
const orderRouter=require('./routes/orders')
const adminRouter=require('./routes/add_product')
const app=express()
dotenv.config()

app.use(cors({
	origin: process.env.clientUrl
             }))


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


app.use('/upload',express.static(path.join(__dirname,'upload')))




require('./config/db')



app.use(homeRouter)
app.use(usersRouter)
app.use('/api/product',productRouter)
app.use('/cart',cartRouter)
app.use('/admin',adminRouter)
app.use("/", orderRouter)

app.all('*',(req,res,next)=>{
    res.status(404).send('not found this page')
})



const port = process.env.PORT || 1000

app.listen(port,()=>{
    
    console.log(`server listen on port  ${port}`)
})
