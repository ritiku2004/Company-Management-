const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');

// Create a new company
router.post('/create', companyController.createCompany);

// Get all companies (with filters)
router.get('/list', companyController.getCompanies);

// Get a single company by ID
router.get('/:id', companyController.getCompanyById);

// Update a company
router.put('/edit/:id', companyController.updateCompany);

// Delete a company
router.delete('/delete/:id', companyController.deleteCompany);

module.exports = router;
