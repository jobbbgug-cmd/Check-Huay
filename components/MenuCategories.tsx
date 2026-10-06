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
    <div className="w-full bg-gradient-to-r from-[#8B7500] to-[#654321] py-4 px-4 border-b-2 border-[#FFD700]">
      <div className="max-w-6xl mx-auto">
        {/* Horizontal scrollable menu */}
        <div className="flex gap-3 overflow-x-auto pb-2 scroll-smooth">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="flex-shrink-0"
            >
              <div className="bg-white rounded-xl p-4 shadow-lg hover:shadow-2xl transition transform hover:scale-105 cursor-pointer border-3 border-[#FFD700] min-w-fit">
                <div className="text-3xl mb-2 text-center">
                  {category.icon}
                </div>
                <h3 className="text-center font-bold text-[#654321] text-sm whitespace-nowrap">
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
