
import React, { useState, useEffect } from 'react';
import { BookOpen, Download, Edit, Plus, Upload, X, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/use-auth';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { purchaseService } from '@/services/purchaseService';
import { Ebook } from '@/types/ebook';

const Resources = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [resources, setResources] = useState<Ebook[]>([]);
  const [isAddingBook, setIsAddingBook] = useState(false);
  const [newBook, setNewBook] = useState({
    title: "",
    description: "",
    type: "e-book",
    price: "4.99",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [editingResource, setEditingResource] = useState<Ebook | null>(null);
  const [purchasedBooks, setPurchasedBooks] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setIsLoading(true);
        const data = await purchaseService.getAllEbooks();
        
        if (data && data.length > 0) {
          const formattedBooks = data.map(book => ({
            id: book.id,
            title: book.title,
            description: book.description || "",
            price: `$${book.price.toFixed(2)}`,
            type: book.type,
            popular: book.popular,
            fileUrl: book.file_url
          }));
          setResources(formattedBooks);
        } else {
          const initialResources: Ebook[] = [
            {
              id: "1",  // Changed from number to string
              title: "Medicinal Herbs Field Guide",
              description: "A comprehensive guide to identifying and using medicinal herbs in the wild.",
              price: "$12.99",
              type: "e-book",
              popular: true,
            },
            {
              id: "2",  // Changed from number to string
              title: "Herbal Preparations & Remedies",
              description: "Learn how to make tinctures, oils, salves, and more from common medicinal plants.",
              price: "$9.99",
              type: "e-book",
              popular: false,
            },
            {
              id: "3",  // Changed from number to string
              title: "Herbs for Heart Health",
              description: "Detailed information on using herbs specifically for cardiovascular wellness.",
              price: "$7.99",
              type: "e-book",
              popular: false,
            },
            {
              id: "4",  // Changed from number to string
              title: "Women's Herbal Wellness",
              description: "Natural approaches to women's health issues using traditional plant medicine.",
              price: "$8.99",
              type: "e-book",
              popular: true,
            },
            {
              id: "5",  // Changed from number to string
              title: "Digestive Healing with Herbs",
              description: "Protocols for addressing common digestive concerns with herbal support.",
              price: "$6.99",
              type: "guide",
              popular: false,
            },
            {
              id: "6",  // Changed from number to string
              title: "Seasonal Foraging Calendar",
              description: "Month-by-month guide for when to harvest medicinal plants in your region.",
              price: "$4.99",
              type: "calendar",
              popular: true,
            },
          ];
          
          setResources(initialResources);
          
          if (user) {
            await purchaseService.migrateInitialEbooks(initialResources);
          }
        }
      } catch (error) {
        console.error("Error fetching resources:", error);
        toast({
          title: "Error",
          description: "Failed to load resources",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchResources();
  }, [toast, user]);

  useEffect(() => {
    const checkPurchases = async () => {
      if (!user) return;
      
      const purchases: Record<string, boolean> = {};
      
      for (const resource of resources) {
        const isPurchased = await purchaseService.checkPurchaseStatus(user.id, resource.id);
        purchases[resource.id] = isPurchased;
      }
      
      setPurchasedBooks(purchases);
    };
    
    if (user && resources.length > 0) {
      checkPurchases();
    }
  }, [user, resources]);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    const ebookId = searchParams.get('ebook_id');
    
    if (sessionId && ebookId && user) {
      const verifyPayment = async () => {
        try {
          await purchaseService.verifyPurchase(user.id, String(ebookId), sessionId);
          
          setPurchasedBooks(prev => ({
            ...prev,
            [ebookId]: true
          }));
          
          toast({
            title: "Purchase Successful!",
            description: "Your e-book is now available for download.",
          });
          
          navigate('/resources', { replace: true });
        } catch (error) {
          console.error("Error verifying payment:", error);
          toast({
            title: "Verification Failed",
            description: "There was an issue verifying your purchase. Please contact support.",
            variant: "destructive",
          });
        }
      };
      
      verifyPayment();
    }
  }, [searchParams, user, navigate, toast]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handlePurchase = async (resource: Ebook) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to purchase this e-book.",
      });
      navigate('/auth');
      return;
    }
    
    try {
      const response = await supabase.functions.invoke('create-checkout', {
        body: { 
          ebook: resource,
          returnUrl: window.location.origin + '/resources'
        }
      });
      
      if (response.error) throw new Error(response.error.message);
      
      await purchaseService.createPurchaseRecord(
        user.id, 
        resource.id, 
        response.data.sessionId
      );
      
      window.location.href = response.data.url;
    } catch (error: any) {
      console.error("Error creating checkout session:", error);
      toast({
        title: "Checkout Failed",
        description: error.message || "There was an error processing your purchase",
        variant: "destructive",
      });
    }
  };

  const handleDownload = async (resource: Ebook) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to download this e-book.",
      });
      navigate('/auth');
      return;
    }
    
    if (!purchasedBooks[resource.id]) {
      handlePurchase(resource);
      return;
    }
    
    if (resource.fileUrl) {
      try {
        const { data, error } = await supabase.storage
          .from('e-books')
          .download(resource.fileUrl);
        
        if (error) {
          throw error;
        }
        
        const url = URL.createObjectURL(data);
        const a = document.createElement('a');
        a.href = url;
        a.download = resource.title + '.pdf';
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        toast({
          title: "Download Started",
          description: `"${resource.title}" is now downloading.`,
        });
      } catch (error) {
        console.error('Error downloading file:', error);
        toast({
          title: "Download Failed",
          description: "There was an error downloading the file. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Coming Soon!",
        description: `The download for "${resource.title}" will be available soon.`,
      });
    }
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
      const fileName = `${Date.now()}_${newBook.title.replace(/\s+/g, '_').toLowerCase()}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('e-books')
        .upload(fileName, selectedFile);
      
      if (error) {
        throw error;
      }

      const { data: insertData, error: insertError } = await supabase
        .from('ebooks')
        .insert({
          title: newBook.title,
          description: newBook.description,
          price: parseFloat(newBook.price),
          type: newBook.type,
          popular: false,
          file_url: fileName
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
        fileUrl: insertData.file_url
      };
      
      setResources([...resources, newEbook]);
      setNewBook({ title: "", description: "", type: "e-book", price: "4.99" });
      setSelectedFile(null);
      setIsAddingBook(false);
      
      toast({
        title: "E-book Added",
        description: `"${newBook.title}" has been added to your resources at $${parseFloat(newBook.price).toFixed(2)}.`,
      });
    } catch (error: any) {
      console.error('Error uploading file:', error);
      toast({
        title: "Upload Failed",
        description: error.message || "There was an error uploading your file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleEditClick = (resource: Ebook) => {
    setEditingResource(resource);
  };

  const handleEditCancel = () => {
    setEditingResource(null);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to edit an e-book.",
      });
      navigate('/auth');
      return;
    }
    
    if (!editingResource) return;
    
    try {
      const { error } = await supabase
        .from('ebooks')
        .update({
          price: parseFloat(editingResource.price.replace('$', ''))
        })
        .eq('id', editingResource.id);
      
      if (error) throw error;
      
      const updatedResources = resources.map(resource => 
        resource.id === editingResource.id 
          ? editingResource 
          : resource
      );
      
      setResources(updatedResources);
      setEditingResource(null);
      
      toast({
        title: "Price Updated",
        description: `"${editingResource.title}" price has been updated to ${editingResource.price}.`,
      });
    } catch (error: any) {
      console.error("Error updating price:", error);
      toast({
        title: "Update Failed",
        description: error.message || "There was an error updating the price",
        variant: "destructive",
      });
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingResource) {
      const newPrice = `$${parseFloat(e.target.value).toFixed(2)}`;
      setEditingResource({...editingResource, price: newPrice});
    } else {
      setNewBook({...newBook, price: e.target.value});
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="glass sticky top-0 z-10 py-6 px-8 flex items-center justify-center">
          <BookOpen className="w-6 h-6 mr-2 text-amber-600" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 bg-gradient-to-r from-amber-700 to-amber-500 bg-clip-text text-transparent">
            Herbal E-Books & Resources
          </h1>
          <BookOpen className="w-6 h-6 ml-2 text-amber-600 transform rotate-180" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="bg-white/70 rounded-xl p-8 shadow-sm max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sign In Required</h2>
            <p className="text-gray-600 mb-6">
              You need to sign in to access our premium herbal resources, make purchases and download e-books.
            </p>
            <Button 
              className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-8"
              onClick={() => navigate('/auth')}
            >
              <LogIn className="mr-2 h-4 w-4" />
              Sign In / Create Account
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="glass sticky top-0 z-10 py-6 px-8 flex items-center justify-center">
        <BookOpen className="w-6 h-6 mr-2 text-amber-600" />
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 bg-gradient-to-r from-amber-700 to-amber-500 bg-clip-text text-transparent">
          Herbal E-Books & Resources
        </h1>
        <BookOpen className="w-6 h-6 ml-2 text-amber-600 transform rotate-180" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">Premium Herbal Resources</h2>
          <Button 
            onClick={() => setIsAddingBook(true)} 
            className="bg-amber-500 hover:bg-amber-600 text-white"
          >
            <Plus className="mr-1 h-4 w-4" />
            Add E-Book
          </Button>
        </div>
        
        <p className="text-gray-600 mb-10">
          Expand your herbal knowledge with our curated collection of e-books, guides, and reference materials.
          These resources provide in-depth information about medicinal plants, preparation methods, and
          traditional uses to enhance your herbal practice.
        </p>

        {isAddingBook && (
          <Card className="mb-10 p-6">
            <h3 className="text-xl font-semibold mb-4">Add New E-Book</h3>
            <form onSubmit={handleAddBookSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title"
                  value={newBook.title}
                  onChange={e => setNewBook({...newBook, title: e.target.value})}
                  placeholder="E-Book Title"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description"
                  value={newBook.description}
                  onChange={e => setNewBook({...newBook, description: e.target.value})}
                  placeholder="Briefly describe your e-book content"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="type">Type</Label>
                <select
                  id="type"
                  value={newBook.type}
                  onChange={e => setNewBook({...newBook, type: e.target.value})}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="e-book">E-Book</option>
                  <option value="guide">Guide</option>
                  <option value="calendar">Calendar</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="price">Price ($)</Label>
                <Input 
                  id="price"
                  type="number"
                  min="0.00"
                  step="0.01"
                  value={newBook.price}
                  onChange={handlePriceChange}
                  placeholder="4.99"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="file">PDF File</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="file"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="flex-1"
                    required
                  />
                  {selectedFile && (
                    <span className="text-sm text-green-600">
                      {selectedFile.name}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button 
                  type="submit" 
                  className="bg-amber-500 hover:bg-amber-600" 
                  disabled={isUploading}
                >
                  {isUploading ? 'Uploading...' : 'Add E-Book'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setIsAddingBook(false);
                    setSelectedFile(null);
                  }}
                  disabled={isUploading}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}

        {editingResource && (
          <Card className="mb-10 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Edit Price: {editingResource.title}</h3>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleEditCancel}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <Label htmlFor="edit-price">Price ($)</Label>
                <Input 
                  id="edit-price"
                  type="number"
                  min="0.00"
                  step="0.01"
                  value={editingResource.price.replace('$', '')}
                  onChange={handlePriceChange}
                  required
                />
              </div>
              <div className="flex gap-2 pt-2">
                <Button 
                  type="submit" 
                  className="bg-amber-500 hover:bg-amber-600"
                >
                  Save Price
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleEditCancel}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}

        {isLoading ? (
          <div className="text-center py-20">
            <p className="text-gray-600">Loading resources...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <Card key={resource.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className={`p-1 ${resource.popular ? 'bg-amber-500' : 'bg-gray-100'}`}>
                  <p className={`text-center text-xs font-medium ${resource.popular ? 'text-white' : 'text-gray-500'}`}>
                    {resource.popular ? 'POPULAR RESOURCE' : resource.type.toUpperCase()}
                  </p>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{resource.title}</h3>
                  <p className="text-gray-600 mb-4 flex-1">{resource.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center">
                      <span className="text-lg font-bold text-amber-600">{resource.price}</span>
                      <Button 
                        onClick={() => handleEditClick(resource)}
                        variant="ghost" 
                        size="icon" 
                        className="ml-1 h-8 w-8 text-gray-500 hover:text-amber-600"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                    <Button 
                      onClick={() => purchasedBooks[resource.id] ? handleDownload(resource) : handlePurchase(resource)}
                      className="bg-amber-500 hover:bg-amber-600 text-white"
                      disabled={isUploading}
                    >
                      {purchasedBooks[resource.id] ? (
                        <>
                          <Download className="mr-1 h-4 w-4" />
                          Download
                        </>
                      ) : (
                        <>
                          <Download className="mr-1 h-4 w-4" />
                          Purchase
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-16 bg-white/70 rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Subscribe for Premium Access</h2>
          <p className="text-gray-600 mb-6">
            Get unlimited access to all our premium resources, plus early access to new content,
            with our monthly subscription plan.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1">
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-amber-500 mr-2">✓</span>
                  <span>Unlimited downloads of all e-books and guides</span>
                </li>
                <li className="flex items-center">
                  <span className="text-amber-500 mr-2">✓</span>
                  <span>Early access to new releases</span>
                </li>
                <li className="flex items-center">
                  <span className="text-amber-500 mr-2">✓</span>
                  <span>Exclusive monthly herbal recipes</span>
                </li>
              </ul>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-amber-600 mb-2">$14.99<span className="text-sm text-gray-600">/month</span></p>
              <Button className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-8">
                Subscribe Now
              </Button>
            </div>
          </div>
        </div>
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
