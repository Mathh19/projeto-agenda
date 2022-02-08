import 'core-js/stable';
import 'regenerator-runtime/runtime';

import './Assets/css/style.css';

import Login from './modules/Login';
import Contacts from './modules/Contacts';

const contactEdit = new Contacts('.form-contact-edit');
const contactRegister = new Contacts('.form-contact-register'); 

const login = new Login('.form-login');
const register = new Login('.form-register');
login.init();
register.init();
contactEdit.init();
contactRegister.init();
