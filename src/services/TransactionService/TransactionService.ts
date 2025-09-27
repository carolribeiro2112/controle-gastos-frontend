import Api from "../../Api/Api";
import { getAdminId } from "../../utils/getUserData";

export type Transaction = {
  userId: string;
  description: string;
  value: number;
  type: string;
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

  getTransactions: async (userId: string) => {
    const headers = await getAuthHeaders();
    const response = await Api.get("/transaction", {
      params: { userId },
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
