import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { setupEbooksDatabase } from '@/utils/setupEbooksDatabase';
import { Ebook, EbookCategory } from '@/types/ebook';
import { useAuth } from '@/hooks/use-auth';
import MainNavigation from '@/components/MainNavigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Plus, Trash2, Edit, FileUp, Upload, X, BookOpen, File, AlertCircle } from 'lucide-react';
import { formatFileSize } from '@/lib/utils';

const EbooksAdmin: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEbook, setSelectedEbook] = useState<Ebook | null>(null);
  const [isSettingUpDatabase, setIsSettingUpDatabase] = useState<boolean>(true);
  
  // Set up database tables if they don't exist
  useEffect(() => {
    const setupDatabase = async () => {
      setIsSettingUpDatabase(true);
      await setupEbooksDatabase();
      setIsSettingUpDatabase(false);
    };
    
    setupDatabase();
  }, []);
  
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [isPremium, setIsPremium] = useState(false);
  const [price, setPrice] = useState<string>('');
  const [tags, setTags] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [ebookFile, setEbookFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  // Fetch all ebooks
  const { data: ebooks, isLoading: ebooksLoading } = useQuery({
    queryKey: ['ebooks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ebooks')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        toast({
          title: 'Error fetching ebooks',
          description: error.message,
          variant: 'destructive'
        });
        return [];
      }
      
      return data as Ebook[];
    }
  });
  
  // Use local categories if database table doesn't exist yet
  const defaultCategories = [
    { id: '1', name: 'Medicinal Herbs', description: 'Books about herbs with medicinal properties' },
    { id: '2', name: 'Culinary Herbs', description: 'Books about herbs used in cooking' },
    { id: '3', name: 'Herbal Remedies', description: 'Books about making herbal remedies at home' },
    { id: '4', name: 'Herb Gardening', description: 'Books about growing and maintaining herb gardens' },
    { id: '5', name: 'Herbal History', description: 'Books about the historical uses of herbs' }
  ];

  // Fetch all categories
  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['ebook-categories'],
    queryFn: async () => {
      try {
        // Try to fetch categories
        const { data, error } = await supabase
          .from('ebook_categories')
          .select('*')
          .order('name');
        
        if (error) {
          // If there's an error (like table doesn't exist), use default categories
          console.error('Error fetching categories:', error.message);
          toast({
            title: 'Using default categories',
            description: 'Could not fetch categories from database. Using default categories instead.',
            variant: 'default'
          });
          return defaultCategories as EbookCategory[];
        }
        
        // If categories exist but are empty, use default ones
        if (data.length === 0) {
          return defaultCategories as EbookCategory[];
        }
        
        return data as EbookCategory[];
      } catch (error: any) {
        console.error('Error in categories query:', error);
        toast({
          title: 'Using default categories',
          description: 'Could not fetch categories from database. Using default categories instead.',
          variant: 'default'
        });
        return defaultCategories as EbookCategory[];
      }
    }
  });
  
  // Add ebook mutation
  const addEbookMutation = useMutation({
    mutationFn: async () => {
      if (!ebookFile) {
        throw new Error('Please select an ebook file');
      }
      
      setIsUploading(true);
      
      try {
        // 1. Upload the ebook file
        const ebookFileName = `${Date.now()}_${ebookFile.name}`;
        console.log(`Attempting to upload ebook file: ${ebookFileName} to ebooks/files/`);
        
        // Check if the bucket exists first
        const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
        
        if (bucketsError) {
          console.error('Error checking storage buckets:', bucketsError);
          throw new Error(`Storage bucket check failed: ${bucketsError.message}`);
        }
        
        const ebooksBucketExists = buckets?.some(bucket => bucket.name === 'ebooks');
        if (!ebooksBucketExists) {
          console.error('Ebooks bucket does not exist');
          throw new Error('The ebooks storage bucket does not exist. Please create it in your Supabase dashboard.');
        }
        
        // Attempt the upload with detailed options
        const { data: uploadData, error: ebookUploadError } = await supabase.storage
          .from('ebooks')
          .upload(`files/${ebookFileName}`, ebookFile, {
            cacheControl: '3600',
            upsert: false,
            contentType: ebookFile.type // Explicitly set the content type
          });
        
        if (ebookUploadError) {
          console.error('Detailed ebook upload error:', ebookUploadError);
          console.error('Error message:', ebookUploadError.message);
          console.error('Error status:', ebookUploadError.status);
          // Log the full error object for debugging
          console.error('Full error object:', JSON.stringify(ebookUploadError, null, 2));
          throw ebookUploadError;
        }
        
        console.log('Ebook upload successful:', uploadData);
        
        // 2. Upload the cover image if provided
        let coverImageUrl = null;
        if (coverImage) {
          const coverFileName = `${Date.now()}_${coverImage.name}`;
          console.log(`Attempting to upload cover image: ${coverFileName} to ebooks/covers/`);
          
          // Attempt the cover image upload with detailed options
          const { data: coverUploadData, error: coverUploadError } = await supabase.storage
            .from('ebooks')
            .upload(`covers/${coverFileName}`, coverImage, {
              cacheControl: '3600',
              upsert: false,
              contentType: coverImage.type // Explicitly set the content type
            });
          
          if (coverUploadError) {
            console.error('Detailed cover upload error:', coverUploadError);
            console.error('Error message:', coverUploadError.message);
            console.error('Error status:', coverUploadError.status);
            // Log the full error object for debugging
            console.error('Full error object:', JSON.stringify(coverUploadError, null, 2));
            throw coverUploadError;
          }
          
          console.log('Cover image upload successful:', coverUploadData);
          
          // Get the public URL
          const { data: coverData } = supabase.storage
            .from('ebooks')
            .getPublicUrl(`covers/${coverFileName}`);
          
          coverImageUrl = coverData.publicUrl;
        }
        
        // 3. Insert the ebook record
        const { data: ebookData, error: insertError } = await supabase
          .from('ebooks')
          .insert({
            title,
            description: description || null,
            author: author || null,
            cover_image_url: coverImageUrl,
            file_url: `files/${ebookFileName}`,
            file_type: ebookFile.name.split('.').pop() || 'pdf',
            file_size: ebookFile.size,
            is_premium: isPremium,
            price: price ? parseFloat(price) : null,
            tags: tags ? tags.split(',').map(tag => tag.trim()) : null
          })
          .select()
          .single();
        
        if (insertError) throw insertError;
        
        // 4. Insert category relationships if any
        if (selectedCategories.length > 0) {
          try {
            const categoryJunctions = selectedCategories.map(categoryId => ({
              ebook_id: ebookData.id,
              category_id: categoryId
            }));
            
            const { error: junctionError } = await supabase
              .from('ebook_category_junction')
              .insert(categoryJunctions);
            
            if (junctionError) {
              // If the junction table doesn't exist, just log the error
              // We'll still consider the ebook added successfully
              console.error('Could not add category relationships:', junctionError.message);
              toast({
                title: 'Ebook added without categories',
                description: 'The ebook was added successfully, but category relationships could not be saved.',
                variant: 'default'
              });
            }
          } catch (error) {
            console.error('Error adding category relationships:', error);
            // Don't throw the error, just notify the user
            toast({
              title: 'Ebook added without categories',
              description: 'The ebook was added successfully, but category relationships could not be saved.',
              variant: 'default'
            });
          }
        }
        
        return ebookData;
      } finally {
        setIsUploading(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ebooks'] });
      resetForm();
      setIsAddDialogOpen(false);
      toast({
        title: 'Success',
        description: 'Ebook added successfully',
        variant: 'default'
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error adding ebook',
        description: error.message,
        variant: 'destructive'
      });
    }
  });
  
  // Delete ebook mutation
  const deleteEbookMutation = useMutation({
    mutationFn: async (ebookId: string) => {
      // 1. Get the ebook to find file paths
      const { data: ebook, error: fetchError } = await supabase
        .from('ebooks')
        .select('*')
        .eq('id', ebookId)
        .single();
      
      if (fetchError) throw fetchError;
      
      // 2. Delete the ebook record (this will cascade to junction table)
      const { error: deleteError } = await supabase
        .from('ebooks')
        .delete()
        .eq('id', ebookId);
      
      if (deleteError) throw deleteError;
      
      // 3. Delete the file from storage
      if (ebook.file_url) {
        const { error: fileDeleteError } = await supabase.storage
          .from('ebooks')
          .remove([ebook.file_url]);
        
        if (fileDeleteError) {
          console.error('Error deleting file:', fileDeleteError);
        }
      }
      
      // 4. Delete the cover image if it exists
      if (ebook.cover_image_url) {
        // Extract the path from the URL
        const coverPath = ebook.cover_image_url.split('/').pop();
        if (coverPath) {
          const { error: coverDeleteError } = await supabase.storage
            .from('ebooks')
            .remove([`covers/${coverPath}`]);
          
          if (coverDeleteError) {
            console.error('Error deleting cover image:', coverDeleteError);
          }
        }
      }
      
      return ebookId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ebooks'] });
      setIsDeleteDialogOpen(false);
      setSelectedEbook(null);
      toast({
        title: 'Success',
        description: 'Ebook deleted successfully',
        variant: 'default'
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error deleting ebook',
        description: error.message,
        variant: 'destructive'
      });
    }
  });
  
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setAuthor('');
    setIsPremium(false);
    setPrice('');
    setTags('');
    setSelectedCategories([]);
    setCoverImage(null);
    setEbookFile(null);
  };
  
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };
  
  const handleAddEbook = (e: React.FormEvent) => {
    e.preventDefault();
    addEbookMutation.mutate();
  };
  
  const handleDeleteEbook = () => {
    if (selectedEbook) {
      deleteEbookMutation.mutate(selectedEbook.id);
    }
  };
  
  // Redirect if not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-amber-900">
        <MainNavigation />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-amber-800 dark:text-amber-300 mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600 dark:text-amber-200/70 mb-8">
            You need administrator privileges to access this page.
          </p>
          <Button 
            onClick={() => window.location.href = '/ebooks'}
            className="bg-amber-600 hover:bg-amber-700 text-white"
          >
            Back to E-Books
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-amber-900">
      <MainNavigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {isSettingUpDatabase ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700 mb-4"></div>
            <p className="text-amber-800 dark:text-amber-300 text-lg">Setting up ebooks database...</p>
            <p className="text-gray-600 dark:text-amber-200/70 mt-2 text-center max-w-md">
              This may take a moment. We're checking and setting up the necessary database tables for the ebooks feature.
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-amber-800 dark:text-amber-300 flex items-center">
                  <BookOpen className="mr-2 h-8 w-8 text-amber-600 dark:text-amber-400" />
                  Manage E-Books
                </h1>
                <p className="text-gray-600 dark:text-amber-200/70 mt-2">
                  Add, edit, or remove ebooks from your library
                </p>
              </div>
              
              <div className="mt-4 md:mt-0 flex gap-2">
                <Button 
                  className="bg-amber-600 hover:bg-amber-700 text-white flex items-center gap-2"
                  onClick={() => setIsAddDialogOpen(true)}
                >
                  <Plus className="h-4 w-4" />
                  Add New E-Book
                </Button>
                <Button 
                  className="bg-amber-700/80 hover:bg-amber-800 text-white flex items-center gap-2"
                  onClick={() => window.location.href = '/ebooks/diagnostic'}
                >
                  <AlertCircle className="h-4 w-4" />
                  Diagnostic Tool
                </Button>
              </div>
            </div>
          </>
        )}
        
        {!isSettingUpDatabase && (
          <Tabs defaultValue="all" className="mb-6">
            <TabsList className="bg-amber-100/50 dark:bg-amber-900/30">
              <TabsTrigger value="all">All E-Books</TabsTrigger>
              <TabsTrigger value="free">Free</TabsTrigger>
              <TabsTrigger value="premium">Premium</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-6">
              {renderEbooksList(ebooks || [])}
            </TabsContent>
            
            <TabsContent value="free" className="mt-6">
              {renderEbooksList((ebooks || []).filter(ebook => !ebook.is_premium))}
            </TabsContent>
            
            <TabsContent value="premium" className="mt-6">
              {renderEbooksList((ebooks || []).filter(ebook => ebook.is_premium))}
            </TabsContent>
          </Tabs>
        )}
      </div>
      
      {/* Add E-Book Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto" aria-describedby="add-ebook-dialog-description">
          <div id="add-ebook-dialog-description" className="sr-only">Form to add a new ebook to the store</div>
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-amber-800 dark:text-amber-300">
              Add New E-Book
            </DialogTitle>
            <DialogDescription>
              Fill in the details below to add a new ebook to your library.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleAddEbook} className="space-y-6 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-amber-800 dark:text-amber-300">
                    Title *
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border-amber-200 dark:border-amber-700 dark:bg-amber-900/30 dark:text-amber-100"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="author" className="text-amber-800 dark:text-amber-300">
                    Author
                  </Label>
                  <Input
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="border-amber-200 dark:border-amber-700 dark:bg-amber-900/30 dark:text-amber-100"
                  />
                </div>
                
                <div>
                  <Label htmlFor="description" className="text-amber-800 dark:text-amber-300">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border-amber-200 dark:border-amber-700 dark:bg-amber-900/30 dark:text-amber-100 min-h-[100px]"
                  />
                </div>
                
                <div>
                  <Label htmlFor="tags" className="text-amber-800 dark:text-amber-300">
                    Tags (comma-separated)
                  </Label>
                  <Input
                    id="tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="herbal medicine, recipes, etc."
                    className="border-amber-200 dark:border-amber-700 dark:bg-amber-900/30 dark:text-amber-100"
                  />
                </div>
                
                <div className="flex items-center space-x-2 mb-4">
                  <Checkbox
                    id="is-premium"
                    checked={isPremium}
                    onCheckedChange={(checked) => setIsPremium(checked === true)}
                    className="border-amber-300 dark:border-amber-700 data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600"
                  />
                  <Label
                    htmlFor="is-premium"
                    className="text-amber-800 dark:text-amber-300 cursor-pointer"
                  >
                    Premium Content (requires login)
                  </Label>
                </div>
                
                <div className="mb-4">
                  <Label htmlFor="price" className="text-amber-800 dark:text-amber-300 block mb-2">
                    Price ($)
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="9.99"
                    className="border-amber-200 dark:border-amber-700 dark:bg-amber-900/30 dark:text-amber-100"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label className="text-amber-800 dark:text-amber-300 block mb-2">
                    Categories
                  </Label>
                  <div className="max-h-[150px] overflow-y-auto p-2 border rounded-md border-amber-200 dark:border-amber-700 dark:bg-amber-900/30">
                    {categoriesLoading ? (
                      <p className="text-gray-500 dark:text-amber-200/60 italic">Loading categories...</p>
                    ) : categories && categories.length > 0 ? (
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <div key={category.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`category-${category.id}`}
                              checked={selectedCategories.includes(category.id)}
                              onCheckedChange={() => handleCategoryChange(category.id)}
                              className="border-amber-300 dark:border-amber-700 data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600"
                            />
                            <Label
                              htmlFor={`category-${category.id}`}
                              className="text-sm font-medium text-gray-700 dark:text-amber-200 cursor-pointer"
                            >
                              {category.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 dark:text-amber-200/60 italic">No categories available</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="cover-image" className="text-amber-800 dark:text-amber-300 block mb-2">
                    Cover Image
                  </Label>
                  <div className="border-2 border-dashed border-amber-200 dark:border-amber-700 rounded-md p-4 text-center">
                    {coverImage ? (
                      <div className="relative">
                        <img
                          src={URL.createObjectURL(coverImage)}
                          alt="Cover preview"
                          className="max-h-[150px] mx-auto rounded-md"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-0 right-0 h-6 w-6 rounded-full"
                          onClick={() => setCoverImage(null)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="py-4">
                        <FileUp className="h-10 w-10 text-amber-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500 dark:text-amber-200/60 mb-2">
                          Click to upload or drag and drop
                        </p>
                        <input
                          id="cover-image"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setCoverImage(e.target.files[0]);
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300"
                          onClick={() => document.getElementById('cover-image')?.click()}
                        >
                          Browse
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="ebook-file" className="text-amber-800 dark:text-amber-300 block mb-2">
                    E-Book File *
                  </Label>
                  <div className="border-2 border-dashed border-amber-200 dark:border-amber-700 rounded-md p-4 text-center">
                    {ebookFile ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <File className="h-6 w-6 text-amber-600 mr-2" />
                          <div className="text-left">
                            <p className="text-sm font-medium text-gray-700 dark:text-amber-200 truncate max-w-[200px]">
                              {ebookFile.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-amber-200/60">
                              {formatFileSize(ebookFile.size)}
                            </p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="h-6 w-6 rounded-full"
                          onClick={() => setEbookFile(null)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="py-4">
                        <Upload className="h-10 w-10 text-amber-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500 dark:text-amber-200/60 mb-2">
                          Upload your e-book file (PDF, EPUB, etc.)
                        </p>
                        <input
                          id="ebook-file"
                          type="file"
                          accept=".pdf,.epub,.mobi,.azw3,.doc,.docx"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setEbookFile(e.target.files[0]);
                            }
                          }}
                          required
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300"
                          onClick={() => document.getElementById('ebook-file')?.click()}
                        >
                          Browse
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  resetForm();
                  setIsAddDialogOpen(false);
                }}
                className="border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-amber-600 hover:bg-amber-700 text-white"
                disabled={isUploading || !title || !ebookFile}
              >
                {isUploading ? 'Uploading...' : 'Add E-Book'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md" aria-describedby="delete-ebook-dialog-description">
          <div id="delete-ebook-dialog-description" className="sr-only">Confirmation dialog for deleting an ebook</div>
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-amber-800 dark:text-amber-300">
              Confirm Deletion
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this e-book? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {selectedEbook && (
            <div className="py-4">
              <p className="font-medium text-amber-800 dark:text-amber-300">{selectedEbook.title}</p>
              {selectedEbook.author && (
                <p className="text-sm text-gray-600 dark:text-amber-200/70">By {selectedEbook.author}</p>
              )}
            </div>
          )}
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setSelectedEbook(null);
              }}
              className="border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDeleteEbook}
              disabled={deleteEbookMutation.isPending}
            >
              {deleteEbookMutation.isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
  
  function renderEbooksList(ebooksList: Ebook[]) {
    if (ebooksLoading) {
      return (
        <div className="grid grid-cols-1 gap-4 animate-pulse">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-white dark:bg-amber-900/40 rounded-lg shadow-md"></div>
          ))}
        </div>
      );
    }
    
    if (ebooksList.length === 0) {
      return (
        <div className="text-center py-12 bg-white dark:bg-amber-900/40 rounded-lg shadow-md">
          <BookOpen className="mx-auto h-16 w-16 text-amber-300 dark:text-amber-700 mb-4" />
          <h3 className="text-xl font-semibold text-amber-800 dark:text-amber-300 mb-2">No E-Books Found</h3>
          <p className="text-gray-600 dark:text-amber-200/70 mb-6">
            Get started by adding your first e-book to the library
          </p>
          <Button 
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-amber-600 hover:bg-amber-700 text-white"
          >
            Add E-Book
          </Button>
        </div>
      );
    }
    
    return (
      <div className="space-y-4">
        {ebooksList.map(ebook => (
          <Card key={ebook.id} className="bg-white dark:bg-amber-900/40 border-amber-100 dark:border-amber-800/50">
            <div className="flex flex-col md:flex-row items-start md:items-center p-4 gap-4">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-amber-100 dark:bg-amber-800/30 rounded-md overflow-hidden flex-shrink-0">
                {ebook.cover_image_url ? (
                  <img 
                    src={ebook.cover_image_url} 
                    alt={ebook.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <BookOpen className="h-10 w-10 text-amber-300 dark:text-amber-700" />
                  </div>
                )}
              </div>
              
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-300">{ebook.title}</h3>
                {ebook.author && (
                  <p className="text-sm text-gray-600 dark:text-amber-200/70">By {ebook.author}</p>
                )}
                <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-amber-200/60">
                  <span className="mr-4">{ebook.file_type ? ebook.file_type.toUpperCase() : 'PDF'} • {formatFileSize(ebook.file_size || 0)}</span>
                  {ebook.is_premium ? (
                    <span className="bg-amber-100 dark:bg-amber-800/50 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded-full text-xs font-medium">
                      Premium
                    </span>
                  ) : (
                    <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-0.5 rounded-full text-xs font-medium">
                      Free
                    </span>
                  )}
                  {ebook.price !== null && (
                    <span className="ml-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-0.5 rounded-full text-xs font-medium">
                      ${ebook.price.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex space-x-2 mt-2 md:mt-0">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 border-amber-200 dark:border-amber-700"
                  onClick={() => {
                    // Edit functionality would go here
                    toast({
                      title: 'Edit Feature',
                      description: 'Edit functionality coming soon!',
                      variant: 'default'
                    });
                  }}
                >
                  <Edit className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 border-red-200 dark:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-900/20"
                  onClick={() => {
                    setSelectedEbook(ebook);
                    setIsDeleteDialogOpen(true);
                  }}
                >
                  <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }
};

export default EbooksAdmin;
