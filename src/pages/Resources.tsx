
import React, { useEffect, useCallback, useState } from 'react';
import { useEbooks } from '@/hooks/useEbooks';
import MainNavigation from '@/components/MainNavigation';
import ResourceHeader from '@/components/resources/ResourceHeader';
import EbookList from '@/components/resources/EbookList';
import AddEbookForm from '@/components/resources/AddEbookForm';
import EditEbookForm from '@/components/resources/EditEbookForm';
import AuthRequired from '@/components/resources/AuthRequired';
import { useToast } from '@/hooks/use-toast';

const Resources = () => {
  const { toast } = useToast();
  const {
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
    handlePurchase, // Use the separate purchase handler
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
  } = useEbooks();

  // Initial fetch on component mount
  useEffect(() => {
    console.log("Resources component mounted, fetching resources...");
    fetchResources();
  }, [fetchResources]);

  if (isLoading) {
    return <AuthRequired />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <MainNavigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ResourceHeader 
          onAddBook={() => setIsAddingBook(true)} 
          isAuthenticated={!!user}
          isAdmin={isAdmin}
        />

        {isAddingBook && isAdmin && (
          <AddEbookForm
            newBook={newBook}
            setNewBook={setNewBook}
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            selectedCover={selectedCover}
            setSelectedCover={setSelectedCover}
            isUploading={isUploading}
            onCancel={() => {
              setIsAddingBook(false);
              setSelectedFile(null);
              setSelectedCover(null);
            }}
            onSubmit={async (e) => {
              await handleAddBookSubmit(e);
              refreshData();
            }}
            handlePriceChange={handlePriceChange}
            handleFileChange={handleFileChange}
            handleCoverChange={handleCoverChange}
          />
        )}

        {editingResource && isAdmin && (
          <EditEbookForm
            editingResource={editingResource}
            setEditingResource={setEditingResource}
            onCancel={handleEditCancel}
            onSubmit={async (e) => {
              await handleEditSubmit(e);
              refreshData();
            }}
            handlePriceChange={handlePriceChange}
            handleTitleChange={handleTitleChange}
            handleDescriptionChange={handleDescriptionChange}
            handleCoverChange={handleCoverChange}
            selectedCover={selectedCover}
          />
        )}

        {isLoading ? (
          <div className="text-center py-20">
            <div className="flex flex-col items-center">
              <div className="h-8 w-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600">Loading resources...</p>
            </div>
          </div>
        ) : (
          <EbookList
            resources={resources}
            purchasedBooks={purchasedBooks}
            isUploading={isUploading}
            handleDownload={handleDownload}
            handlePurchase={handlePurchase} // Pass the separate purchase handler
            handleEditClick={isAdmin ? handleEditClick : undefined}
            handleDeleteClick={isAdmin ? async (resource) => {
              try {
                await handleDeleteEbook(resource);
                toast({
                  title: "E-book Deleted",
                  description: `"${resource.title}" has been deleted successfully.`,
                });
                refreshData();
              } catch (error: any) {
                console.error('Error in delete handler:', error);
                toast({
                  title: "Delete Failed",
                  description: error.message || "There was an error deleting the e-book",
                  variant: "destructive",
                });
              }
            } : undefined}
            refreshData={refreshData}
          />
        )}
      </div>

      <div className="mt-auto py-6 border-t border-gray-200 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Herbal E-Books & Resources. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Resources;
