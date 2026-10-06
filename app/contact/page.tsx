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

export default function ContactPage() {
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
          <h1 className="text-3xl font-bold">📞 ติดต่อเรา</h1>
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
          <h2 className="text-3xl font-bold text-[#8B7500] mb-2">📞 ช่องทางติดต่อ</h2>
          <p className="text-gray-600 text-lg mb-8">เรามีทีมสนับสนุนที่พร้อมช่วยเหลือคุณ 24/7</p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl border-2 border-blue-400">
              <h3 className="text-2xl font-bold text-blue-600 mb-3">📱 โทรศัพท์</h3>
              <p className="text-gray-700 mb-2 font-bold">+66 2 123-4567</p>
              <p className="text-gray-600 text-sm">เปิดให้บริการทุกวัน เวลา 08:00 - 22:00 น.</p>
            </div>

            <div className="p-6 bg-gradient-to-br from-green-50 to-white rounded-xl border-2 border-green-400">
              <h3 className="text-2xl font-bold text-green-600 mb-3">💬 LINE</h3>
              <p className="text-gray-700 mb-2 font-bold">@LotteryChecker</p>
              <p className="text-gray-600 text-sm">ตอบสนองเร็ว ช่วยเหลือทันที</p>
            </div>

            <div className="p-6 bg-gradient-to-br from-red-50 to-white rounded-xl border-2 border-red-400">
              <h3 className="text-2xl font-bold text-red-600 mb-3">✉️ อีเมล</h3>
              <p className="text-gray-700 mb-2 font-bold">support@lottery-checker.com</p>
              <p className="text-gray-600 text-sm">ตอบกลับภายใน 24 ชั่วโมง</p>
            </div>

            <div className="p-6 bg-gradient-to-br from-purple-50 to-white rounded-xl border-2 border-purple-400">
              <h3 className="text-2xl font-bold text-purple-600 mb-3">🌐 Facebook</h3>
              <p className="text-gray-700 mb-2 font-bold">Lottery Checker Thailand</p>
              <p className="text-gray-600 text-sm">ข้อมูลข่าวสารและข้อมูลอัปเดต</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl border-2 border-gray-300 p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">📝 ติดต่อเรา</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 font-bold mb-2">ชื่อของคุณ</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#FFD700]"
                  placeholder="ใส่ชื่อของคุณ"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">อีเมล</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#FFD700]"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">หัวข้อ</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#FFD700]"
                  placeholder="หัวข้อของคำถาม"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">ข้อความ</label>
                <textarea
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#FFD700] h-32"
                  placeholder="พิมพ์ข้อความของคุณ..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-b from-[#FFD700] to-[#DAA520] hover:from-[#FFED4E] hover:to-[#F0C000] text-[#654321] px-8 py-3 rounded-xl font-bold text-lg transition shadow-lg"
              >
                ส่งข้อความ
              </button>
            </form>
          </div>

          <div className="mt-8 p-6 bg-yellow-50 rounded-xl border-2 border-yellow-300">
            <h4 className="text-lg font-bold text-yellow-800 mb-3">⏰ เวลาทำการ</h4>
            <ul className="text-gray-700 space-y-2">
              <li>📅 วันจันทร์ - วันศุกร์: 08:00 - 22:00 น.</li>
              <li>📅 วันเสาร์ - วันอาทิตย์: 10:00 - 20:00 น.</li>
              <li>📅 ตรวจสอบการทำงาน: ได้ตลอด 24 ชั่วโมง</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
