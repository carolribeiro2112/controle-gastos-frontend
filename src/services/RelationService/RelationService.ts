/* eslint-disable @typescript-eslint/no-explicit-any */
import Api from "../../Api/Api";
import { getUserIdFromToken } from "../../utils/getUserData";

const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken'); 
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const RelationService = {
  createRelation: async (relationData: any) => {
    const response = await Api.post("/admin/bind", relationData, {
      headers: {
        ...getAuthHeaders(),
        adminId: getUserIdFromToken()
      },
    });
    return response.data;
  },

  getRelations: async () => {
    const response = await Api.get(`/admin/admin-relations`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  },
};

export default RelationService;
