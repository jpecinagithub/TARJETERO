
import React from 'react';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6 md:py-8 max-w-7xl">
        {children}
      </main>
      <footer className="bg-white border-t border-slate-200 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} LocalDoc Explorer. Funcionando Offline.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
