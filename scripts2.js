// Inloggningssida

// data:
let user = {
    username: "test",
    password: "1234",
}

let page = 0;

// References
const buttonSubmit = document.querySelector(".input__submit");
const localStorageKey = "user";


hidePages();
loadLocalStorage();

function pageDestination(){
    switch(page) {
        case 0: {
            hidePages();
            document.querySelector(".page-zero").style.display = "block";
            buttonSubmit.addEventListener('click', (event) => {
                event.preventDefault();
                let usernameInput = document.forms.form.username.value;
                let passwordInput = document.forms.form.password.value;
                validateUser(usernameInput, passwordInput);
            });
            break;
        }

        case 1: {
            hidePages();
            let heading = document.querySelector(".page-one__heading");
            heading.innerHTML = "";
            returnMessage(".page-one");
            heading.insertAdjacentText('beforeend',`Welcome ${user.username}`);
            logOut();
            break;
        }

        case 2: {
            returnMessage(".page-two");
            returnToHome();
            break;
        }
    }
}

function validateUser(username, password){
    if((username === user.username)
    && (password == user.password)) {
        page = 1;
        localStorage.setItem("pagenr", page);
        saveToLocalStorage(user);
        pageDestination();
    } else {
        page = 2;
        localStorage.setItem("pagenr", page);
        pageDestination();
    }
}


// clear localstorage on request from button.
function logOut(){
    document.querySelector('.page-one__button-logout').addEventListener('click', (event) => {
        clearLocalStorage();
        pageDestination();
    })
}

// return to start/homepage on request from button.
function returnToHome(){
    document.querySelector('.page-two__button-return').addEventListener('click', (event) => {
        clearLocalStorage();
        pageDestination();
    })
}

// saves userdata to localstorage.
function saveToLocalStorage(object) {
    localStorage.setItem(localStorageKey, JSON.stringify(object));
}

// loads data from localstorage
function loadLocalStorage(){
    let item = localStorage.getItem("pagenr");
    // console.log(item);
    if(item != null && localStorage.length > 0) {
        page = parseInt(localStorage.getItem("pagenr"));
        pageDestination();
    } else {
        page = 0;
        pageDestination();
    }
}

// clears localStorage
function clearLocalStorage() {
    localStorage.clear();
    page = 0;
}

// hides all pages 
function hidePages() {
    let pages = document.querySelectorAll("div[class^='page-']");
    pages.forEach(element => {
        element.style.display = 'none';        
    });
}

// displays returnMessagePage
function returnMessage(className){
    hidePages();
    let pageTemp = document.querySelector(className);
    pageTemp.style.display = "block";
}
