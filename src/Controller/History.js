const model = require('../Model/History')
// Membuat bungkusan dengan variabel
const History = {}

History.all = async (req, res) => {
    try {
        const data = await model.GetAll()
        return res.status(200).json(data)
    }catch(error) {
        return res.status(500).json(error)
    }
}

History.search = async (request, response) => {
    try {
        const  cashier = request.params.cashier
        console.log(cashier);
        const data = await model.searchCashier(cashier)
        return response.send(data);

    }catch (error) {
        return response.status(500).json(error)
    }
}

History.add = async (req, res) => {    
    let date_ob = new Date();
    let date0 = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    const date_all = year + "-" + month + "-" + date0 ;    
    const data_form = {
        invoices : req.body.invoices,
        cashier : req.body.cashier,
        orders : req.body.orders,
        amount : req.body.amount,
        date : date_all
    }    
    const data = await model.Add(data_form.invoices,data_form.cashier,data_form.orders,data_form.amount,data_form.date)
    console.log(data)
    return res.status(200).send(data)    
}

History.edit = async (req, res) => {
    try {
        const { id, invoices, cashier, date, orders, amount} = req.body
        const data = await model.Edit(id, invoices, cashier, date, orders, amount)
        return res.status(200).send(data)        
    } catch (error) {
        return response.status(500).json(error)
    }
    
}

History.delete = async (req, res) => {
    try {
        const { id} = req.body
        const data = await model.Delete(id)
        return res.send(data)    
    } catch (error) {
        return response.status(500).json(error)
    }
    
}

module.exports = History