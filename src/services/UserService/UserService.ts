import Api from "../../Api/Api";

const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken'); 
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const UserService = {
  getUserByName: async (login: string) => {
    const headers = getAuthHeaders();
    const response = await Api.get(`/users/${login}`, {
      headers
    });
    return response.data;
  },
};

export default UserService;