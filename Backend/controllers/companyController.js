const Company = require('../models/Company');

// Create a new company
exports.createCompany = async (req, res) => {
	try {
		const company = await Company.create(req.body);
		res.status(201).json(company);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get all companies with optional filters
exports.getCompanies = async (req, res) => {
    try {
        const filters = {};

        const escapeRegex = (text) => {
            if (typeof text !== 'string') return '';
            return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        };

        const { name, industry, location, size, founded } = req.query;

        // Name filter (case-insensitive, partial match)
        if (name && name.trim() !== '') {
            const safeName = escapeRegex(name.trim());
            filters.name = { $regex: safeName, $options: 'i' };
        }

        // Industry filter (case-insensitive, partial match)
        if (industry && industry.trim() !== '') {
            const safeIndustry = escapeRegex(industry.trim());
            filters.industry = { $regex: safeIndustry, $options: 'i' };
        }

        // Location filter (case-insensitive, partial match)
        if (location && location.trim() !== '') {
            const safeLocation = escapeRegex(location.trim());
            filters.location = { $regex: safeLocation, $options: 'i' };
        }

        if (size) filters.size = size;
        if (founded) filters.founded = founded;

        const companies = await Company.find(filters);
        res.json(companies);

    } catch (err) {
        console.error("Error in getCompanies:", err);
        res.status(500).json({ error: "An error occurred while fetching companies." });
    }
};

// Get a single company by ID
exports.getCompanyById = async (req, res) => {
	try {
		const company = await Company.findById(req.params.id);
		if (!company) return res.status(404).json({ error: 'Company not found' });
		res.json(company);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Update a company
exports.updateCompany = async (req, res) => {
	try {
		const company = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
		if (!company) return res.status(404).json({ error: 'Company not found' });
		res.json(company);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Delete a company
exports.deleteCompany = async (req, res) => {
	try {
		const company = await Company.findByIdAndDelete(req.params.id);
		if (!company) return res.status(404).json({ error: 'Company not found' });
		res.json({ message: 'Company deleted' });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
