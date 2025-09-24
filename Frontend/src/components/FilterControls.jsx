import React, { useState } from 'react';

const FilterControls = ({ onFilter, autoFilter }) => {
	const [filters, setFilters] = useState({ name: '', industry: '', location: '' });

	const handleChange = e => {
		const { name, value } = e.target;
		const newFilters = { ...filters, [name]: value };
		setFilters(newFilters);
		if (autoFilter) {
			onFilter(newFilters);
		}
	};

	const handleSubmit = e => {
		e.preventDefault();
		onFilter(filters);
	};

	return (
		<form className="bg-white p-6 rounded-xl shadow mb-8 border border-gray-100 flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6" onSubmit={handleSubmit}>
			<div className="flex flex-col flex-1 min-w-[180px]">
				<label className="text-sm text-gray-500 mb-1" htmlFor="filter-name">Name</label>
				<input id="filter-name" name="name" value={filters.name} onChange={handleChange} placeholder="Name" className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 transition" />
			</div>
			<div className="flex flex-col flex-1 min-w-[180px]">
				<label className="text-sm text-gray-500 mb-1" htmlFor="filter-industry">Industry</label>
				<input id="filter-industry" name="industry" value={filters.industry} onChange={handleChange} placeholder="Industry" className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 transition" />
			</div>
			<div className="flex flex-col flex-1 min-w-[180px]">
				<label className="text-sm text-gray-500 mb-1" htmlFor="filter-location">Location</label>
				<input id="filter-location" name="location" value={filters.location} onChange={handleChange} placeholder="Location" className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 transition" />
			</div>
			{!autoFilter && (
				<div className="flex items-end w-full sm:w-auto">
					<button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg shadow hover:scale-105 transition w-full sm:w-auto">Filter</button>
				</div>
			)}
		</form>
	);
};

export default FilterControls;
