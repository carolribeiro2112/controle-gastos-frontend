import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:8080",
})

Api.interceptors.request.use(
  (config) => {
    // console.log('🚀 API Request:', config.method?.toUpperCase(), `${config.baseURL || ''}${config.url || ''}`);
    // console.log('📋 Headers:', config.headers);
    // if (config.params) console.log('🔍 Params:', config.params);
    return config;
  },
  (error) => {
    console.error('❌ REQUEST ERROR:', error);
    return Promise.reject(error);
  }
);

Api.interceptors.response.use(
  (response) => {
    // console.log('✅ API Success:', response.status);
    return response;
  },
  (error) => {
    // console.error('❌ API Error:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export default Api;
