const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');

// Create a new company
router.post('/', companyController.createCompany);

// Get all companies (with filters)
router.get('/', companyController.getCompanies);

// Get a single company by ID
router.get('/:id', companyController.getCompanyById);

// Update a company
router.put('/:id', companyController.updateCompany);

// Delete a company
router.delete('/:id', companyController.deleteCompany);

module.exports = router;
