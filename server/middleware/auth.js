const jwt =require('jsonwebtoken')

exports.validateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  
    if (!token)
    res.send('you need to login first')
    else
    try {
      const validToken = jwt.verify(token, process.env.jwt_secret);
      if (validToken) {
        // console.log('hi user')
        next()
        
      }
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }


  exports.validateTokenToHide = (req, res, next) => {

     const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  
   try {
    if (token)
      res.redirect('/')
    else next()
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  exports.validateAdmin = (req, res, next) => {
    const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  
    if (!token)
      res.send('you need to login first')
    else
    try {
      const validToken = jwt.verify(token, process.env.jwt_secret)
      
      if (validToken.user.isAdmin) {
        
        
        next()
        
      }
      else{
        res.send('you are not admin')
      }
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  exports.verifyToken=(req)=>{
    const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  
    if (token)
       {
          const verifyToken = jwt.verify(token, process.env.jwt_secret)
          return verifyToken.user
       }
    else
      {
        return {
          _id:'',
          username:'',

        }
      }
    
  }
  
  