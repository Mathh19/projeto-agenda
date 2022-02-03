const mongoose = require('mongoose');
const validator = require('validator');

const ContactSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    telefone: { type: String, required: false, default: '' },
    criadoEm: { type: Date, default: Date.now },
});

const ContactModel = mongoose.model('Contact', ContactSchema);

function Contact(body) {
    this.body = body;
    this.errors = [];
    this.contact = null;
}

Contact.findId = async function (id) {
    if (typeof id !== 'string') return;
    const user = await ContactModel.findById(id);
    return user;
};

Contact.prototype.register = async function () {
    this.valida();
    if (this.errors.length > 0) return;
    this.contact = await ContactModel.create(this.body);
};

Contact.prototype.valida = function () {
    this.cleanUp();

    // Validação
    if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');
    if (!this.body.nome) this.errors.push('Nome é um campo obrigatório.');
    if (!this.body.email && !this.body.telefone) {
        this.errors.push('Para cadastrar o contato você precisa preencher o campo e-mail ou o telefone.');
    }
};

Contact.prototype.cleanUp = function () {
    for (const key in this.body) {
        if (typeof this.body[key] !== 'string') {
            this.body[key] = '';
        };
    }

    this.body = {
        nome: this.body.nome,
        sobrenome: this.body.sobrenome,
        email: this.body.email,
        telefone: this.body.telefone
    }
};

module.exports = Contact;