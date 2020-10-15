const database = require('../Config/Databases')
const Product = {}

// Model Product
Product.GetAll = () => {
    return new Promise((resolve, reject) => {
        database.query("SELECT * FROM table_produk ORDER BY nama ASC")
        .then((res) => {
            resolve(res.rows)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

Product.searchName = (nama) => {
    return new Promise((resolve, reject) => {
        database
        .query(`SELECT * FROM table_produk WHERE nama LIKE '%${nama}%'`)
        .then( (res) => {
            resolve(res.rows)
        })
        .catch( (err) => {
            reject(err)
        })
    })
}

Product.JoinAll = () => {
    return new Promise((resolve, reject) => {
        database.query("SELECT * FROM public.table_produk JOIN table_kategori ON table_produk.kategori_id = table_kategori.id")
        .then((res) => {
            resolve(res.rows)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

Product.Add = (nama, harga, kategori_id, link_gambar,stok,) => { 
    console.log(nama)
    return new Promise((resolve, reject) => {
        database
        .query(`INSERT INTO public.table_produk(nama, harga, kategori_id, link_gambar, stok) VALUES ('${nama}', '${(harga)}', '${kategori_id}', '${link_gambar}', '${stok}')`)        
        .then(() => {        
            resolve(Product.GetAll())
        })
        .catch((err) => {
            reject(err)
        })
    })      
}

Product.Edit = (id, nama, harga,kategori_id,link_gambar, stok) => { 
    return new Promise((resolve, reject) => {
        database
        .query(`UPDATE public.table_produk SET nama='${nama}',harga=${harga}, kategori_id='${kategori_id}', link_gambar='${link_gambar}',stok=${stok} WHERE id=${id}; `)
        .then((res) => {        
            resolve(Product.GetAll())
        })
        .catch((err) => {
            reject(err)
        })
    })
}

Product.Delete = (id) => { 
    return new Promise((resolve, reject) => {
        database
        .query(`DELETE FROM public.table_produk WHERE id = ${id} `)
        .then((res) => {        
            resolve(Product.GetAll())
        })
        .catch((err) => {
            reject(err)
        })
    })
}


Product.SelectImage = (id) => {
    return new Promise((resolve, reject) => {
        database
        .query(`SELECT "link_gambar" FROM table_produk WHERE id = ${id}`)
        .then((res) => {        
            resolve(Product.GetAll())
        })
        .catch((err) => {
            reject(err)
        })
    })
}

module.exports = Product