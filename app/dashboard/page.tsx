'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LotterySearch from '@/components/LotterySearch';
import LotteryResults from '@/components/LotteryResults';
import MenuCategories from '@/components/MenuCategories';
import PromoBanner from '@/components/PromoBanner';
import BottomNavigation from '@/components/BottomNavigation';

interface User {
  id: string;
  email: string;
  username: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'search' | 'results'>('search');
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
          <h1 className="text-3xl font-bold">🎰 ตรวจหวย</h1>
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

      {/* Menu Categories - Horizontal */}
      <MenuCategories />

      {/* Promo Banner */}
      <PromoBanner />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('search')}
            className={`px-6 py-3 rounded-lg font-bold text-lg transition shadow-lg ${
              activeTab === 'search'
                ? 'bg-gradient-to-b from-[#DAA520] to-[#8B7500] text-white'
                : 'bg-white text-[#8B7500] hover:bg-gray-50 border-2 border-[#FFD700]'
            }`}
          >
            🔍 ค้นหา
          </button>
          <button
            onClick={() => setActiveTab('results')}
            className={`px-6 py-3 rounded-lg font-bold text-lg transition shadow-lg ${
              activeTab === 'results'
                ? 'bg-gradient-to-b from-[#DAA520] to-[#8B7500] text-white'
                : 'bg-white text-[#8B7500] hover:bg-gray-50 border-2 border-[#FFD700]'
            }`}
          >
            📊 ผล
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'search' && <LotterySearch />}
        {activeTab === 'results' && <LotteryResults />}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
