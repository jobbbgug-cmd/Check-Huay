'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import MenuCategories from '@/components/MenuCategories';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8B7500] to-[#654321]">
      {/* Navigation */}
      <nav className="bg-gradient-to-r from-[#654321] to-[#3E2723] shadow-2xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-white text-3xl font-bold">🎰 ตรวจหวย</h1>
          <div className="space-x-4">
            {isLoggedIn ? (
              <>
                <Link href="/dashboard" className="text-[#FFD700] hover:text-white font-bold transition">
                  แดชบอร์ด
                </Link>
                <button
                  onClick={() => {
                    localStorage.removeItem('token');
                    setIsLoggedIn(false);
                    router.push('/');
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold transition"
                >
                  ออกจากระบบ
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-[#FFD700] hover:text-white font-bold transition">
                  เข้าสู่ระบบ
                </Link>
                <Link
                  href="/register"
                  className="bg-gradient-to-b from-[#FFD700] to-[#DAA520] hover:from-[#FFED4E] hover:to-[#F0C000] text-[#654321] px-4 py-2 rounded-lg font-bold transition shadow-lg"
                >
                  สมัครสมาชิก
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <div className="text-white mb-12">
          <h2 className="text-6xl font-bold mb-6">
            🎰 ตรวจผลหวยออนไลน์
          </h2>
          <p className="text-2xl opacity-90 mb-8 text-[#FFD700]">
            ค้นหาและตรวจสอบสลากหวยของคุณกับผลการจับรางวัลในอดีต
          </p>
        </div>

        {isLoggedIn ? (
          <Link
            href="/dashboard"
            className="inline-block bg-gradient-to-b from-[#FFD700] to-[#DAA520] hover:from-[#FFED4E] hover:to-[#F0C000] text-[#654321] font-bold py-4 px-10 rounded-xl text-xl transition shadow-2xl"
          >
            ไปยังแดชบอร์ด →
          </Link>
        ) : (
          <div className="space-x-4">
            <Link
              href="/register"
              className="inline-block bg-gradient-to-b from-[#FFD700] to-[#DAA520] hover:from-[#FFED4E] hover:to-[#F0C000] text-[#654321] font-bold py-4 px-10 rounded-xl text-lg transition shadow-2xl"
            >
              เริ่มต้นใช้งาน
            </Link>
            <Link
              href="/login"
              className="inline-block bg-gradient-to-b from-[#DAA520] to-[#8B7500] hover:from-[#FFD700] hover:to-[#A68C20] text-white font-bold py-4 px-10 rounded-xl text-lg transition shadow-2xl border-2 border-[#FFD700]"
            >
              เข้าสู่ระบบ
            </Link>
          </div>
        )}
      </div>

      {/* Menu Categories */}
      <MenuCategories />

      {/* Features */}
      <div className="bg-white bg-opacity-95 py-20 mt-20">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-4xl font-bold text-center mb-16 text-[#8B7500]">
            ✨ ฟีเจอร์ของเรา
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-gradient-to-br from-[#FFF8DC] to-white rounded-2xl border-4 border-[#FFD700] shadow-lg hover:shadow-2xl transition">
              <div className="text-5xl mb-4">🔍</div>
              <h4 className="text-2xl font-bold text-[#8B7500] mb-3">
                ค้นหาสลากทันใจ
              </h4>
              <p className="text-gray-700">
                ค้นหาหมายเลขสลากของคุณกับผลการจับรางวัลทั้งหมด
              </p>
            </div>
            <div className="p-8 bg-gradient-to-br from-[#f5f1e8] to-white rounded-2xl border-4 border-[#d4af37] shadow-lg hover:shadow-2xl transition">
              <div className="text-5xl mb-4">📊</div>
              <h4 className="text-2xl font-bold text-[#8B7500] mb-3">
                ดูผลการจับรางวัล
              </h4>
              <p className="text-gray-700">
                ดูผลการจับรางวัลอย่างละเอียดจากงวดที่ผ่านมา
              </p>
            </div>
            <div className="p-8 bg-gradient-to-br from-[#f5f1e8] to-white rounded-2xl border-4 border-[#d4af37] shadow-lg hover:shadow-2xl transition">
              <div className="text-5xl mb-4">🔒</div>
              <h4 className="text-2xl font-bold text-[#8B7500] mb-3">
                ปลอดภัยและเป็นส่วนตัว
              </h4>
              <p className="text-gray-700">
                ข้อมูลของคุณปลอดภัยด้วยระบบการตรวจสอบสิทธิ์ที่ปลอดภัย
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#654321] to-[#3E2723] text-white text-center py-8 mt-8">
        <p className="text-gray-300">&copy; 2026 ตรวจหวยออนไลน์ สงวนลิขสิทธิ์</p>
        <p className="text-gray-400 text-sm mt-2">ทำด้วย ❤️ สำหรับคนรักการตรวจหวย</p>
      </footer>
    </div>
  );
}
