const database = require('../Config/Databases')
const History = {}

// Model Category
History.GetAll = () => {
    return new Promise((resolve, reject) => {
        database.query("SELECT * FROM table_histori")
        .then(res => {
            resolve(res.rows)
        })
        .catch(err => {
            reject(err)
        })
    })
}

History.searchCashier = (cashier) => {
    return new Promise((resolve, reject) => {
        database
        .query(`SELECT * FROM table_histori WHERE cashier LIKE '%${cashier}%'`)
        .then( (res) => {
            resolve(res.rows)
        })
        .catch( (err) => {
            reject(err)
        })
    })
}

History.Add = (invoices, cashier, orders, amount, date) => {         
    return new Promise((resolve, reject) => {        
        database
        .query(`INSERT INTO table_histori (invoices, cashier, orders, amount, date) VALUES ('${invoices}','${cashier}','${orders}','${amount}','${date}')`)
        .then( (res) => {
            resolve(History.GetAll())
        })
        .catch( (err) => {
            reject(err)
        })
    })    
}
// `UPDATE public.table_produk SET nama='${nama}',harga=${harga},stok=${stok} WHERE id=${id}; 

History.Edit = (id, invoices, cashier, date, orders, amount) => { 
    return new Promise((resolve, reject) => {
        database
        .query(`UPDATE public.table_histori SET invoices = '${invoices}', cashier = '${cashier}', date = '${date}', orders = '${orders}', amount = '${amount}' WHERE id = ${id}`)
        .then( (res) => {
            resolve(History.GetAll())
        })
        .catch( (err) => {
            reject(err)
        })
    })    
}

History.Delete = (id) => { 
    return new Promise((resolve, reject) => {
        database
        .query(` DELETE FROM public.table_histori WHERE id=${id}; `)
        .then( (res) => {
            resolve(History.GetAll())
        })
        .catch( (err) => {
            reject(err)
        })
    })    
}

module.exports = History