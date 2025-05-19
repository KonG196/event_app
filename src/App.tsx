
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header         from './components/Header';
import Footer         from './components/Footer';
import LoginPage      from './pages/LoginPage';
import RegisterPage   from './pages/RegisterPage';
import CalendarPage   from './pages/CalendarPage';
import EventsPage     from './pages/EventsPage';

export default function App() {
 return (
  <AuthProvider>
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/calendar"
              element={
                <ProtectedRoute>
                  <CalendarPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/events"
              element={
                <ProtectedRoute>
                  <EventsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="*"
              element={
                <ProtectedRoute>
                  <CalendarPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  </AuthProvider>
);

}
