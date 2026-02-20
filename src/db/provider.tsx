import React, { createContext, useContext, useEffect, useState } from 'react';
import { db } from './client';
// Optional: import migration files and run them here, though PGlite handles basic IDB persistence

const DbContext = createContext<typeof db | null>(null);

export const DbProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // In a real app we might run migrations here.
    // PGlite initialization is async but db object handles queries immediately if queued
    // We just mark it ready for simplicity
    setIsReady(true);
  }, []);

  if (!isReady) return <div className="p-4">Loading Data Layer...</div>;

  return (
    <DbContext.Provider value={db}>
      {children}
    </DbContext.Provider>
  );
};

export const useDb = () => {
  const context = useContext(DbContext);
  if (!context) {
    throw new Error('useDb must be used within a DbProvider');
  }
  return context;
};
