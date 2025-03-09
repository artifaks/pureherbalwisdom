
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Ebook } from '@/types/ebook';
import { useAuth } from '@/hooks/use-auth';

export const useEbooksAdd = (
  resources: Ebook[],
  setResources: React.Dispatch<React.SetStateAction<Ebook[]>>,
  sanitizeFileName: (fileName: string) => string,
  fetchResources: () => Promise<void>
) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [isAddingBook, setIsAddingBook] = useState(false);
  const [newBook, setNewBook] = useState({
    title: "",
    description: "",
    type: "e-book",
    price: "4.99",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedCover, setSelectedCover] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleCoverChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedCover(event.target.files[0]);
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewBook({...newBook, price: e.target.value});
  };

  const handleAddBookSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to add a new e-book.",
      });
      navigate('/auth');
      return;
    }
    
    if (!newBook.title || !newBook.description || !newBook.price) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to add a new e-book.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedFile) {
      toast({
        title: "Missing File",
        description: "Please upload a PDF file for your e-book.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      const fileExt = selectedFile.name.split('.').pop();
      const sanitizedTitle = sanitizeFileName(newBook.title.toLowerCase());
      const fileName = `${Date.now()}_${sanitizedTitle}.${fileExt}`;
      
      const { data: fileData, error: fileError } = await supabase.storage
        .from('e-books')
        .upload(fileName, selectedFile);
      
      if (fileError) {
        throw fileError;
      }

      let coverFileName = null;
      if (selectedCover) {
        const coverExt = selectedCover.name.split('.').pop();
        const sanitizedCoverName = sanitizeFileName(newBook.title.toLowerCase());
        coverFileName = `cover_${Date.now()}_${sanitizedCoverName}.${coverExt}`;
        
        const { error: coverError } = await supabase.storage
          .from('e-books')
          .upload(coverFileName, selectedCover);
        
        if (coverError) {
          throw coverError;
        }
      }

      const { data: insertData, error: insertError } = await supabase
        .from('ebooks')
        .insert({
          title: newBook.title,
          description: newBook.description,
          price: parseFloat(newBook.price),
          type: newBook.type,
          popular: false,
          file_url: fileName,
          cover_url: coverFileName
        })
        .select()
        .single();
      
      if (insertError) {
        throw insertError;
      }

      const newEbook: Ebook = {
        id: insertData.id,
        title: insertData.title,
        description: insertData.description || "",
        price: `$${insertData.price.toFixed(2)}`,
        type: insertData.type,
        popular: insertData.popular,
        fileUrl: insertData.file_url,
        coverUrl: insertData.cover_url
      };
      
      setResources([...resources, newEbook]);
      setNewBook({ title: "", description: "", type: "e-book", price: "4.99" });
      setSelectedFile(null);
      setSelectedCover(null);
      setIsAddingBook(false);
      
      toast({
        title: "E-book Added",
        description: `"${newBook.title}" has been added to your resources at $${parseFloat(newBook.price).toFixed(2)}.`,
      });
      
      // Refresh resources to ensure data is in sync
      fetchResources();
    } catch (error: any) {
      console.error('Error uploading files:', error);
      toast({
        title: "Upload Failed",
        description: error.message || "There was an error uploading your files. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return {
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
    handlePriceChange,
    handleAddBookSubmit
  };
};
