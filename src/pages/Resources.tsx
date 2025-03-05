
import React, { useState, useEffect } from 'react';
import { BookOpen, Download, Plus, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';

// Define our resource items with file URL field
interface Resource {
  id: number;
  title: string;
  description: string;
  price: string;
  type: string;
  popular: boolean;
  fileUrl?: string;
}

// Define our initial resources
const initialResources: Resource[] = [
  {
    id: 1,
    title: "Medicinal Herbs Field Guide",
    description: "A comprehensive guide to identifying and using medicinal herbs in the wild.",
    price: "$12.99",
    type: "e-book",
    popular: true,
  },
  {
    id: 2,
    title: "Herbal Preparations & Remedies",
    description: "Learn how to make tinctures, oils, salves, and more from common medicinal plants.",
    price: "$9.99",
    type: "e-book",
    popular: false,
  },
  {
    id: 3,
    title: "Herbs for Heart Health",
    description: "Detailed information on using herbs specifically for cardiovascular wellness.",
    price: "$7.99",
    type: "e-book",
    popular: false,
  },
  {
    id: 4,
    title: "Women's Herbal Wellness",
    description: "Natural approaches to women's health issues using traditional plant medicine.",
    price: "$8.99",
    type: "e-book",
    popular: true,
  },
  {
    id: 5,
    title: "Digestive Healing with Herbs",
    description: "Protocols for addressing common digestive concerns with herbal support.",
    price: "$6.99",
    type: "guide",
    popular: false,
  },
  {
    id: 6,
    title: "Seasonal Foraging Calendar",
    description: "Month-by-month guide for when to harvest medicinal plants in your region.",
    price: "$4.99",
    type: "calendar",
    popular: true,
  },
];

const Resources = () => {
  const { toast } = useToast();
  const [resources, setResources] = useState<Resource[]>(initialResources);
  const [isAddingBook, setIsAddingBook] = useState(false);
  const [newBook, setNewBook] = useState({
    title: "",
    description: "",
    type: "e-book",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleDownload = async (resource: Resource) => {
    if (resource.fileUrl) {
      try {
        // If we have a real file URL, download it
        const { data, error } = await supabase.storage
          .from('e-books')
          .download(resource.fileUrl);
        
        if (error) {
          throw error;
        }
        
        // Create a download link for the file
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
      // For resources without files, show the coming soon message
      toast({
        title: "Coming Soon!",
        description: `The download for "${resource.title}" will be available soon.`,
      });
    }
  };

  const handleAddBookSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newBook.title || !newBook.description) {
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
      // Upload the file to Supabase storage
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Date.now()}_${newBook.title.replace(/\s+/g, '_').toLowerCase()}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('e-books')
        .upload(fileName, selectedFile);
      
      if (error) {
        throw error;
      }

      const newId = Math.max(...resources.map(r => r.id)) + 1;
      const bookToAdd: Resource = {
        id: newId,
        title: newBook.title,
        description: newBook.description,
        price: "$4.99", // Fixed price as requested
        type: newBook.type,
        popular: false,
        fileUrl: fileName, // Store the path to the file
      };

      setResources([...resources, bookToAdd]);
      setNewBook({ title: "", description: "", type: "e-book" });
      setSelectedFile(null);
      setIsAddingBook(false);
      
      toast({
        title: "E-book Added",
        description: `"${newBook.title}" has been added to your resources at $4.99.`,
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="glass sticky top-0 z-10 py-6 px-8 flex items-center justify-center">
        <BookOpen className="w-6 h-6 mr-2 text-amber-600" />
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 bg-gradient-to-r from-amber-700 to-amber-500 bg-clip-text text-transparent">
          Herbal E-Books & Resources
        </h1>
        <BookOpen className="w-6 h-6 ml-2 text-amber-600 transform rotate-180" />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">Premium Herbal Resources</h2>
          <Button 
            onClick={() => setIsAddingBook(true)} 
            className="bg-amber-500 hover:bg-amber-600 text-white"
          >
            <Plus className="mr-1 h-4 w-4" />
            Add E-Book at $4.99
          </Button>
        </div>
        
        <p className="text-gray-600 mb-10">
          Expand your herbal knowledge with our curated collection of e-books, guides, and reference materials.
          These resources provide in-depth information about medicinal plants, preparation methods, and
          traditional uses to enhance your herbal practice.
        </p>

        {/* Add Book Form */}
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

        {/* Resources Grid */}
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
                  <span className="text-lg font-bold text-amber-600">{resource.price}</span>
                  <Button 
                    onClick={() => handleDownload(resource)}
                    className="bg-amber-500 hover:bg-amber-600 text-white"
                    disabled={isUploading}
                  >
                    <Download className="mr-1 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Subscription CTA */}
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

      {/* Footer */}
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
