const model = require('../Model/Category')
// Membuat bungkusan dengan variabel
const Category = {}

Category.all = async (req, res) => {
    try {
        const data = await model.GetAll()
        return res.status(200).json(data)
    }catch(error) {
        return res.status(500).json(error)
    }
}

Category.search = async (request, response) => {
    try {
        const  nama_kategori = request.params.nama_kategori
        console.log(nama_kategori);
        const data = await model.searchByName(nama_kategori)
        return response.send(data);

    }catch (error) {
        return response.status(500).json(error)
    }
}

Category.add = async (req, res) => {    
    try {
        const {nama_kategori} = req.body
        const data = await model.Add(nama_kategori)        
        return res.status(201).json(data)
    } catch (error) {
        return res.status(500).json(error)
    }
    
}

Category.edit = async (req, res) => {
    try {
        const { id, nama_kategori} = req.body
        const data = await model.Edit(id, nama_kategori)
        return res.status(201).json(data)
    } catch (error) {
        return res.status(500).json(error)
    }
    
}

Category.delete = async (req, res) => {
    try {
        const { id} = req.body
        const data = await model.Delete(id)
        return res.status(201).json(data)
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = Category