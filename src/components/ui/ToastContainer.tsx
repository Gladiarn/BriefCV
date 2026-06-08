"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useToast } from "@/store/useToast";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onClick={() => removeToast(toast.id)}
          >
            <Alert variant={toast.variant}>
              <AlertDescription>{toast.message}</AlertDescription>
            </Alert>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
