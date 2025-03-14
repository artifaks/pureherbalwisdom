
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "@/pages/Index";
import BlogPost from "@/pages/BlogPost";
import Auth from "@/pages/Auth";
import AuthCallback from "@/pages/AuthCallback";
import NotFound from "@/pages/NotFound";
import Blog from "@/pages/Blog";
import EnhancedBlog from "@/pages/EnhancedBlog";
import NewBlog from "@/pages/NewBlog";
import { Toaster } from "@/components/ui/toaster";
import SymptomMatcher from "@/pages/SymptomMatcher";
import Search from "@/pages/Search";
import HerbalTeas from "@/pages/HerbalTeas";
import HerbDetailPage from "@/pages/HerbDetailPage";
import Ebooks from "@/pages/Ebooks";
import EbooksAdmin from "@/pages/EbooksAdmin";
import EbooksDiagnostic from "@/pages/EbooksDiagnostic";
import EbookPurchaseSuccess from "@/pages/ebooks/success";
import StorageAdmin from "@/pages/StorageAdmin";
import { AuthProvider } from "@/hooks/use-auth";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CartProvider } from "@/contexts/CartContext";

// Create a client for React Query
const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="herb-harmony-theme">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CartProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/resources" element={<Navigate to="/" replace />} />
                <Route path="/blog" element={<EnhancedBlog />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
                <Route path="/symptom-matcher" element={<SymptomMatcher />} />
                <Route path="/search" element={<Search />} />
                <Route path="/herbal-teas" element={<HerbalTeas />} />
                <Route path="/herbs/:herbId" element={<HerbDetailPage />} />
                <Route path="/ebooks" element={<Ebooks />} />
                <Route path="/ebooks/success" element={<EbookPurchaseSuccess />} />
                <Route path="/ebooks/admin" element={<EbooksAdmin />} />
                <Route path="/ebooks/diagnostic" element={<EbooksDiagnostic />} />
                <Route path="/storage/admin" element={<StorageAdmin />} />
                <Route path="/admin" element={<Navigate to="/" replace />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
            <Toaster />
          </CartProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
