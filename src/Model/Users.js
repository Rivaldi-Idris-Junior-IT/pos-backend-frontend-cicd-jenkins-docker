const database = require('../Config/Databases')
const Users = {}

// Model Users
Users.GetAll = () => {
    return new Promise((resolve, reject) => {
        database.query("SELECT * FROM table_users")
        .then((res) => {
            resolve(res.rows)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

Users.getByUsername = (username) => {
    return new Promise((resolve, reject) => {
        database.query(`SELECT * FROM public.table_users WHERE username = '${username}'`)
        .then((res) => {
            resolve(res.rows)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

Users.Add = (data) => { 
    return new Promise((resolve, reject) => {
        database
        .query(`INSERT INTO public.table_users (username,password,token,role) VALUES ('${data.username}','${data.password}','${data.token}','${data.role}')`)
        .then((res) => {        
            resolve(Users.GetAll())
        })
        .catch((err) => {
            reject(err)
        })
    })      
}

Users.Edit = (id, username,password,token) => { 
    return new Promise((resolve, reject) => {
        database
        .query(`UPDATE public.table_users SET username='${username}',password='${password}',token='${token}' WHERE id=${id}; `)
        .then((res) => {        
            resolve(Users.GetAll())
        })
        .catch((err) => {
            reject(err)
        })
    })
}

Users.EditToken = (username, token, role) => { 
    return new Promise((resolve, reject) => {
        database
        .query(`UPDATE public.table_users SET token = '${token}', role='${role}' where username = '${username}'`)
        .then((res) => {        
            resolve(Users.GetAll())
        })
        .catch((err) => {
            reject(err)
        })
    })
}

Users.Delete = (id) => { 
    return new Promise((resolve, reject) => {
        database
        .query(`DELETE FROM public.table_users WHERE id= ${id}; `)
        .then((res) => {        
            resolve(Users.GetAll())
        })
        .catch((err) => {
            reject(err)
        })
    })
}

Users.setToken = (username, token, role)  => {
    return new Promise((resolve, reject) => {
        database
        .query(`UPDATE public.table_users SET token = '${token}' where username = '${username}'`)
        .then((res) => {        
            resolve(`token set in user : ${username}` )
        })
        .catch((err) => {
            reject(err)
        })
    })
}

Users.searchToken = (token) => {
    return new Promise((resolve, reject) => {
        database.query(`SELECT * FROM public.table_users WHERE token = '${token}'`)
        .then((res) => {
            resolve(res.rows)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

module.exports = Users