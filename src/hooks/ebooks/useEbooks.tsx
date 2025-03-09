
import { useState, useCallback } from 'react';
import { useEbooksFetch } from './useEbooksFetch';
import { useEbooksEdit } from './useEbooksEdit';
import { useEbooksAdd } from './useEbooksAdd';
import { useEbooksDownload } from './useEbooksDownload';
import { useAuth } from '@/hooks/use-auth';

export const useEbooks = () => {
  const { user } = useAuth();
  
  // Force a reload when resource modification operations occur
  const [forceRefresh, setForceRefresh] = useState(0);
  
  // Get core ebooks functionality
  const {
    resources,
    setResources,
    purchasedBooks,
    setPurchasedBooks,
    isLoading,
    fetchResources
  } = useEbooksFetch();

  // Refreshing function for child hooks to use
  const refreshData = useCallback(() => {
    console.log("Refreshing resource data...");
    setForceRefresh(prev => prev + 1);
    fetchResources(); // Explicitly fetch resources when refresh is triggered
  }, [fetchResources]);

  // Get editing functionality
  const {
    editingResource,
    setEditingResource,
    selectedCover,
    setSelectedCover,
    isUploading: isEditUploading,
    isAdmin,
    handleCoverChange: handleEditCoverChange,
    handleDescriptionChange,
    handleTitleChange,
    handlePriceChange: handleEditPriceChange,
    handleEditClick,
    handleEditCancel,
    handleEditSubmit,
    handleDeleteEbook,
    sanitizeFileName
  } = useEbooksEdit(resources, setResources, fetchResources);

  // Get adding functionality
  const {
    isAddingBook,
    setIsAddingBook,
    newBook,
    setNewBook,
    selectedFile,
    setSelectedFile,
    selectedCover: addSelectedCover,
    setSelectedCover: setAddSelectedCover,
    isUploading: isAddUploading,
    handleFileChange,
    handleCoverChange: handleAddCoverChange,
    handlePriceChange: handleAddPriceChange,
    handleAddBookSubmit
  } = useEbooksAdd(resources, setResources, sanitizeFileName, fetchResources);

  // Get download functionality
  const {
    handleDownload
  } = useEbooksDownload(purchasedBooks, setPurchasedBooks);

  // Reconcile the two isUploading states
  const isUploading = isEditUploading || isAddUploading;

  // Combine the two handleCoverChange functions
  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingResource) {
      handleEditCoverChange(e);
    } else {
      handleAddCoverChange(e);
    }
  };

  // Combine the two handlePriceChange functions
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingResource) {
      handleEditPriceChange(e);
    } else {
      handleAddPriceChange(e);
    }
  };

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
    selectedCover: editingResource ? selectedCover : addSelectedCover,
    setSelectedCover: editingResource ? setSelectedCover : setAddSelectedCover,
    isUploading,
    editingResource,
    setEditingResource,
    purchasedBooks,
    handleFileChange,
    handleCoverChange,
    handleDescriptionChange,
    handleDownload,
    handleAddBookSubmit,
    handleEditClick,
    handleEditCancel,
    handleEditSubmit,
    handlePriceChange,
    isAdmin,
    handleDeleteEbook,
    handleTitleChange,
    fetchResources,
    refreshData
  };
};
