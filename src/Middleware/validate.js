const respone = require('../Helper/respon')
const jwt = require("jsonwebtoken")
const jwtDecode = require("jwt-decode")
const model = require("../Model/Users")
const {
    response
} = require('express')

const checkToken = async (req, res, next) => {
    try {
        const {token} = req.headers;
        console.log(token)

        if (token === undefined) {
            const result = {
                msg: "Silahkan masukkan token"
            }
            return respone(res, 401, result)
        }


        const userDatabase = await model.searchToken(token)
        const tokenDatabase = userDatabase[0].token


        if (token != tokenDatabase) {
            const result = {
                msg: "Di database tidak sama"
            }
            return respone(res, 401, result)
        }


        const jwtToken = jwtDecode(token)
        const userRole = jwtToken.role

        if (userRole != "admin") {
            const result = {
                msg: "Batas akses anda hanya sebagai user"
            }
            return respone(res, 401, result)
        }

        
        const DecodeToken = jwtDecode(token)

        jwt.verify(token, process.env.JWT_KEYS, async (err, deocde) => {
            const payload = {
                error: err
            }
            // if (err.name == 'TokenExpiredError'){
            //     const headerToken = req.headers;
            //     const takeToken = await model.searchToken(token)
            //     const databaseusername = takeToken[0].username
            //     console.log(databaseusername)
            //     const databaserole = takeToken[0].role
            //     console.log(databaserole)                 
            //     const payload = {
            //         username : databaseusername,
            //         role : databaserole,                    
            //     }
            //     const gentoken =  jwt.sign(payload, process.env.JWT_KEYS, { expiresIn: 10 })
            //     const refresh = {
            //         username : takeToken,
            //         token : databaserole,
            //         role : gentoken
            //     }
            //     const refresh_data = await model.EditToken(refresh.username,refresh.token,refresh.role)                
            // }else if(err){
            //     response.code(res, 500, 'error')
            // }            
            next()
            //}
        })

    } catch (error) {
        console.log(error)
        return respone(res, 500, error)
    }
}

module.exports = checkToken