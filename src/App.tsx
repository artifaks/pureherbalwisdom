
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "@/pages/Index";
import Resources from "@/pages/Resources";
import BlogPost from "@/pages/BlogPost";
import Auth from "@/pages/Auth";
import NotFound from "@/pages/NotFound";
import Blog from "@/pages/Blog";
import { Toaster } from "@/components/ui/toaster";
import SymptomMatcher from "@/pages/SymptomMatcher";

// Create a client for React Query
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/symptom-matcher" element={<SymptomMatcher />} />
          <Route path="/admin" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
