import axios from 'axios';

const authAPI = axios.create({
  baseURL: 'https://oro24world.com/api',
  headers: {
    'Content-Type': 'application/json',
    'X-App-Id': 'KYCTY',
  },
});

const servicesAPI = axios.create({
  baseURL: 'https://o24living.com/api/public',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiService = {
  login: async (email, password) => {
    try {
      const response = await authAPI.post('/customertoken/withoutOTP', {
        email,
        password,
        IPAddress: '',
        Version: '',
        Platform: '',
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message || 'Login failed');
    }
  },

  getCategories: async () => {
    try {
      const response = await servicesAPI.get('/Services/GetServiceMaster');
      return response.data;
    } catch (error) {
      throw error;
    }
  },


  getServicesByCategory: async (serviceMasterID, pageNumber = 1, pageSize = 4) => {
    try {
      const response = await servicesAPI.post('/Services/GetMasterServices', {
        ServiceMasterID: serviceMasterID,
        PageNumber: pageNumber,
        PageSize: pageSize,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Add a new function for total pages calculation if needed
getServicesWithPagination: async (serviceMasterID, pageNumber = 1, pageSize = 4) => {
  try {
    const response = await servicesAPI.post('/Services/GetMasterServices', {
      ServiceMasterID: serviceMasterID,
      PageNumber: pageNumber,
      PageSize: pageSize,
    });
    
    // If response has TotalPages property in each item, extract it
    if (response.data && response.data.length > 0) {
      const totalPages = response.data[0]?.TotalPages || 1;
      const services = response.data.map(item => {
        const { TotalPages, ...service } = item;
        return service;
      });
      
      return {
        services,
        totalPages,
        currentPage: pageNumber,
        pageSize
      };
    }
    
    return response.data;
  } catch (error) {
    throw error;
  }
},

  getServiceDetails: async (serviceID) => {
    try {
      const response = await servicesAPI.post('/Services/GetServiceDetails', {
        ServiceID: serviceID,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default apiService;