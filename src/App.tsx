
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Detail from './pages/Detail';
import NotFound from './pages/NotFound';
import { DataItem, AppState } from './types';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    items: [],
    loading: true,
    error: null,
  });

  const fetchData = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await fetch('./data/index.json');
      if (!response.ok) {
        throw new Error('No se pudo cargar el catálogo de archivos.');
      }
      const data: DataItem[] = await response.json();
      setState({ items: data, loading: false, error: null });
    } catch (err) {
      setState({ 
        items: [], 
        loading: false, 
        error: err instanceof Error ? err.message : 'Error desconocido' 
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <HashRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <Layout>
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                items={state.items} 
                loading={state.loading} 
                error={state.error} 
                onRetry={fetchData} 
              />
            } 
          />
          <Route 
            path="/item/:id" 
            element={<Detail items={state.items} />} 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;