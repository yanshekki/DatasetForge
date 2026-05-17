import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Snackbar, Alert } from '@mui/material';

interface ErrorContextType {
  showError: (message: string) => void;
  showSuccess: (message: string) => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) throw new Error('useError must be used within ErrorProvider');
  return context;
};

export const ErrorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<'error' | 'success'>('error');

  const showError = (msg: string) => {
    setMessage(msg);
    setSeverity('error');
    setOpen(true);
  };

  const showSuccess = (msg: string) => {
    setMessage(msg);
    setSeverity('success');
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <ErrorContext.Provider value={{ showError, showSuccess }}>
      {children}
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert severity={severity} onClose={handleClose}>
          {message}
        </Alert>
      </Snackbar>
    </ErrorContext.Provider>
  );
};
