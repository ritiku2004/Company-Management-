const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
	name: { type: String, required: true },
	industry: { type: String },
	location: { type: String },
	size: { type: Number },
	founded: { type: Number },
	description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Company', CompanySchema);
