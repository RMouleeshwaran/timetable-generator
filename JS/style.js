
var x =document.getElementById("login");
var y =document.getElementById("register");
var z =document.getElementById("button");

function register(){
    x.style.left="-400px";
    y.style.left="50px";
    z.style.left="110px";
}
function login(){
    x.style.left="50px";
    y.style.left="450px";
    z.style.left="0";
}

// document.addEventListener('DOMContentLoaded', () => {
    const select = document.querySelector('.select');
    const caret = document.querySelector('.caret');
    const menu = document.querySelector('.see');
    const options = document.querySelectorAll('.see li');
    const selected = document.querySelector('.selected');
    select.addEventListener('click', () => {
        select.classList.toggle('select-clicked');
        caret.classList.toggle('caret-rotate');
        menu.classList.toggle('menu-open');
    });
    options.forEach(option => {
        option.addEventListener('click', () => {
            selected.innerText = option.innerText;
            select.classList.remove('select-clicked');
            caret.classList.remove('caret-rotate');
            menu.classList.remove('menu-open');
            options.forEach(option => {
                option.classList.remove('active');
            });
            option.classList.add('active');
        });
    });
// });

