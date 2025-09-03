import Api from "../../Api/Api";

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

const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken'); 
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const TransactionService = {
  createTransaction: async (transactionData: Transaction) => {
    const response = await Api.post("/transaction", transactionData, {
      headers: getAuthHeaders()
    });
    return response.data;
  },

  getTransactions: async (userId: string) => {
    const response = await Api.get("/transaction", {
      params: { userId },
      headers: getAuthHeaders()
    });
    return response.data;
  },

  deleteTransaction: async (transactionId: string) => {
    const response = await Api.delete(`/transaction/${transactionId}`, {
      headers: getAuthHeaders()
    });
    return response.data;
  },
};

export default TransactionService;
