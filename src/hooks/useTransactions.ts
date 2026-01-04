import { useState, useEffect, useCallback, useRef } from 'react';
import TransactionService, { type TransactionResponse } from '../services/TransactionService/TransactionService';
import { getUserIdFromToken } from '../utils/getUserData';

interface UseTransactionsProps {
  isAuthenticated: boolean;
  selectedUserId: string | null;
  userRole: string;
  type?: string[];
  category?: string[];
  initialPage?: number;
  initialPageSize?: number;
}

export interface PaginationData {
  totalElements: number;
  totalPages: number;
  currentPage?: number;
  pageSize?: number;
}

export const useTransactions = ({ 
  isAuthenticated, 
  selectedUserId, 
  userRole, 
  type, 
  category, 
  initialPageSize,
  initialPage, 
}: UseTransactionsProps) => {
  const [transactions, setTransactions] = useState<TransactionResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationData>({ 
    totalElements: 0, 
    totalPages: 0, 
    currentPage: initialPage, 
    pageSize: initialPageSize
  });

  // useRef para evitar dependências circulares
  const paginationRef = useRef(pagination);
  paginationRef.current = pagination;

  const fetchTransactions = useCallback(async (page?: number, pageSize?: number) => {
    if (!isAuthenticated) return;

    try {
      setLoading(true);
      setError(null);

      let userIdToFetch: string;

      if (userRole === "USER") {
        userIdToFetch = await getUserIdFromToken();
      } else {
        if (!selectedUserId) {
          setTransactions([]);
          setLoading(false);
          setPagination(prev => ({ 
            ...prev, 
            totalElements: 0, 
            totalPages: 0, 
            currentPage: page !== undefined ? page : prev.currentPage
          }));
          return;
        }
        userIdToFetch = selectedUserId;
      }

      // Use valores do ref para evitar dependências circulares
      const currentPage = page !== undefined ? page : paginationRef.current.currentPage;
      const currentPageSize = pageSize !== undefined ? pageSize : paginationRef.current.pageSize;

      const data = await TransactionService.getTransactions(
        userIdToFetch, 
        type, 
        category, 
        currentPage, 
        currentPageSize
      );
      console.log("Fetched Transactions Data:", data);
      const dataToSet = currentPage !== undefined && currentPageSize !== undefined
        ? data.content
        : data;
      setTransactions(dataToSet);
      setPagination({
        totalElements: data.totalElements,
        totalPages: data.totalPages,
        currentPage: currentPage,
        pageSize: currentPageSize,
      });
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setError("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, userRole, selectedUserId, type, category]); // Removidas as dependências do pagination

  const handlePageChange = useCallback((newPage: number) => {
    // Atualizar o estado imediatamente
    setPagination(prev => ({
      ...prev,
      currentPage: newPage
    }));
    
    // Fazer a requisição com o novo valor
    fetchTransactions(newPage, paginationRef.current.pageSize);
  }, [fetchTransactions]);

  const handlePageSizeChange = useCallback((newPageSize: number) => {
    setPagination(prev => ({ 
      ...prev, 
      pageSize: newPageSize, 
      currentPage: 0 
    }));
    
    // Usar setTimeout para garantir que o estado foi atualizado
    setTimeout(() => {
      fetchTransactions(0, newPageSize);
    }, 0);
  }, [fetchTransactions]);

  const handleDeleteClick = (transactionId: string) => {
    setTransactionToDelete(transactionId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!transactionToDelete) return;

    try {
      setError(null);
      
      await TransactionService.deleteTransaction(transactionToDelete);

      const currentPag = paginationRef.current;
      const newTotalElements = currentPag.totalElements - 1;
      const maxPage = Math.max(0, Math.ceil(newTotalElements / currentPag.pageSize) - 1);
      const newCurrentPage = Math.min(currentPag.currentPage, maxPage);

      setPagination(prev => ({
        ...prev,
        totalElements: newTotalElements,
        totalPages: Math.ceil(newTotalElements / prev.pageSize),
        currentPage: newCurrentPage,
      }));

      fetchTransactions(newCurrentPage, currentPag.pageSize);

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

  // Efeito inicial para carregar dados
  useEffect(() => {
    fetchTransactions();
  }, [isAuthenticated, userRole, selectedUserId]);

  // Efeito separado para mudanças de filtro
  useEffect(() => {
    if (type || category) {
      setPagination(prev => ({ ...prev, currentPage: 0 }));
      setTimeout(() => {
        fetchTransactions(0, paginationRef.current.pageSize);
      }, 0);
    }
  }, [type, category, fetchTransactions]);

  return {
    transactions,
    pagination,
    loading,
    error,
    deleteDialogOpen,
    setDeleteDialogOpen,
    transactionToDelete,
    fetchTransactions,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
    handlePageChange,
    handlePageSizeChange,
  };
};