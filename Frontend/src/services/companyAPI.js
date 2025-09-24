import axios from 'axios';

const API_URL = 'https://company-management-c21n.onrender.com/api/companies';

export const getCompanies = async (filters = {}) => {
  const cleanedFilters = Object.fromEntries(
    Object.entries(filters).filter(([_, v]) => v && v.trim() !== '')
  );

  const params = new URLSearchParams(cleanedFilters).toString();
  const url = params ? `${API_URL}?${params}` : API_URL;
  const res = await axios.get(url);
  return res.data;
};


export const createCompany = async (company) => {
	const res = await axios.post(API_URL, company);
	return res.data;
};

export const updateCompany = async (id, company) => {
	const res = await axios.put(`${API_URL}/${id}`, company);
	return res.data;
};

export const deleteCompany = async (id) => {
	const res = await axios.delete(`${API_URL}/${id}`);
	return res.data;
};
