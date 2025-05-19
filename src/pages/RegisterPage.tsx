// src/pages/RegisterPage.tsx
import React, { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { staggerContainer, slideInRight, fadeIn } from '../animations/variants';

const RegisterPage: React.FC = () => {
  const { signup } = useAuth();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (pass.length < 6) {
      setError('Пароль має містити щонайменше 6 символів');
      return;
    }

    try {
      await signup(email, pass);
      navigate('/calendar');
    } catch (err: any) {
      switch (err.code) {
        case 'auth/weak-password':
          setError('Пароль недостатньо надійний');
          break;
        case 'auth/email-already-in-use':
          setError('Цей email вже використовується');
          break;
        case 'auth/invalid-email':
          setError('Невірний формат email');
          break;
        default:
          setError('Сталася помилка. Спробуйте ще раз');
      }
    }
  };

  return (
    <motion.div
      className="max-w-md mx-auto mt-20 space-y-6"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >

      <motion.div variants={slideInRight}>
        <AuthForm
          title="Реєстрація"
          fields={[
            { label: 'Email', type: 'email', value: email, onChange: e => setEmail(e.target.value), required: true },
            { label: 'Пароль', type: 'password', value: pass, onChange: e => setPass(e.target.value), required: true }
          ]}
          onSubmit={handleSubmit}
          footer={
            <div className="mt-4 text-center text-sm">
              Вже є акаунт?{' '}
              <Link to="/login" className="text-blue-600 hover:underline">
                Увійти
              </Link>
            </div>
          }
        />
      </motion.div>


      {error && (
        <motion.div className="bg-red-100 text-red-700 p-5 rounded" variants={fadeIn}>
          {error}
        </motion.div>
      )}
    </motion.div>
  );
};

export default RegisterPage;