var config = require('./dbconfig');
const sql = require('mssql');

async function getOrders(){
    try{
        let pool = await sql.connect(config);
        let products = await pool.request().query("SELECT * FROM Orders");
        return products.recordset; 
    }
    catch(error){
        console.log(error);
    }
}

async function getOrder(orderId){
    try{
        let pool = await sql.connect(config);
        let products = await pool.request()
        .input('param',orderId)
        .query("SELECT * FROM Orders WHERE Id = @param");
        return products.recordset; 
    }
    catch(error){
        console.log(error)
    }
}

async function addOrder(order){
    try{
        let pool = await sql.connect(config);
        let insertProduct = await pool.request()
        .input('Title',order.Title)
        .input('Quantity',order.Quantity)
        .input('Message',order.Message)
        .input('City',order.City)
        .execute('InsertOrder');
        return insertProduct.recordset; 
    }
    catch(error){
       return error;
    }
}
module.exports = {
    getOrders: getOrders,
    getOrder : getOrder,
    addOrder : addOrder,
}