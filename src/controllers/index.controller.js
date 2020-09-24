const { response } = require('express');
const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '1234',
    database: 'company',
    port: '5432'
});


const getCustomers = async(req, res) => {
    const response = await pool.query('select * from customers');
    res.json(response.rows);
}

const getCustomerById = async(req, res) => {
    const id = req.params.id;
    const response = await pool.query('select * from customers where id = $1', [id]);
    res.json(response.rows);

}

const getCustomerByName = async(req, res) => {
    const nombre = req.params.nombre;
    const response = await pool.query("select * from customers where nombre LIKE'%" + nombre + "%'");
    res.json(response.rows);
}

const createCustomer = async(req, res) => {
    const { nombre, apellido, direccion, fecha_nacimiento, telefono } = req.body;
    const response = await pool.query('insert into customers (nombre, apellido, direccion, fecha_nacimiento, telefono) values ($1, $2, $3, $4, $5)', [nombre, apellido, direccion, fecha_nacimiento, telefono]);
    console.log(response);
    res.json({
        message: 'Customer added Seccesfully',
        body: {
            customer: { nombre, apellido, direccion, fecha_nacimiento, telefono }
        }
    })
};

const updateCustomer = async(req, res) => {
    const id = req.params.id;
    const { nombre, apellido, direccion, fecha_nacimiento, telefono } = req.body;
    const response = await pool.query('update customers set nombre=$1, apellido=$2, direccion=$3, fecha_nacimiento=$4, telefono=$5 where id=$6', [nombre, apellido, direccion, fecha_nacimiento, telefono, id]);
    console.log(response);
    res.json({
        message: 'Customer added Seccesfully',
        body: {
            customer: { id, nombre, apellido, direccion, fecha_nacimiento, telefono }
        }
    })
};

const deleteCustomer = async(req, res) => {
    const id = req.params.id;
    const response = await pool.query('delete from customers where id = $1', [id]);
    console.log(response);
    res.json(`User ${id} deleted Successfully`);
}

module.exports = {
    getCustomers,
    getCustomerById,
    getCustomerByName,
    createCustomer,
    updateCustomer,
    deleteCustomer
}