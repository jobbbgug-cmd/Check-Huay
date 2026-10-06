'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LotterySearch from '@/components/LotterySearch';
import LotteryResults from '@/components/LotteryResults';

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
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-blue-900 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">🎰 Thai Lottery Checker</h1>
          <div className="space-x-4">
            <span className="text-blue-200">Welcome, {user.username}!</span>
            <button
              onClick={() => {
                localStorage.removeItem('token');
                router.push('/');
              }}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('search')}
            className={`px-6 py-3 rounded-lg font-medium transition ${
              activeTab === 'search'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            🔍 Search Ticket
          </button>
          <button
            onClick={() => setActiveTab('results')}
            className={`px-6 py-3 rounded-lg font-medium transition ${
              activeTab === 'results'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            📊 Past Results
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'search' && <LotterySearch />}
        {activeTab === 'results' && <LotteryResults />}
      </div>
    </div>
  );
}
