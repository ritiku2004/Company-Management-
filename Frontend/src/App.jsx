import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CompanyList from './components/CompanyList';
import CompanyForm from './components/CompanyForm';
import FilterControls from './components/FilterControls';
import { getCompanies, createCompany, updateCompany, deleteCompany } from './services/companyAPI';

const App = () => {
	const [companies, setCompanies] = useState([]);
	const [editingCompany, setEditingCompany] = useState(null);
	const [filters, setFilters] = useState({});
	const [showForm, setShowForm] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const [deleteId, setDeleteId] = useState(null);
	const [loading, setLoading] = useState(false);
	const [formLoading, setFormLoading] = useState(false);

	const fetchCompanies = async (filters = {}) => {
		setLoading(true);
		try {
			const data = await getCompanies(filters);
			setCompanies(data);
		} catch (err) {
			toast.error('Failed to fetch companies');
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchCompanies(filters);
	}, [filters]);

	const handleAddOrUpdate = async (company) => {
		setFormLoading(true);
		try {
			if (editingCompany) {
				await updateCompany(editingCompany._id, company);
				toast.success('Company updated');
			} else {
				await createCompany(company);
				toast.success('Company added');
			}
			setEditingCompany(null);
			setShowForm(false);
			fetchCompanies(filters);
		} catch (err) {
			toast.error('Failed to save company');
		}
		setFormLoading(false);
	};

	const handleEdit = (company) => {
		setEditingCompany(company);
		setShowForm(true);
	};

	const handleDelete = async (id) => {
		try {
			await deleteCompany(id);
			fetchCompanies(filters);
		} catch (err) {
			toast.error('Failed to delete company');
		}
		setShowConfirm(false);
		setDeleteId(null);
	};

	const handleCancelEdit = () => {
		setEditingCompany(null);
		setShowForm(false);
	};

	const handleFilter = (newFilters) => {
		setFilters(newFilters);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-10 px-2">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-4xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 drop-shadow-lg">Companies Management</h1>
				{!showForm && (
					<div className="flex justify-center mb-4">
						<button className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-2 rounded-lg shadow hover:scale-105 transition" onClick={() => { setShowForm(true); setEditingCompany(null); }}>
							Add Company
						</button>
					</div>
				)}
				{/* Smooth transition for form open/close */}
				<div className={`relative transition-all duration-700 ${showForm ? 'opacity-100 scale-100 max-h-[1000px] mb-8' : 'opacity-0 scale-95 max-h-0 mb-0'} overflow-hidden`}> 
					{showForm && (
						<>
							<CompanyForm onSubmit={handleAddOrUpdate} editingCompany={editingCompany} onCancel={handleCancelEdit} formLoading={formLoading} />
							<button className="absolute top-2 right-2 bg-gray-200 text-gray-700 rounded-full px-3 py-1 shadow hover:bg-gray-300 transition sm:top-4 sm:right-4" onClick={handleCancelEdit} aria-label="Close form">
								&#10005;
							</button>
						</>
					)}
				</div>
				<FilterControls onFilter={handleFilter} autoFilter />
				{loading ? (
					<div className="flex justify-center items-center py-12">
						<div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
					</div>
				) : companies.length === 0 ? (
					<div className="text-center py-12 text-gray-400 text-lg">
						No companies found.<br />
						<span className="text-blue-500 font-semibold">Use the filter above to search or refine your results.</span>
					</div>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
						{companies.map(company => (
							<div key={company._id} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 flex flex-col justify-between hover:shadow-2xl transition">
								<div>
									<h2 className="text-xl font-bold text-blue-600 mb-2">{company.name}</h2>
									<p className="text-gray-500 mb-1"><span className="font-semibold">Industry:</span> {company.industry}</p>
									<p className="text-gray-500 mb-1"><span className="font-semibold">Location:</span> {company.location}</p>
									<p className="text-gray-500 mb-1"><span className="font-semibold">Size:</span> {company.size}</p>
									<p className="text-gray-500 mb-1"><span className="font-semibold">Founded:</span> {company.founded}</p>
									<p className="text-gray-500 mb-2"><span className="font-semibold">Description:</span> {company.description}</p>
								</div>
								<div className="flex gap-2 mt-4">
									<button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded shadow hover:scale-105 transition" onClick={() => handleEdit(company)}>Edit</button>
									<button className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-1 rounded shadow hover:scale-105 transition" onClick={() => {
										setShowConfirm(true);
										setDeleteId(company._id);
									}}>Delete</button>
								</div>
							</div>
						))}
					</div>
				)}
				{showConfirm && (
					<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
						<div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-xs w-full">
							<h3 className="text-lg font-bold mb-4 text-gray-700">Confirm Delete</h3>
							<p className="mb-6 text-gray-500">Are you sure you want to delete this company?</p>
							<div className="flex gap-4 justify-center">
								<button className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-lg shadow hover:scale-105 transition" onClick={() => handleDelete(deleteId)}>Delete</button>
								<button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow hover:scale-105 transition" onClick={() => { setShowConfirm(false); setDeleteId(null); }}>Cancel</button>
							</div>
						</div>
					</div>
				)}
				<ToastContainer position="top-right" autoClose={2000} />
			</div>
		</div>
	);
};

export default App;
