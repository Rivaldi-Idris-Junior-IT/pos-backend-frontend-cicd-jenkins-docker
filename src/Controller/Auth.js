const model = require("../Model/Users")
const respone = require("../Helper/respon")
const bcr = require('bcrypt')
const jwt = require('jsonwebtoken')
require("dotenv").config();


class Auth {

      login = async (req, res) => {

        try {
        const passDB = await model.getByUsername(req.body.username)
        
        if(passDB.length <= 0) {
            respone(res, 200, "Username tidak terdaftar")
        }

        const passReq = req.body.password
        const check = await bcr.compare(passReq, passDB[0].password)

        if(check) {
            const result = await this.setToken(req.body.username)
            respone(res, 200, result)
        }else{
            respone(res, 200, "Gagal Login")
        }

        } catch (error) {
            console.log(error)
            respone(res, 500, error)
        }
    }

    setToken = async (username) => {        
        try {   
            const cek_account = await model.getByUsername(username)
            
            const payload = {
                username : username,
                role : cek_account[0].role
            }            

            const gentoken =  jwt.sign(payload, process.env.JWT_KEYS, { expiresIn: 20 })
            
            const getusername = cek_account[0].username
                        
            const save = {
                username : getusername,
                token : gentoken,
                role : cek_account[0].role
            }  

            const update_data = await model.EditToken(save.username,save.token,save.role)
            
    
            const result = {
                token : gentoken,
                msg : "Token created, login success",
                desc : update_data
            }    
            return result
        
        } catch (error) {
            console.log(error)
            throw error
        }

    }

}

module.exports = new Auth()