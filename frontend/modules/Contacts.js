import validator from 'validator';

export default class Contacts {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        this.events();
    }

    events() {
        if (!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        });
    }

    validate(e) {
        const el = e.target;
        const emailInput = el.querySelector('input[name="email"]');
        const telefoneInput = el.querySelector('input[name="telefone"]');

        let error = false;

        for(let errorText of this.form.querySelectorAll('.error-text')) {
            errorText.remove();
        }

        if (!validator.isEmail(emailInput.value) && telefoneInput.value == null) {
            this.createError(emailInput, 'Insira um e-mail válido');
            error = true;
        }

        if (telefoneInput.value < 9 && emailInput.value == null) {
            this.createError(telefoneInput, 'Insira um telefone válido');
        }

        if (!error) el.submit();
    }

    createError(field, msg) {
        const div = document.createElement('div');

        div.innerText = msg;
        div.classList.add('error-text');
        field.insertAdjacentElement('afterend', div);
    }
}