const Contact = require('../models/ContactModel');

exports.index = async (req, res) => {
    // Aqui é onde fica a chamada da renderização do arquivo HTML na pasta view
    const contacts = await Contact.findContacts();
    res.render('index', { contacts });
};