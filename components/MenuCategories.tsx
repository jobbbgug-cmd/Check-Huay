'use client';

import Link from 'next/link';

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
    href: '/dashboard',
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
];

export default function MenuCategories() {
  return (
    <div className="w-full bg-gradient-to-r from-[#8B7500] to-[#654321] py-4 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Horizontal menu - Full width with equal spacing */}
        <div className="grid grid-cols-3 gap-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="w-full"
            >
              <div className="bg-white rounded-xl p-4 shadow-lg hover:shadow-2xl transition transform hover:scale-105 cursor-pointer border-3 border-[#FFD700] w-full">
                <div className="text-4xl mb-2 text-center">
                  {category.icon}
                </div>
                <h3 className="text-center font-bold text-[#654321] text-sm">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
