const database = require('../Config/Databases')
const Category = {}


Category.GetAll = () => {
    return new Promise((resolve, reject) => {
        database.query("SELECT * FROM table_kategori ")
        .then( (res) => {
            resolve(res.rows)
        })
        .catch( (err) => {
            reject(err)
        })
    })
}

Category.searchByName = (nama_kategori) => {
    return new Promise((resolve, reject) => {
        database
        .query(`SELECT * FROM table_kategori WHERE nama_kategori LIKE '%${nama_kategori}%'`)
        .then( (res) => {
            resolve(res.rows)
        })
        .catch( (err) => {
            reject(err)
        })
    })
}

Category.Add = (nama_kategori) => { 
    return new Promise((resolve, reject) => {
        database
        .query(`INSERT INTO table_kategori (nama_kategori) VALUES ('${nama_kategori}')`)
        .then((res) => {        
            resolve(Category.GetAll())
        })
        .catch((err) => {
            reject(err)
        })
    })

    
}

Category.Edit = (id, nama_kategori) => { 
    return new Promise((resolve, reject) => {
        database
        .query(`UPDATE public.table_kategori SET nama_kategori='${nama_kategori}' WHERE id=${id}; `)
        .then( (res) => {        
            resolve(Category.GetAll())
        })
        .catch( (err) => {
            reject(err)
        })
    })
    
}

Category.Delete = (id) => { 
    return new Promise((resolve, reject) => {
        database
        .query(` DELETE FROM public.table_kategori WHERE id=${id}; `)
        .then( (res) => {        
            resolve(Category.GetAll())
        })
        .catch( (err) => {
            reject(err)
        })
    })  
    
}

module.exports = Category