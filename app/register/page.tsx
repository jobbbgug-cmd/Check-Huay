'use client';

import AuthForm from '@/components/AuthForm';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          🎰 Register
        </h1>
        <AuthForm type="register" />
      </div>
    </div>
  );
}
