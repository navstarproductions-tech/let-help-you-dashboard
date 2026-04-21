import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Monitor, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="rounded-lg bg-primary p-1.5">
                <Monitor className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold tracking-tight">navstAR <span className="text-primary">DIGITAL HUB</span></span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="px-3 py-2 text-sm font-medium transition-colors hover:text-primary">Home</Link>
              <Link to="/courses" className="px-3 py-2 text-sm font-medium transition-colors hover:text-primary">Courses</Link>
              <Link to="/about" className="px-3 py-2 text-sm font-medium transition-colors hover:text-primary">About</Link>
              <Link to="/admin" className="px-3 py-2 text-sm font-medium transition-colors hover:text-primary">Admin</Link>
              <Button asChild className="ml-4">
                <Link to="/courses">Enroll Now</Link>
              </Button>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b bg-background"
          >
            <div className="space-y-1 px-4 pb-3 pt-2 sm:px-6">
              <Link
                to="/"
                className="block rounded-md px-3 py-2 text-base font-medium hover:bg-accent"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/courses"
                className="block rounded-md px-3 py-2 text-base font-medium hover:bg-accent"
                onClick={() => setIsOpen(false)}
              >
                Courses
              </Link>
              <Link
                to="/admin"
                className="block rounded-md px-3 py-2 text-base font-medium hover:bg-accent"
                onClick={() => setIsOpen(false)}
              >
                Admin
              </Link>
              <div className="mt-4">
                <Button asChild className="w-full">
                  <Link to="/courses" onClick={() => setIsOpen(false)}>Enroll Now</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}