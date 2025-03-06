import React, { useEffect, useCallback, useState } from 'react';
import { useEbooks } from '@/hooks/useEbooks';
import MainNavigation from '@/components/MainNavigation';
import ResourceHeader from '@/components/resources/ResourceHeader';
import EbookList from '@/components/resources/EbookList';
import AddEbookForm from '@/components/resources/AddEbookForm';
import EditEbookForm from '@/components/resources/EditEbookForm';
import AuthRequired from '@/components/resources/AuthRequired';

const Resources = () => {
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
  } = useEbooks();

  // Force a reload when resource modification operations occur
  const [forceRefresh, setForceRefresh] = useState(0);
  
  const refreshData = useCallback(() => {
    console.log("Refreshing resource data...");
    setForceRefresh(prev => prev + 1);
    fetchResources(); // Explicitly fetch resources when refresh is triggered
  }, [fetchResources]);

  // Re-fetch data when forceRefresh changes
  useEffect(() => {
    if (forceRefresh > 0) {
      fetchResources();
    }
  }, [forceRefresh, fetchResources]);

  if (!user) {
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
            <p className="text-gray-600">Loading resources...</p>
          </div>
        ) : (
          <EbookList
            resources={resources}
            purchasedBooks={purchasedBooks}
            isUploading={isUploading}
            handleDownload={handleDownload}
            handleEditClick={isAdmin ? handleEditClick : undefined}
            handleDeleteClick={isAdmin ? async (resource) => {
              await handleDeleteEbook(resource);
              refreshData();
            } : undefined}
            refreshData={refreshData}
          />
        )}

        {/* SubscriptionBanner component removed */}
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
