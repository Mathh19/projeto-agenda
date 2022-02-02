const req = require("express/lib/request");

// É importante sempre ter o next na requisição para que ela seja terminada, caso contrário vai ficar esperando uma resposta
exports.middlewareGlobal = (req, res, next) => {
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    next();
};

exports.outroMiddleware = (req, res, next) => {
    next();
};

exports.checkCsrfError = (err, req, res, next) => {
    if(err) {
        return res.render('404');
    }
    
    next();
};

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
};