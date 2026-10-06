'use client';

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  href: string;
}

const categories: Category[] = [
  {
    id: 'home',
    name: 'หน้าแรก',
    icon: '🏠',
    color: 'from-red-400 to-red-600',
    href: '/',
  },
  {
    id: 'income',
    name: 'สร้างรายได้',
    icon: '💰',
    color: 'from-green-400 to-green-600',
    href: '/income',
  },
  {
    id: 'lottery',
    name: 'หวย',
    icon: '🎰',
    color: 'from-yellow-400 to-yellow-600',
    href: '/lottery',
  },
  {
    id: 'sports',
    name: 'หวยยุด',
    icon: '⚽',
    color: 'from-blue-400 to-blue-600',
    href: '/sports',
  },
  {
    id: 'casino',
    name: 'คาสิโน',
    icon: '🎲',
    color: 'from-purple-400 to-purple-600',
    href: '/casino',
  },
];

export default function MenuCategories() {
  return (
    <div className="w-full bg-gradient-to-r from-[#8B7500] to-[#654321] py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map((category) => (
            <a
              key={category.id}
              href={category.href}
              className="group relative"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition transform hover:scale-105 cursor-pointer border-4 border-[#FFD700]">
                <div className={`text-5xl mb-3 text-center`}>
                  {category.icon}
                </div>
                <h3 className="text-center font-bold text-[#654321] text-sm sm:text-base">
                  {category.name}
                </h3>
              </div>
            </a>
          ))}
        </div>

        {/* Promotional banner */}
        <div className="mt-8 bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-2xl p-6 border-4 border-red-600 shadow-2xl">
          <div className="text-center text-white font-bold">
            <p className="text-lg sm:text-2xl mb-2">100% ทันใจอ่านครั้งแรก!</p>
            <p className="text-sm sm:text-base">แจกเครดิตฟรีทุกวัน สำหรับสมาชิก</p>
          </div>
        </div>
      </div>
    </div>
  );
}
