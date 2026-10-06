'use client';

import { useRouter } from 'next/navigation';

interface Category {
  id: string;
  name: string;
  icon: string;
  href: string;
}

const categories: Category[] = [
  {
    id: 'home',
    name: 'หน้าแรก',
    icon: '🏠',
    href: '/',
  },
  {
    id: 'income',
    name: 'สร้างรายได้',
    icon: '💰',
    href: '/income',
  },
  {
    id: 'lottery',
    name: 'หวย',
    icon: '🎰',
    href: '/lottery',
  },
  {
    id: 'sports',
    name: 'หวยยุด',
    icon: '⚽',
    href: '/sports',
  },
  {
    id: 'casino',
    name: 'คาสิโน',
    icon: '🎲',
    href: '/casino',
  },
];

export default function MenuCategories() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40 p-4">
      <div className="relative w-full max-w-sm bg-gradient-to-b from-[#C9A961] to-[#A67C52] rounded-3xl shadow-2xl p-8 border-8 border-red-600">
        {/* Close Button */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 right-4 text-white text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition font-bold"
        >
          ×
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">🎰</div>
          <h2 className="text-3xl font-bold text-white mb-2">ตรวจผลหวย</h2>
          <p className="text-sm text-white/90">ออนไลน์</p>
        </div>

        {/* Description */}
        <div className="text-center mb-8 bg-yellow-700 rounded-2xl p-4">
          <p className="text-white font-bold text-sm">
            ค้นหาและตรวจสอบสลากหวยของคุณกับผลการจับรางวัลในอดีต
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-8">
          <button
            className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-[#654321] font-bold py-3 px-4 rounded-lg transition shadow-md"
            onClick={() => router.push('/register')}
          >
            เริ่มต้นใช้งาน
          </button>
          <button
            className="flex-1 bg-transparent hover:bg-white/10 border-2 border-yellow-400 text-white font-bold py-3 px-4 rounded-lg transition"
            onClick={() => router.push('/login')}
          >
            เข้าสู่ระบบ
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 gap-4">
          {categories.map((category) => (
            <a
              key={category.id}
              href={category.href}
              className="group relative"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition transform hover:scale-105 cursor-pointer border-4 border-yellow-500">
                <div className="text-4xl mb-2 text-center">
                  {category.icon}
                </div>
                <h3 className="text-center font-bold text-[#654321] text-xs sm:text-sm">
                  {category.name}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
