'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthForm from '@/components/AuthForm';

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <>
      {/* Home page background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="min-h-screen bg-gradient-to-br from-[#8B7500] to-[#654321]"></div>
      </div>

      {/* Modal Overlay */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={() => router.push('/')}
      >
        <div
          className="relative w-full max-w-md bg-gradient-to-b from-[#DAA520] to-[#8B7500] rounded-3xl shadow-2xl p-8 text-white"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={() => router.push('/')}
            className="absolute top-4 right-4 text-white hover:text-[#FFD700] text-3xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 transition font-bold"
          >
            ×
          </button>

          {/* Header */}
          <h1 className="text-5xl font-bold text-center mb-3">🎰</h1>
          <h2 className="text-3xl font-bold text-center text-[#FFD700] mb-8">
            เข้าสู่ระบบ
          </h2>

          {/* Form */}
          <AuthForm type="login" />
        </div>
      </div>
    </>
  );
}

