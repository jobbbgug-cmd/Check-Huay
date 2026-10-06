'use client';

import Link from 'next/link';

interface NavItem {
  id: string;
  icon: string;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { id: 'deposit', icon: '💳', label: 'ฝากถอน', href: '/deposit' },
  { id: 'lottery', icon: '🎰', label: 'หวย', href: '/lottery' },
  { id: 'home', icon: '🏠', label: 'หน้าแรก', href: '/dashboard' },
  { id: 'promo', icon: '🎁', label: 'โปร', href: '/promo' },
  { id: 'contact', icon: '📞', label: 'ติดต่อ', href: '/contact' },
];

export default function BottomNavigation() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-[#8B7500] to-[#654321] border-t-4 border-[#FFD700] shadow-2xl">
      <div className="max-w-6xl mx-auto px-2">
        <div className="grid grid-cols-5 gap-0">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="flex flex-col items-center justify-center py-3 text-white hover:bg-white/10 transition"
            >
              <div className="text-2xl mb-1">{item.icon}</div>
              <span className="text-xs font-bold text-center">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
