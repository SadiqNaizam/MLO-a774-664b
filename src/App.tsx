import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import BrowseSamplesPage from "./pages/BrowseSamplesPage";
import SampleDetailPage from "./pages/SampleDetailPage";
import SubmitSamplePage from "./pages/SubmitSamplePage";
import UserProfilePage from "./pages/UserProfilePage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/browse" element={<BrowseSamplesPage />} />
          <Route path="/sample/:id" element={<SampleDetailPage />} />
          <Route path="/submit" element={<SubmitSamplePage />} />
          <Route path="/profile" element={<UserProfilePage />} /> 
          {/* Optional: <Route path="/profile/:username" element={<UserProfilePage />} /> for viewing others */}
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;