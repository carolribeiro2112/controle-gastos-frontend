import { useState, useEffect, useCallback } from 'react';
import TransactionService, { type TransactionResponse } from '../services/TransactionService/TransactionService';
import { getUserIdFromToken } from '../utils/getUserData';

interface UseTransactionsProps {
  isAuthenticated: boolean;
  selectedUserId: string | null;
  userRole: string;
  type?: string;
  category?: string;
}

export const useTransactions = ({ isAuthenticated, selectedUserId, userRole, type, category }: UseTransactionsProps) => {
  const [transactions, setTransactions] = useState<TransactionResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<string | null>(null);

  const fetchTransactions = useCallback(async () => {
    if (!isAuthenticated) return;

    try {
      setLoading(true);
      setError(null);

      let userIdToFetch: string;

      if (userRole === "USER") {
        // Para usuários USER, sempre busca as próprias transações
        userIdToFetch = await getUserIdFromToken();
      } else {
        // Para usuários ADMIN, precisa ter selecionado um usuário
        if (!selectedUserId) {
          setTransactions([]);
          setLoading(false);
          return;
        }
        userIdToFetch = selectedUserId;
      }

      const data = await TransactionService.getTransactions(userIdToFetch, type, category);
      setTransactions(data);
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setError("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, selectedUserId, userRole, type, category]);

  const handleDeleteClick = (transactionId: string) => {
    setTransactionToDelete(transactionId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!transactionToDelete) return;

    try {
      setError(null);
      
      await TransactionService.deleteTransaction(transactionToDelete);

      setTransactions((prevTransactions) =>
        prevTransactions.filter(
          (transaction) => transaction.id !== transactionToDelete
        )
      );

      return { success: true };
    } catch (err) {
      console.error("Error deleting transaction:", err);
      setError("Failed to delete transaction");
      return { success: false };
    } finally {
      setDeleteDialogOpen(false);
      setTransactionToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setTransactionToDelete(null);
  };

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return {
    transactions,
    loading,
    error,
    deleteDialogOpen,
    setDeleteDialogOpen,
    transactionToDelete,
    fetchTransactions,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
  };
};