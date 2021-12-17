"use strict"

document.addEventListener('DOMContentLoaded', () => {
    var myCarousel = document.querySelector('#myCarousel');
    new bootstrap.Carousel(myCarousel, {
        interval: 5000,
        wrap: true,
        pause: false,
    });

    let btns = ['Blue', 'Green', 'Red', 'Aqua'];

    let btnsClass = document.querySelector('.btns')
    let allBtns = '';

    btns.forEach((btn) => {
        allBtns += `<button type="button" class="btn btn-outline-primary chane-color-text">${btn}</button>`
    });

    btnsClass.innerHTML = '';
    btnsClass.innerHTML = allBtns;


    let el = document.querySelector('.el');
    document.querySelectorAll('.chane-color-text').forEach((btn) => {

        btn.addEventListener('click', (element) => {
            let colorClass = element.currentTarget.innerText.toLowerCase();
            el.setAttribute('class', '');
            el.classList.add('el');
            el.classList.toggle(colorClass);

        });
    });

    let myForm = document.querySelector('#message-form');
    myForm.addEventListener('submit', formSend);

    async function formSend(event) {
        event.preventDefault();

        let error = formValidation(myForm)
        let formData = new FormData(myForm)
        // formData.append('image', imgFile.files[0])

        if (error === 0) {
            myForm.classList.add('_sending')
            let response = await fetch('http://mailsend.wip/sendtelegram.php', {
                method: "POST",
                body: formData
            });
            if (response.ok) {
                let result = await response.json()
                Swal.fire({
                    // position: 'top-end',
                    icon: 'success',
                    title: result.message,
                    // showConfirmButton: false,
                    // timer: 1500
                });
                // imgPreview.innerHTML = ''
                myForm.reset()
                myForm.classList.remove('_sending')
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Помилка відпраки форми!',
                });
                myForm.classList.remove('_sending')
            }
        } else {
            Swal.fire({
                icon: 'info',
                title: 'Заповніть всі поля',
            });
        }
    }

    function formValidation(form) {
        let error = 0;
        let formReq = document.querySelectorAll('._req')

        //Зробити через forEach
        //Start
        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];

            formaRemovError(input)

            if (input.value === '') {
                formaAddError(input)
                error++;
            }
        }
        //End

        return error;
    }

    function formaAddError(input) {
        input.parentElement.classList.add('_error')
    }
    function formaRemovError(input) {
        input.parentElement.classList.remove('_error')
    }

    // const imgFile = document.querySelector('#imgFile')
    // const imgPreview = document.querySelector('#imgPreview')

    // imgFile.addEventListener('change', () => {

    //     uploadFile(imgFile.files[0])
    // });

    // function uploadFile(file) {
    //     if (!['image/jpeg', 'image/gif', 'image/png'].includes(file.type)) {
    //         Swal.fire({
    //             icon: 'info',
    //             title: 'Завантажте тільки зображення!',
    //         });
    //         imgFile.value = '';
    //         return;
    //     }
    //     if (file.size > 2 * 1024 * 1024) {
    //         Swal.fire({
    //             icon: 'info',
    //             title: 'Зображення повинно будет меньше 2 MB!',
    //         });
    //         return;
    //     }
    //     var reader = new FileReader();
    //     reader.onload = (event) => {
    //         imgPreview.innerHTML = `<img class="img-file-preview" src="${event.target.result}" alt="Img">`
    //     }
    //     reader.onerror = (event) => {
    //         Swal.fire({
    //             icon: 'error',
    //             title: 'Oops...',
    //             text: 'Помилка завантаження файлу!',
    //         });
    //     }
    //     reader.readAsDataURL(file)
    // }


    // https://jsonplaceholder.typicode.com/posts

    async function getPosts() {

        await fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => {
                return response.json()
            }).then((data) => {
                data.forEach((post) => {
                    document.querySelector('.post__list').insertAdjacentHTML('beforeend', `<div class="post__item">
                        <div class="post__id">
                            <p>${post.id}</p>
                        </div>
                        <div class="post__title">
                            <p>${post.title}</p>
                        </div>
                        <div class="post__body">
                            <p>${post.body}</p>
                        </div>
                    </div>`
                    );
                })
            })

        document.querySelector('#post__loadin').parentNode.removeChild(document.querySelector('#post__loadin'));

    }

    let observer = new IntersectionObserver((entries, observer) => {
        if (entries[0].isIntersecting) {
            setTimeout(getPosts, 3000)
        }
    });
    observer.observe(document.querySelector('#post__loadin'))



    document.querySelectorAll('.chane-img').forEach((btn) => {
        btn.addEventListener('click', (event) => {
            document.querySelector('.image-block img').setAttribute('src', `img/${event.currentTarget.getAttribute('data-img')}`)
        })
    });


    Array.from(document.querySelectorAll('.audio')).map((p, index) => {
        new Plyr(p, { controls: ['play', 'progress', 'current-time', 'mute', 'volume'] });
        p.id = `plyrAudioId-${index}`;
    });
    Array.from(document.querySelectorAll('.video')).map((p, index) => {
        new Plyr(p, { controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'] });
        p.id = `plyrVideoId-${index}`;
    });

    document.querySelectorAll('.plyr__controls__item[aria-label="Play"]').forEach((pBtn) => {
        pBtn.addEventListener('click', (event) => {
            plyaPausePlayer(event.currentTarget.parentElement.parentElement.querySelector('audio'));
        })
    });


    function plyaPausePlayer(player) {
        Array.from(document.querySelectorAll('audio')).forEach((audio) => {
            if (audio !== player) {
                audio.pause();
            }
        });
    }

});

