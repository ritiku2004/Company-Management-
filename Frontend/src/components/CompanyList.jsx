import React from 'react';
import { toast } from 'react-toastify';

const CompanyList = ({ companies, onEdit, onDelete }) => {
	if (!companies.length) {
		return <div className="text-center py-8 text-gray-500">No companies found.</div>;
	}
	return (
		<div className="overflow-x-auto">
			<table className="min-w-full bg-white border border-gray-200 rounded-xl shadow-lg">
				<thead>
					<tr className="bg-gradient-to-r from-blue-100 to-purple-100">
						<th className="px-6 py-3 text-left font-semibold text-gray-700">Name</th>
						<th className="px-6 py-3 text-left font-semibold text-gray-700">Industry</th>
						<th className="px-6 py-3 text-left font-semibold text-gray-700">Location</th>
						<th className="px-6 py-3 text-left font-semibold text-gray-700">Size</th>
						<th className="px-6 py-3 text-left font-semibold text-gray-700">Founded</th>
						<th className="px-6 py-3 text-left font-semibold text-gray-700">Description</th>
						<th className="px-6 py-3 text-left font-semibold text-gray-700">Actions</th>
					</tr>
				</thead>
				<tbody>
					{companies.map(company => (
						<tr key={company._id} className="border-t hover:bg-gray-50 transition">
							<td className="px-6 py-3">{company.name}</td>
							<td className="px-6 py-3">{company.industry}</td>
							<td className="px-6 py-3">{company.location}</td>
							<td className="px-6 py-3">{company.size}</td>
							<td className="px-6 py-3">{company.founded}</td>
							<td className="px-6 py-3">{company.description}</td>
							<td className="px-6 py-3 flex gap-2">
								<button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded shadow hover:scale-105 transition" onClick={() => onEdit(company)}>Edit</button>
								<button className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded shadow hover:scale-105 transition" onClick={() => {
									if (window.confirm('Are you sure you want to delete this company?')) {
										onDelete(company._id);
										toast.success('Company deleted');
									}
								}}>Delete</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default CompanyList;
