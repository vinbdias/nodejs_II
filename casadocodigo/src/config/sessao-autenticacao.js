const uuid = require('uuid/v4');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const UsuarioDao = require('../app/infra/UsuarioDao');
const db = require('./database');

module.exports = app => {

    passport.use(new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'senha'
        },
        (email, senha, done) => {

            const usuarioDao = new usuarioDao(db);
            usuarioDao.buscaPorEmail(email)
                        .then(usuario => {

                            if(!usuario || senha !== usuario.senha)
                                return done(null, false, {
                                    mensagem: 'Login e senha incorretos!'
                                });

                            return done(null, usuario);
                        })
                        .catch(error => done(error, false));
        }
    ));
};