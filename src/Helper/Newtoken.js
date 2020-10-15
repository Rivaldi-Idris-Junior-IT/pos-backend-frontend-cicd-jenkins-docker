const model = require("../Model/Users")
const respone = require("respon")
const bcr = require('bcrypt')
const jwt = require('jsonwebtoken')

class newToken {

    createNewToken = async (token) => {
        try {
                    const old_payload = jwt.decode(token);

                    const getUsername = old_payload[0].username
                    const getrole = old_payload[0].role

                    const payload = {
                        user : getUsername,
                        role : getrole
                    }            

                    const new_token = jwt.sign(payload, process.env.JWT_KEYS, { expiresIn: 60 });

                    const save = {
                        username : getUsername,
                        token : new_token,
                        role : getrole
                    }  
        
                    const update_data = await model.EditToken(save.username,save.token,save.role)                    

        } catch (error) {
            console.log(error)
            throw error            
        }
    }
}

module.exports = new newToken()