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

export default function DepositPage() {
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
          <h1 className="text-3xl font-bold">💳 ฝากถอนเงิน</h1>
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
          <h2 className="text-3xl font-bold text-[#8B7500] mb-2">💳 จัดการเงิน</h2>
          <p className="text-gray-600 text-lg mb-8">ฝากและถอนเงินอย่างปลอดภัยและรวดเร็ว</p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl border-2 border-blue-400 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold text-blue-600 mb-3">💰 ฝากเงิน</h3>
              <p className="text-gray-600 mb-4">เพิ่มเงินเข้าบัญชีของคุณเพื่อเล่นหวย</p>
              <div className="mb-4">
                <p className="text-sm text-gray-500">วิธีการ:</p>
                <ul className="list-disc list-inside text-gray-600 text-sm">
                  <li>โอนเงินผ่านธนาคาร</li>
                  <li>บัตรเครดิต/เดบิต</li>
                  <li>ดิจิทัลวอลเล็ต</li>
                </ul>
              </div>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-bold transition w-full">
                ฝากเงิน →
              </button>
            </div>

            <div className="p-6 bg-gradient-to-br from-green-50 to-white rounded-xl border-2 border-green-400 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold text-green-600 mb-3">🏦 ถอนเงิน</h3>
              <p className="text-gray-600 mb-4">ถอนเงินรางวัลของคุณออกจากระบบ</p>
              <div className="mb-4">
                <p className="text-sm text-gray-500">ข้อมูลบัญชี:</p>
                <ul className="list-disc list-inside text-gray-600 text-sm">
                  <li>ยอดเงินคงเหลือ: ฿0.00</li>
                  <li>เวลาประมวลผล: 1-2 ชั่วโมง</li>
                </ul>
              </div>
              <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-bold transition w-full">
                ถอนเงิน →
              </button>
            </div>
          </div>

          <div className="mt-8 p-6 bg-yellow-50 rounded-xl border-2 border-yellow-300">
            <h4 className="text-lg font-bold text-yellow-800 mb-3">⚠️ ข้อมูลสำคัญ</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>ค่าธรรมเนียมการโอนเงิน 0% เมื่อฝากผ่านธนาคาร</li>
              <li>ไม่มีค่าธรรมเนียมการถอนเงิน</li>
              <li>ทำรายการได้ 24/7 ตลอดวัน</li>
              <li>เงินถูกเก็บรักษาอย่างปลอดภัย</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
