import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ 
  message, 
  type, 
  isVisible, 
  onClose, 
  duration = 5000 
}: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className={`fixed bottom-4 right-4 z-50 flex items-center p-4 rounded-lg shadow-lg ${
            type === 'success' 
              ? 'bg-green-500/90 text-white' 
              : 'bg-red-500/90 text-white'
          }`}
        >
          <div className="flex items-center">
            {type === 'success' ? (
              <CheckCircleIcon className="h-6 w-6 mr-2" />
            ) : (
              <XCircleIcon className="h-6 w-6 mr-2" />
            )}
            <p className="text-sm font-medium">{message}</p>
          </div>
          <button 
            onClick={onClose}
            className="ml-4 text-white/80 hover:text-white"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 