const select = document.querySelector('#jokesCategories');
const ul = document.querySelector(`#jokesList`);
const API = `https://api.chucknorris.io/jokes`

fetch(API + '/categories')
    .then(data => data.ok ? data.json() : Promise.reject(data.statusText))
    .then(data => data.forEach(item => {
        let option = document.createElement(`option`);
        option.text = `${item}`;
        option.value = `${item}`;
        select.add(option, select[item]);
    }))
    .catch(err => console.log(`In catch: ${err}.`));

select.addEventListener(`change`, evt => {
    fetch(API + `/random?category=${select.value}`)
        .then(data => data.ok ? data.json() : Promise.reject(data.statusText))
        .then(data => {
            let li = document.createElement(`li`);
            li.id = `${data.categories}`;
            li.innerHTML = `<p>Category: <b>${data.categories}</b></p>
                            <p>${data.value}</p>
                            <button>Remove joke</button>`;
            ul.prepend(li)
        })
        .then(() => {
            let option = document.querySelector(`option:checked`);
            option.setAttribute(`disabled`, `true`);
            let button = document.querySelector('button');
            return button;
        })
        .then((button) => {
            button.addEventListener(`click`, evt => {
                let currentCategory = evt.target.closest(`li`).querySelector(`b`).innerText;
                let currentOption = document.querySelector(`[value=${currentCategory}]`)
                currentOption.removeAttribute(`disabled`)
                evt.target.closest(`li`).remove()
            })
        })
        .catch(err => console.log(`In catch: ${err}.`))
});


// select.addEventListener(`change`, evt => {
//     fetch(`https://api.chucknorris.io/jokes/random?category=${select.value}`)
//         .then(data => data.ok ? data.json() : Promise.reject(data.statusText))
//         .then(data => {
//             let li = document.createElement(`li`);
//             li.id = `${data.categories}`;
//             li.innerHTML = `<p>Category: <b>${data.categories}</b></p>
//                             <p>${data.value}</p>
//                             <button>Remove joke</button>`;
//             ul.appendChild(li);
//         })
//         .then(() => {
//             let option = document.querySelector(`option:checked`);
//             option.setAttribute(`disabled`, `true`);
//         })
//         .then(() => {
//             let buttons = document.querySelectorAll('button');
//             buttons.forEach(item => item.addEventListener(`click`, evt => {
//                 let currentCategory = evt.target.closest(`li`).querySelector(`b`).innerText;
//                 let currentOption = document.querySelector(`[value=${currentCategory}]`)
//                 if (currentCategory === currentOption.innerText) {
//                     console.log(currentCategory, currentOption.innerText)
//                     currentOption.removeAttribute(`disabled`)
//                     evt.target.closest(`li`).remove()
//                 }
//             }))
//         })
//         .catch(err => console.log(`In catch: ${err}.`))
// });


// .then(data => {
//     let li = document.createElement(`li`);
//     li.id = `${data.categories}`;
//     li.innerHTML = `<p>Category: <b>${data.categories}</b></p>
//                             <p>${data.value}</p>
//                             <button data-listen="false">Remove joke</button>`;
//     ul.appendChild(li);
//         .then(() =>
//             ul.addEventListener(`click`, evt => {
//                 let li = evt.target.parentNode;
//                 console.log(li)
//                 let buttons = Array.from(document.querySelectorAll('button'));
//                 button.setAttribute(`data-listen`,`false`)
//                 let currentCategory = document.querySelector(`b`).innerText;
//                 let currentOption = document.querySelector(`[value=${currentCategory}]`)
//                 if (buttons.includes(evt.target)) {
//                     console.log(currentCategory);
//                     currentOption.removeAttribute(`disabled`)
//                     li.remove()
//                 }
//             })
//         )
// })