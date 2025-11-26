"use client"

import { motion, AnimatePresence } from "framer-motion"

interface TopToastProps {
  show: boolean
  message: string
}

export function TopToast({ show, message }: TopToastProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="
            fixed top-4 left-1/2 z-[9999]
            -translate-x-1/2
            px-5 py-3 
            rounded-xl
            backdrop-blur-md
            shadow-lg
            text-sm font-medium
            bg-white/70 dark:bg-black/60
            border border-white/30 dark:border-white/10
          "
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
