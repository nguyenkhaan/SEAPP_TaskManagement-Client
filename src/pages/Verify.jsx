import React from 'react';
import { useState, useEffect } from 'react';
import RegisterSevices from '../services/register';
import { motion } from 'framer-motion';

function Verify() {
  const [status, setStatus] = useState('...Verifying...Gavv Heldenhelm...');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (!token) {
      setStatus('Missing token');
      return;
    }

    RegisterSevices.verify(token)
      .then(() => {
        setStatus('Email has been verified...Charged me...Charged me');
        setTimeout(() => {
          window.location.href = '/login';
        }, 1500);
      })
      .catch(() => {
        setStatus('Email verification failed or link is invalid...');
      });
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-2xl p-10 w-[90%] max-w-md text-center border border-gray-200"
      >
        <h1 className="text-2xl font-semibold text-gray-800 mb-3">Email Verification</h1>
        <p className="text-gray-600 text-lg leading-relaxed">{status}</p>

        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Verify;
