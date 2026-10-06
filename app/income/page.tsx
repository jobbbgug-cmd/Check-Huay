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

export default function IncomePage() {
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
          <h1 className="text-3xl font-bold">💰 สร้างรายได้</h1>
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
          <h2 className="text-3xl font-bold text-[#8B7500] mb-4">💰 โอกาสสร้างรายได้</h2>
          <p className="text-gray-600 text-lg mb-6">
            เข้าร่วมโปรแกรมอัญเชิญ และสร้างรายได้จากการแนะนำเพื่อน
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-gradient-to-br from-[#FFF8DC] to-white rounded-xl border-2 border-[#FFD700]">
              <h3 className="text-2xl font-bold text-[#8B7500] mb-3">🎁 โบนัสอัญเชิญ</h3>
              <p className="text-gray-700">รับโบนัสทันทีเมื่อเพื่อนของคุณสมัครสมาชิก</p>
            </div>

            <div className="p-6 bg-gradient-to-br from-[#FFF8DC] to-white rounded-xl border-2 border-[#FFD700]">
              <h3 className="text-2xl font-bold text-[#8B7500] mb-3">📈 ค่าคอมมิชชั่น</h3>
              <p className="text-gray-700">ได้รับส่วนแบ่งจากการเลิ้นแต่ละครั้ง</p>
            </div>
          </div>

          <div className="mt-8">
            <button className="bg-gradient-to-b from-[#FFD700] to-[#DAA520] hover:from-[#FFED4E] hover:to-[#F0C000] text-[#654321] px-8 py-3 rounded-xl font-bold text-lg transition shadow-lg">
              เริ่มต้นสร้างรายได้
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
