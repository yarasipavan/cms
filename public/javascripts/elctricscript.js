/*!
* Start Bootstrap - Simple Sidebar v6.0.5 (https://startbootstrap.com/template/simple-sidebar)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-simple-sidebar/blob/master/LICENSE)
*/
// 
// Scripts
// 
/*window.onscroll = function() {myFunction()};

// Get the navbar
var navbar = document.getElementById("navigationbar");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}*/
window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});
function makeactive(id)
{   var x=document.getElementById(id);
    x.classList.toggle('active');
}
function Validate()
{ 
  let x=ValidateCurrent();
  let y=ValidatePassword();
  let z=ValidateNew();
  let a= x && y && z;
  return a;
}
function ValidateCurrent()
{
  let x=document.getElementById('inputPasswordOld');
  if(/^\S*$/.test(x.value) && !(x.value==""))
    {   x.classList.add('is-valid');
        x.classList.remove('is-invalid');
        return true;
    }
    x.classList.add('is-invalid');
    x.classList.remove('is-valid');
    return false;
}
function ValidatePassword()
{
  let x=document.getElementById('inputPasswordNew');
  if(/^\S*$/.test(x.value)  && !(x.value==""))
    {
        x.classList.add('is-valid')
        x.classList.remove('is-invalid');
        return true;
    }
    x.classList.add('is-invalid');
    x.classList.remove('is-valid');
    return false;
}
function ValidateNew()
{
  let x=document.getElementById('inputPasswordNew');
  let y=document.getElementById('inputPasswordNewVerify');
  if(!(x.value===y.value))
  {
    y.classList.add('is-invalid')
    y.classList.remove('is-valid');
    return false; 
  }
  y.classList.add('is-valid');
  y.classList.remove('is-invalid');
    return true;
}