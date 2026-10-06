'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import MenuCategories from '@/components/MenuCategories';
import PromoBanner from '@/components/PromoBanner';
import BottomNavigation from '@/components/BottomNavigation';

interface User {
  id: string;
  email: string;
  username: string;
}

export default function LotteryPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    fetchCurrentUser(token);
  }, [router]);

  async function fetchCurrentUser(token: string) {
    try {
      const response = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }

      const data = await response.json();
      setUser(data.user);
    } catch (error) {
      console.error('Error fetching user:', error);
      localStorage.removeItem('token');
      router.push('/login');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f1e8] to-[#ede5d8] pb-24">
      {/* Navigation Header */}
      <nav className="bg-gradient-to-r from-[#8B7500] to-[#654321] text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">🎰 หวยทั้งหมด</h1>
          <div className="space-x-4">
            <span className="text-[#FFD700] text-sm">ยินดี, {user.username}!</span>
            <button
              onClick={() => {
                localStorage.removeItem('token');
                router.push('/');
              }}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-bold transition text-sm"
            >
              ออก
            </button>
          </div>
        </div>
      </nav>

      {/* Menu Categories */}
      <MenuCategories />

      {/* Promo Banner */}
      <PromoBanner />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl border-4 border-[#FFD700] shadow-lg p-8">
          <h2 className="text-3xl font-bold text-[#8B7500] mb-6">🎰 ประเภทหวย</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-gradient-to-br from-[#FFF8DC] to-white rounded-xl border-2 border-[#FFD700] hover:shadow-lg transition">
              <h3 className="text-2xl font-bold text-[#8B7500] mb-2">🇹🇭 หวยรัฐบาล</h3>
              <p className="text-gray-600 mb-4">สลากกินแบ่งรัฐบาลไทย ออกทุกวันที่ 1 และ 16</p>
              <button className="bg-[#FFD700] hover:bg-[#DAA520] text-[#654321] px-4 py-2 rounded-lg font-bold transition">
                ซื้อหวย →
              </button>
            </div>

            <div className="p-6 bg-gradient-to-br from-[#FFF8DC] to-white rounded-xl border-2 border-[#FFD700] hover:shadow-lg transition">
              <h3 className="text-2xl font-bold text-[#8B7500] mb-2">🇱🇦 หวยลาว</h3>
              <p className="text-gray-600 mb-4">ผลการออกรางวัลหวยลาวทั้งหมด ทั้งเช้าและค่ำ</p>
              <button className="bg-[#FFD700] hover:bg-[#DAA520] text-[#654321] px-4 py-2 rounded-lg font-bold transition">
                ซื้อหวย →
              </button>
            </div>

            <div className="p-6 bg-gradient-to-br from-[#FFF8DC] to-white rounded-xl border-2 border-[#FFD700] hover:shadow-lg transition">
              <h3 className="text-2xl font-bold text-[#8B7500] mb-2">🌏 หวยไทย-พม่า</h3>
              <p className="text-gray-600 mb-4">หวยพิเศษออกทุกวันศุกร์ เสาร์ อาทิตย์</p>
              <button className="bg-[#FFD700] hover:bg-[#DAA520] text-[#654321] px-4 py-2 rounded-lg font-bold transition">
                ซื้อหวย →
              </button>
            </div>

            <div className="p-6 bg-gradient-to-br from-[#FFF8DC] to-white rounded-xl border-2 border-[#FFD700] hover:shadow-lg transition">
              <h3 className="text-2xl font-bold text-[#8B7500] mb-2">💎 หวยพิเศษ</h3>
              <p className="text-gray-600 mb-4">หวยออกเฉพาะในวันพิเศษและวันสำคัญ</p>
              <button className="bg-[#FFD700] hover:bg-[#DAA520] text-[#654321] px-4 py-2 rounded-lg font-bold transition">
                ซื้อหวย →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
