const { Router } = require('express');
const router = Router();

const { getCustomers, createCustomer, getCustomerById, getCustomerByName, updateCustomer, deleteCustomer } = require('../controllers/index.controller')

router.get('/api/customers', getCustomers);
router.get('/api/customers/:id', getCustomerById);
router.get('/api/customers/name/:nombre', getCustomerByName);
router.post('/api/customers', createCustomer);
router.put('/api/customers/:id', updateCustomer);
router.delete('/api/customers/:id', deleteCustomer);

module.exports = router;