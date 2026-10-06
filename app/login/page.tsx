'use client';

import { useRouter } from 'next/navigation';
import AuthForm from '@/components/AuthForm';

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#5a9f8f] to-[#2d5f4f] rounded-3xl shadow-2xl p-8 text-white">
        {/* Close Button */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 right-4 text-white hover:text-gray-200 text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition"
        >
          ✕
        </button>

        {/* Header */}
        <h1 className="text-4xl font-bold text-center mb-2">🎰</h1>
        <h2 className="text-3xl font-bold text-center text-[#d4af37] mb-8">
          เข้าสู่ระบบ
        </h2>

        {/* Form */}
        <AuthForm type="login" />
      </div>
    </div>
  );
}

