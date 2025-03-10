
import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useEbooksDownload } from './useEbooksDownload';
import { useEbooksAdd } from './useEbooksAdd';
import { useEbooksEdit } from './useEbooksEdit';
import { useEbooksFetch } from './useEbooksFetch';
import { Ebook } from '@/types/ebook';
import { purchaseService } from '@/services/purchaseService';

export const useEbooks = () => {
  const { user, isAdmin, bypassAuth } = useAuth();
  
  // Import functionality from other hooks
  const { 
    resources, 
    setResources,
    isLoading,
    fetchResources,
    refreshData,
    handleDeleteEbook,
    purchasedBooks,
    setPurchasedBooks
  } = useEbooksFetch();
  
  // Now correctly pass the purchasedBooks and setPurchasedBooks to useEbooksDownload
  const {
    handlePurchase,
    handleDownload
  } = useEbooksDownload(purchasedBooks, setPurchasedBooks);
  
  // Utility function for sanitizing filenames
  const sanitizeFileName = (fileName: string): string => {
    return fileName
      .replace(/['":]/g, '') // Remove apostrophes, quotes, and colons
      .replace(/\s+/g, '_') // Replace spaces with underscores
      .replace(/[^\w.-]/g, ''); // Remove any remaining non-alphanumeric characters except underscores, periods, and hyphens
  };
  
  const {
    isAddingBook,
    setIsAddingBook,
    newBook,
    setNewBook,
    selectedFile,
    setSelectedFile,
    selectedCover,
    setSelectedCover,
    isUploading,
    handleFileChange,
    handleCoverChange,
    handleAddBookSubmit,
    handlePriceChange
  } = useEbooksAdd(resources, setResources, sanitizeFileName, fetchResources);
  
  const {
    editingResource,
    setEditingResource,
    handleEditClick,
    handleEditCancel,
    handleEditSubmit,
    handleDescriptionChange,
    handleTitleChange
  } = useEbooksEdit(refreshData);
  
  // Check purchase status when user or resources change
  useEffect(() => {
    const checkPurchasedBooks = async () => {
      if (user && resources && resources.length > 0) {
        const purchased: Record<string, boolean> = {};
        
        for (const resource of resources) {
          try {
            const isPurchased = await purchaseService.checkPurchaseStatus(user.id, resource.id);
            purchased[resource.id] = isPurchased;
          } catch (error) {
            console.error(`Error checking purchase status for book ${resource.id}:`, error);
            purchased[resource.id] = false;
          }
        }
        
        setPurchasedBooks(purchased);
      }
    };
    
    // If bypassAuth is true, mark all books as purchased
    if (bypassAuth && resources) {
      console.log("BypassAuth is true, marking all books as purchased");
      const allPurchased: Record<string, boolean> = {};
      resources.forEach(resource => {
        allPurchased[resource.id] = true;
      });
      setPurchasedBooks(allPurchased);
    } else if (user && resources) {
      console.log("Checking purchase status for user:", user.id);
      checkPurchasedBooks();
    }
  }, [user, resources, bypassAuth, setPurchasedBooks]);
  
  return {
    user,
    resources,
    isLoading,
    isAddingBook,
    setIsAddingBook,
    newBook,
    setNewBook,
    selectedFile,
    setSelectedFile,
    selectedCover,
    setSelectedCover,
    isUploading,
    editingResource,
    setEditingResource,
    purchasedBooks,
    handleFileChange,
    handleCoverChange,
    handleDownload,
    handlePurchase,
    handleAddBookSubmit,
    handleEditClick,
    handleEditCancel,
    handleEditSubmit,
    handlePriceChange,
    handleDescriptionChange,
    handleTitleChange,
    isAdmin,
    handleDeleteEbook,
    fetchResources,
    refreshData
  };
};
