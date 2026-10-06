'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface AuthFormProps {
  type: 'login' | 'register';
}

export default function AuthForm({ type }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (type === 'register' && step === 2) {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }
    }

    setLoading(true);

    try {
      const endpoint = type === 'login' ? '/api/auth/login' : '/api/auth/register';
      const payload = type === 'login'
        ? { email, password }
        : { email, password, username };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Something went wrong');
        return;
      }

      localStorage.setItem('token', data.token);
      router.push('/dashboard');
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const isRegister = type === 'register';

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          type="button"
          onClick={() => setStep(1)}
          className={`flex-1 py-3 px-4 font-bold rounded-lg transition ${
            step === 1
              ? 'bg-[#5a9f8f] text-white'
              : 'bg-gray-400 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {isRegister ? 'สมัครสมาชิก' : 'เข้าสู่ระบบ'}
        </button>
        {isRegister && (
          <button
            type="button"
            onClick={() => setStep(2)}
            className={`flex-1 py-3 px-4 font-bold rounded-lg transition ${
              step === 2
                ? 'bg-[#5a9f8f] text-white'
                : 'bg-gray-400 text-gray-700 hover:bg-gray-300'
            }`}
          >
            ตั้งรหัสผ่าน
          </button>
        )}
      </div>

      {/* Progress Indicator for Register */}
      {isRegister && (
        <div className="flex gap-2 justify-center mb-6">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition ${
                  s === step
                    ? 'bg-[#5a9f8f] text-white'
                    : 'bg-gray-300 text-gray-500'
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div
                  className={`h-1 w-12 mx-2 transition ${
                    s < step ? 'bg-[#5a9f8f]' : 'bg-gray-300'
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-100 border-l-4 border-red-600 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Step 1: Register Details / Login */}
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              {isRegister ? 'อีเมล' : 'Email'}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={isRegister ? 'อีเมล' : 'Email'}
              className="w-full bg-white/90 border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#5a9f8f] focus:ring-2 focus:ring-[#5a9f8f] transition"
              required
            />
          </div>

          {isRegister && (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                ชื่อผู้ใช้
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="ชื่อผู้ใช้"
                className="w-full bg-white/90 border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#5a9f8f] focus:ring-2 focus:ring-[#5a9f8f] transition"
                required
              />
            </div>
          )}

          {!isRegister && (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                รหัสผ่าน
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="รหัสผ่าน"
                className="w-full bg-white/90 border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#5a9f8f] focus:ring-2 focus:ring-[#5a9f8f] transition"
                required
              />
            </div>
          )}
        </div>
      )}

      {/* Step 2: Set Password (Register Only) */}
      {isRegister && step === 2 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              รหัสผ่าน
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="รหัสผ่าน"
              className="w-full bg-white/90 border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#5a9f8f] focus:ring-2 focus:ring-[#5a9f8f] transition"
              required
            />
            <p className="text-xs text-gray-600 mt-1">
              อย่างน้อย 6 ตัวอักษร
            </p>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              ยืนยันรหัสผ่าน
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="ยืนยันรหัสผ่าน"
              className="w-full bg-white/90 border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#5a9f8f] focus:ring-2 focus:ring-[#5a9f8f] transition"
              required
            />
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-4">
        {isRegister && step === 2 && (
          <button
            type="button"
            onClick={() => setStep(1)}
            className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-4 rounded-lg transition"
          >
            ← กลับ
          </button>
        )}
        <button
          type={isRegister && step === 1 ? 'button' : 'submit'}
          onClick={
            isRegister && step === 1 ? () => setStep(2) : undefined
          }
          disabled={loading}
          className={`flex-1 ${
            loading ? 'opacity-50' : ''
          } bg-gradient-to-b from-[#5a9f8f] to-[#2d5f4f] hover:from-[#4a8f7f] hover:to-[#1d4f3f] text-white font-bold py-3 px-6 rounded-lg transition shadow-lg`}
        >
          {loading
            ? 'กำลังดำเนิน...'
            : isRegister && step === 1
            ? 'ต่อไป'
            : isRegister
            ? 'สมัครสมาชิก'
            : 'เข้าสู่ระบบ'}
        </button>
      </div>

      {/* Footer Link */}
      {step === 1 && (
        <p className="text-center text-sm text-gray-600">
          {isRegister ? (
            <>
              มีบัญชีอยู่แล้ว?{' '}
              <a href="/login" className="text-[#2d5f4f] hover:underline font-bold">
                เข้าสู่ระบบ
              </a>
            </>
          ) : (
            <>
              ยังไม่มีบัญชี?{' '}
              <a href="/register" className="text-[#2d5f4f] hover:underline font-bold">
                สมัครสมาชิก
              </a>
            </>
          )}
        </p>
      )}
    </form>
  );
}
