import { Routes, Route } from "react-router-dom";
import React from 'react'
import { lazy, Suspense } from "react";
import { QueryClient,QueryClientProvider } from "@tanstack/react-query";

//  lazy here for better handling application
const PropertyForm = lazy(() => import("./Components/PropertyForm.jsx"));
const PropertyCard = lazy(() => import("./Components/PropertyCard.jsx"));
const SelectedCard = lazy(() => import("./Components/SelectedCard.jsx"));

function App() {
  const queryClient = new QueryClient(); 

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/" element={<PropertyForm />} />
          <Route path="/property" element={<PropertyCard />} />
          <Route path="/property/:id" element={<SelectedCard />} />
        </Routes>
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
