import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const initialState = {
	name: '',
	industry: '',
	location: '',
	size: '',
	founded: '',
	description: ''
};

const CompanyForm = ({ onSubmit, editingCompany, onCancel, formLoading }) => {
	const [form, setForm] = useState(initialState);

	useEffect(() => {
		if (editingCompany) {
			setForm({ ...editingCompany });
		} else {
			setForm(initialState);
		}
	}, [editingCompany]);

	const handleChange = e => {
		const { name, value } = e.target;
		setForm(prev => ({ ...prev, [name]: value }));
	};

	const handleSubmit = e => {
		e.preventDefault();
		if (!form.name) {
			toast.error('Name is required');
			return;
		}
		const payload = {
			...form,
			size: form.size !== '' ? Number(form.size) : undefined,
			founded: form.founded !== '' ? Number(form.founded) : undefined
		};
		onSubmit(payload);
		setForm(initialState);
	};

	return (
		<form className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-gray-100 transition-all duration-300" onSubmit={handleSubmit}>
			<h2 className="text-xl font-semibold mb-4 text-gray-700">{editingCompany ? 'Edit Company' : 'Add New Company'}</h2>
			{formLoading ? (
				<div className="flex justify-center items-center py-12">
					<div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-green-500"></div>
				</div>
			) : (
				<>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<input name="name" value={form.name} onChange={handleChange} placeholder="Company Name (e.g. Acme Corp)" className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 transition" required />
						<input name="industry" value={form.industry} onChange={handleChange} placeholder="Industry (e.g. Technology, Finance)" className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 transition" />
						<input name="location" value={form.location} onChange={handleChange} placeholder="Location (e.g. New York, USA)" className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 transition" />
						<input name="size" value={form.size} onChange={handleChange} placeholder="Number of Employees (e.g. 250)" type="number" className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 transition" />
						<input name="founded" value={form.founded} onChange={handleChange} placeholder="Year Established (e.g. 2001)" type="number" className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 transition" />
						<input name="description" value={form.description} onChange={handleChange} placeholder="Short Description (e.g. Leading provider of... )" className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 transition" />
					</div>
					<div className="mt-6 flex gap-3">
						<button type="submit" className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-2 rounded-lg shadow hover:scale-105 transition">
							{editingCompany ? 'Update' : 'Add'} Company
						</button>
						{editingCompany && (
							<button type="button" className="bg-gray-400 text-white px-6 py-2 rounded-lg shadow hover:scale-105 transition" onClick={onCancel}>Cancel</button>
						)}
					</div>
				</>
			)}
		</form>
	);
};

export default CompanyForm;
