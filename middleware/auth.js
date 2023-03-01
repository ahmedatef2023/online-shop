const jwt =require('jsonwebtoken')

exports.validateToken = (req, res, next) => {
    const accessToken = req.cookies["access_token"];
  
    if (!accessToken)
      res.redirect('/login')
    else
    try {
      const validToken = jwt.verify(accessToken, "ahmed12");
      if (validToken) {
        req.authenticated = true;
        
        next()
        
      }
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }


  exports.validateTokenToHide = (req, res, next) => {
    const accessToken = req.cookies["access_token"];
   try {
    if (accessToken)
      res.redirect('/')
    else next()
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  exports.validateAdmin = (req, res, next) => {
    const accessToken = req.cookies["access_token"];
  
    if (!accessToken)
      res.redirect('/login')
    else
    try {
      const validToken = jwt.verify(accessToken, "ahmed12")
      
      if (validToken.user.isAdmin) {
        
        
        next()
        
      }
      else{
        res.redirect('/')
      }
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  exports.verifyToken=(req)=>{
    const accessToken = req.cookies["access_token"];
  
    if (accessToken)
       {
          const verifyToken = jwt.verify(accessToken, "ahmed12")
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
  
  