var myCarousel = document.querySelector('#myCarousel')
var carousel = new bootstrap.Carousel(myCarousel, {
    interval: 5000,
    wrap: true,
    pause: false,
})

let btns = ['Blue', 'Green', 'Red']

let btnsClass = document.querySelector('.btns')
let allBtns = ''

btns.forEach((btn) => {
    allBtns += `<button type="button" class="btn btn-outline-primary chane-color-text">${btn}</button>`
})

btnsClass.innerHTML = ''
btnsClass.innerHTML = allBtns


let el = document.querySelector('.el')
document.querySelectorAll('.chane-color-text').forEach((btn) => {

    btn.addEventListener('click', (element) => {
        let colorClass = element.currentTarget.innerText.toLowerCase();
        console.log(colorClass);
        el.setAttribute('class', '');
        el.classList.add('el');
        el.classList.toggle(colorClass)

    })
});

let myForm = document.querySelector('#message-form')
myForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let formData = new FormData(myForm)
    var object = {};
    formData.forEach(function (value, key) {
        object[key] = value;
    });
    var json = JSON.stringify(object);
    console.log(json);
})



