'use client';

import AuthForm from '@/components/AuthForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2d5f4f] to-[#1a3a2e] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gradient-to-b from-[#5a9f8f] to-[#2d5f4f] rounded-3xl shadow-2xl p-8 text-white">
        <h1 className="text-4xl font-bold text-center mb-2">🎰</h1>
        <h2 className="text-3xl font-bold text-center text-[#d4af37] mb-8">
          เข้าสู่ระบบ
        </h2>
        <AuthForm type="login" />
      </div>
    </div>
  );
}

