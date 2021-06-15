const express = require('express');
const JWT = require ('jsonwebtoken');
const {JWT_SECRET} = require (':/config');
const database = require('../database');
const requestHandler = require('../middleware/requestHandler');

const authRouting = express.Router();

authRouting.post(
    '/login',
    requestHandler(async(req, res) =>{
        const {username, password} = req.body;

        const user  = (
            await database.search({
                username, 
                password,

            })
        ).pop();
        if (user){
            const accessToken = jwt.sign(
                {
                    username,
                    id:user.id,
                
                },
                JWT_SECRET,
                {
                    expiresIn: '30m',

                }
            );
            res.json({
                status:'success',
                accessToken,

            });
        }else{
            res.status(401).json({
                status:'error',
                error: 'Usuario o contraseña Incorrecto',
            });
        }
    })
);

module.exports = authRouting;