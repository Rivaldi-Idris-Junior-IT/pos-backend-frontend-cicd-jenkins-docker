const model = require('../Model/Product')
const { request, response } = require('express')
const redis = require("../Config/redis")
const result = require("../Helper/respon")
const Respon = require("../Config/Respon")
const Verifikasi = require('../Helper/Verifikasi')
const { Failed } = require('../Config/Respon')
// Membuat bungkusan dengan variabel
const Product = {}

Product.all = async (req, res) => {
    try {
        const data = await model.GetAll()
        const data_redis = JSON.stringify(data)
        redis.redisdb.setex("getAll", 40, data_redis)
        return result(res,200, data)
    }catch(error) {
        return res.send("errror")
    }
}

Product.search = async (request, response) => {
    try {
        const  nama = request.params.nama
        console.log(nama);
        const data = await model.searchName(nama)
        return response.send(data);
    }catch (error) {
        return response.status(500).json(error)
    }
}

Product.joinall = async (request,response) => {
    try {
        const data = await model.JoinAll()
        return response.send(data)
    } catch (error) {
        return response.send("error")
    }
}

Product.add = async (req, res) => {    
    try {
        if(req.file === undefined) {
            console.log(req.file)
            return res.status(500).json("Data Kosong")
        }
        const data_product = {
            nama : req.body.nama,
            harga : req.body.harga,            
            kategori_id : req.body.kategori_id,
            link_gambar : req.file.path,
            stok : req.body.stok,
        }
        console.log(data_product)
        const data = await model.Add(data_product.nama, data_product.harga, data_product.kategori_id, data_product.link_gambar, data_product.stok)
        return result(res, 201, data_product)      
    } catch (error) {
        return res.status(500).json(error)
    }         
}

// Product.edit = async (req, res) => {
//     try {
//         const { id, nama, harga, stok,kategori_id,link_gambar} = req.body
//         const data = await model.Edit(id, nama, harga, stok, kategori_id,link_gambar)
//         return res.send(data)   
//     } catch (error) {
//         return res.status(500).json(error)
//     }    
// }

Product.Update = async(req,res) => {
    try{
        const id = req.body.id
        const {nama, harga, stok, kategori_id} = req.body
        let link_gambar 
        try {
            link_gambar = req.file ? req.file.path:await model.SelectImage(id)
        }catch (err) {
            return res.send(Result.Failed(400, `Product with id ${id} not found`))
        }

        if(!Verifikasi.input(id, 'number')) return res.send(Respon.Failed(400, "Invalid id, it must be a number and contain no symbol(', <, >)"))
        if(!Verifikasi.input(nama, 'string')) return res.send(Respon.Failed(400, "Invalid nama, it must be a string and contain no symbol(', <, >)"))
        if(!Verifikasi.input(harga, 'string')) return res.send(Respon.Failed(400, "Invalid harga, it must be a string and contain no symbol(', <, >)"))
        if(!Verifikasi.input(stok, 'number')) return res.send(Respon.Failed(400, "Invalid id, it must be a number and contain no symbol(', <, >)"))
        if(!Verifikasi.input(kategori_id, 'number')) return res.send(Respon.Failed(400, "Invalid kategori_id, it must be a number and contain no symbol(', <, >)"))
        if(!Verifikasi.input(link_gambar, 'string')) return res.send(Respon.Failed(400, "Invalid link_gambar, it must be a string and contain no symbol(', <, >)"))

        const result = await model.Edit(id,nama,harga,stok,kategori_id,link_gambar)

        if(result.rowCount === 0) return res.send(Respon.Failed(400, `Produk with id ${id} not found`))
        
        return res.send(Respon.Succes(200, []))            
    }catch(err) {
        console.log(err)
        return res.send(Respon,Failed(500, 'Cannot update product, database error'))
    }
}

Product.delete = async (req, res) => {
    try {
        const {id} = req.params
        const data = await model.Delete(id)
        return res.send(data)    
    } catch (error) {
        return res.status(500).json(error)
    }
    
}

Product.deleteWithImage = async (req,res) => {
    try{
        const id = req.params        
        let link_gambar 
        console.log(link_gambar)
        try {
            link_gambar = req.file ? req.file.path:await model.SelectImage(id)
        }catch (err) {
            return res.send(Result.Failed(400, `Product with id ${id} not found`))
        }
        fs.unlink(link_gambar,function(err){
            if(err) return console.log(err)
            console.log('file deleted successfully')
        })

        const data = await model.Delete(id)        

    }catch (error){
        return res.status(500).json(error)
    }
}


// Export file Product.js pada folder controller ke file di dalam folder yang membutuhkan
module.exports = Product