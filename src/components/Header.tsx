
import React from 'react';
import { Link } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

export default function Header() {
  const { currentUser, logout } = useAuth();

  // Variants for logo and menu
  const logoVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0,   opacity: 1 }
  };
  const menuVariants = {

  };

  return (
    <motion.nav
      className="bg-gray-800 p-4 flex justify-between items-center"
      initial="hidden"
      animate="visible"
      transition={{ when: 'beforeChildren', staggerChildren: 0.15 }}
    >

      <motion.div variants={logoVariants} transition={{ type: 'spring', stiffness: 120 }}>
        <Link to="/" className="text-white text-xl font-semibold">
          Event Planner
        </Link>
      </motion.div>

      <motion.div
        className="space-x-4 flex items-center"
            
        initial={{ opacity: 0, x: 150 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
      >
        {currentUser ? (
          <>
            <Link to="/calendar" className="text-gray-300 hover:text-white">
              Календар
            </Link>
            <Link to="/events" className="text-gray-300 hover:text-white">
              Список
            </Link>
            <button
              onClick={logout}
              className="text-gray-300 hover:text-white"
            >
              Вихід
            </button>
          </>
        ) : (
          <Link to="/login" className="text-gray-300 hover:text-white">
            Увійти
          </Link>
        )}
      </motion.div>
    </motion.nav>
  );
}
