var express=require('express');
var router=express.Router();

router.get('/logout',
    function(req,res,)
    {   //session=req.session;
       /*req.session.destroy(null);
        res.clearCookie(this.cookie,{path:'/user'});*/
        req.session.loggedin=false;
        req.session.uname=null;
        req.session.emailid=null;
        res.redirect('/');
    }
);

router.get('/authlogout',
    function(req,res,)
    {   //session=req.session;
        //req.session.destroy(null);
        //res.clearCookie(this.cookie,{path:'/auth'});
        req.session.loggedinAuth=false;
        req.session.emailAddress=null;
        req.session.name=null;
        res.redirect('/');
    }
);
module.exports=router;