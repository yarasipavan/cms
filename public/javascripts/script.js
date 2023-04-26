function aa1()
{
    var a=document.getElementById("user");
    var b=document.getElementById("auth");
    a.style.display="contents";
    b.style.display="none";
    var x=document.getElementById("a2");
    x.style.backgroundColor="transparent";
    x.style.color="black";
    var y=document.getElementById("a1");
    y.style.backgroundColor="#007bff";
    y.style.color="#fff";
    y.style.borderColor="#007bff";
}
function aa2()
{
    var a=document.getElementById("user");
    var b=document.getElementById("auth");
    a.style.display="none";
    b.style.display="contents";
    var x=document.getElementById("a1");
    x.style.backgroundColor="transparent";
    x.style.color="black";
    var y=document.getElementById("a2");
    y.style.backgroundColor="#007bff";
    y.style.color="#fff";
    y.style.borderColor="#007bff";
}
function ValidateEmailUser() 
{   var x=document.getElementById("email");
var y=document.getElementById("e1");
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(x.value))
  {
    y.style.display="none";
    return true;
  }
  
  y.style.display="contents";
    return false;
}
function ValidateEmailAuth() 
{   var x=document.getElementById("email1");
var y=document.getElementById("e2");
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(x.value))
  {
    y.style.display="none";
    return true;
  }
  
  y.style.display="contents";
    return false;
}
function ValidatePasswordUser()
{
    var x=document.getElementById("password");
    var y=document.getElementById("p1");
    if(/^\S*$/.test(x.value))
    {
        y.style.display="none";
        return true;
    }
    y.style.display="contents";
    return false;
}
function ValidatePasswordAuth()
{
    var x=document.getElementById("password1");
    var y=document.getElementById("p2");
    if(/^\S*$/.test(x.value))
    {
        y.style.display="none";
        return true;
    }
    y.style.display="contents";
    return false;
}