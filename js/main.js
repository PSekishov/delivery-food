const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const buttonOut = document.querySelector('.button-out');
const userName = document.querySelector('.user-name');
const closeAuth = document.querySelector('.close-auth');
const logInForm = document.getElementById('logInForm');
const inputLogin = document.getElementById('login');
const inputPassword = document.getElementById('password');

/********* FUNCTIONS ***************/

console.log(buttonOut);
console.log(userName);

const login = (user) => {

    buttonAuth.style.display = 'none';

    buttonOut.style.display = 'flex';
    userName.style.display = 'flex';
  
    userName.textContent = user.login;
    modalAuth.style.display = 'none';
};

const logout = () => {

    buttonAuth.style.display = 'flex';

    buttonOut.style.display = 'none';
    userName.style.display = 'none';
    userName.textContent = '';

    localStorage.removeItem('user');
};


buttonAuth.addEventListener('click', ()=>{
    modalAuth.style.display = 'flex';
});

closeAuth.addEventListener('click', ()=> {
    modalAuth.style.display = 'none';
});

buttonOut.addEventListener('click', ()=> {
    logout();
});

logInForm.addEventListener('submit', (e)=> {
    
    e.preventDefault();

    if(!inputLogin.value || inputLogin.value === ''){

        inputLogin.style.border = '1px solid red';
        inputLogin.placeholder = 'Required field';
        inputLogin.classList.add('no-valid');

        inputLogin.addEventListener('focus', ()=> {
            inputLogin.style.border = '';
            inputLogin.placeholder = '';
            inputLogin.classList.remove('no-valide'); // add style in file css
        });
        return false; 

    };

    const user = {
        login: inputLogin.value,
        password: inputPassword.value,
    };

    localStorage.setItem('user', JSON.stringify(user));

    login(user);
   
    inputLogin.value = '';
    inputPassword.value = '';
      
});

if(localStorage.getItem('user')){
    login(JSON.parse(localStorage.getItem('user')));
}