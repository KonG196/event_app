// src/pages/LoginPage.tsx
import React, { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { staggerContainer, slideInRight, slideInDown,  slideInLeft } from '../animations/variants';



const LoginPage: React.FC = () => {
  const { login, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await login(email, pass);
      navigate('/calendar');
    } catch (err: any) {
      switch (err.code) {
        case 'auth/user-not-found':
          setError('Користувача з таким email не знайдено');
          break;
        case 'auth/wrong-password':
          setError('Невірний пароль');
          break;
        case 'auth/invalid-email':
          setError('Невірний формат email');
          break;
        case 'auth/invalid-credential':
          setError('Невірний пароль або email');
          break;
        default:
          setError('Сталася помилка. Спробуйте ще раз');
      }
    }
  };

  const handleGoogle = async () => {
    setError(null);
    try {
      await loginWithGoogle();
      navigate('/calendar');
    } catch {
      setError('Не вдалося увійти через Google');
    }
  };

  return (
    <motion.div
      className="max-w-md mx-auto mt-20 space-y-6"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      {/* Title */}
      <motion.h1
        className="text-3xl font-bold text-center"
        variants={slideInDown}
      >
        Увійти
      </motion.h1>

      {/* Form */}
      <motion.div variants={slideInRight}>
        <AuthForm
          title=""
          fields={[
            {
              label: 'Email',
              type: 'email',
              value: email,
              onChange: e => setEmail(e.target.value),
              required: true
            },
            {
              label: 'Пароль',
              type: 'password',
              value: pass,
              onChange: e => setPass(e.target.value),
              required: true
            }
          ]}
          onSubmit={handleSubmit}
          footer={
            <div className="mt-4 text-center text-sm space-y-2">
              <motion.button
                type="button"
                onClick={handleGoogle}
                className="text-blue-600 hover:underline"
                variants={slideInLeft}
              >
                Увійти через Google
              </motion.button>
              <motion.div variants={slideInLeft}>
                Немає акаунту?{' '}
                <Link to="/register" className="text-blue-600 hover:underline">
                  Зареєструватися
                </Link>
              </motion.div>
            </div>
          }
        />
      </motion.div>

      {/* Error */}
      {error && (
        <motion.div
          className="bg-red-100 text-red-700 p-3 rounded"
          variants={slideInLeft}
        >
          {error}
        </motion.div>
      )}
    </motion.div>
  );
};

export default LoginPage;
