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

export default function PromoPage() {
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
          <h1 className="text-3xl font-bold">🎁 โปรโมชั่น</h1>
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
          <h2 className="text-3xl font-bold text-[#8B7500] mb-2">🎁 โปรโมชั่นพิเศษ</h2>
          <p className="text-gray-600 text-lg mb-8">เข้าร่วมโปรโมชั่นของเราและรับรางวัลสุดพิเศษ</p>

          <div className="space-y-6">
            <div className="p-6 bg-gradient-to-r from-pink-50 to-red-50 rounded-xl border-3 border-red-400">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-2xl font-bold text-red-600">🎉 โปรต้อนรับสมาชิกใหม่</h3>
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">ใช้ได้</span>
              </div>
              <p className="text-gray-700 mb-3">ฝากครั้งแรก 100 บาท ได้โบนัส 50%</p>
              <p className="text-sm text-gray-600">ขั้นต่ำ: ฿100 | สูงสุด: ฿5,000 | เงื่อนไข: เทิร์นโอเวอร์ 5 ครั้ง</p>
            </div>

            <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border-3 border-blue-400">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-2xl font-bold text-blue-600">💎 โปรฝากวันละครั้ง</h3>
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">ใช้ได้</span>
              </div>
              <p className="text-gray-700 mb-3">ฝากวันละครั้ง ได้โบนัส 20%</p>
              <p className="text-sm text-gray-600">ขั้นต่ำ: ฿50 | สูงสุด: ฿3,000 | เนื่องจากทั้งวัน</p>
            </div>

            <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-3 border-green-400">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-2xl font-bold text-green-600">🏆 โปรแบ่งปันรางวัล</h3>
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">ใช้ได้</span>
              </div>
              <p className="text-gray-700 mb-3">ถ้าเพื่อนชนะ คุณได้โบนัส 5% จากการโอกาส</p>
              <p className="text-sm text-gray-600">ไม่มีขีดจำกัด | ได้รับทุกวัน | ตลอดปี</p>
            </div>

            <div className="p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border-3 border-purple-400">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-2xl font-bold text-purple-600">⭐ โปรคืนเงิน</h3>
                <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">ใช้ได้</span>
              </div>
              <p className="text-gray-700 mb-3">เสียเงินในเกม ได้คืน 10% ทุกวัน</p>
              <p className="text-sm text-gray-600">ขั้นต่ำ: ฿100 | สูงสุด: ฿2,000 | คืนเงินรายวัน</p>
            </div>
          </div>

          <div className="mt-8">
            <button className="bg-gradient-to-b from-[#FFD700] to-[#DAA520] hover:from-[#FFED4E] hover:to-[#F0C000] text-[#654321] px-8 py-3 rounded-xl font-bold text-lg transition shadow-lg w-full">
              ดูรายละเอียดเพิ่มเติม
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
