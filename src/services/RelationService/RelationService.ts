/* eslint-disable @typescript-eslint/no-explicit-any */
import Api from "../../Api/Api";
import { getUserIdFromToken } from "../../utils/getUserData";

const getAuthHeaders = (adminId?: string) => {
  const token = localStorage.getItem('authToken'); 
  const headers: Record<string, string> = {};

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (adminId) {
    headers['adminId'] = adminId;
  }

  return headers;
};

const RelationService = {
  createRelation: async (relationData: any) => {
    const adminId = getUserIdFromToken(); // já é síncrono
    const response = await Api.post("/admin/bind", relationData, {
      headers: getAuthHeaders(adminId),
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
