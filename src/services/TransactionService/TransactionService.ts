import Api from "../../Api/Api";
import { getAdminId } from "../../utils/getUserData";

export type Transaction = {
  userId: string;
  description: string;
  value: number;
  type: string;
  category: string;
};

export type TransactionResponse = Transaction & {
  id: string;
  transactionDate: string;
};

const getAuthHeaders = async (): Promise<Record<string, string>> => {
  const adminId = await getAdminId();
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

const TransactionService = {
  createTransaction: async (transactionData: Transaction) => {
    const headers = await getAuthHeaders();
    const response = await Api.post("/transaction", transactionData, { headers });
    return response.data;
  },

  getTransactions: async (userId: string, type?: string[], category?: string[], page?: number, pageSize?: number) => {
    const headers = await getAuthHeaders();
    const params: Record<string, string> = { userId };
    if (page !== undefined) {
      params.page = page.toString();
    }
    if (pageSize !== undefined) {
      params.pageSize = pageSize.toString();
    }
    if (type && type.length > 0) {
      params.type = type.join(', ');
    }
    
    if (category && category.length > 0) {
      params.category = category.join(', ');
    }
    
    const response = await Api.get("/transaction", {
      params,
      headers
    });
    return response.data;
  },

  deleteTransaction: async (transactionId: string) => {
    const headers = await getAuthHeaders();
    const response = await Api.delete(`/transaction/${transactionId}`, { headers });
    return response.data;
  },
};

export default TransactionService;
