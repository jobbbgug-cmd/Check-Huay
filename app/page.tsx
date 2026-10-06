'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800">
      {/* Navigation */}
      <nav className="bg-blue-900 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">🎰 Thai Lottery Checker</h1>
          <div className="space-x-4">
            {isLoggedIn ? (
              <>
                <Link href="/dashboard" className="text-white hover:text-blue-200">
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    localStorage.removeItem('token');
                    setIsLoggedIn(false);
                    router.push('/');
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-white hover:text-blue-200">
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <div className="text-white mb-8">
          <h2 className="text-5xl font-bold mb-4">
            Check Your Thai Lottery Numbers
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Easily search and verify your lottery tickets against past draws
          </p>
        </div>

        {isLoggedIn ? (
          <Link
            href="/dashboard"
            className="inline-block bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 px-8 rounded-lg text-lg transition"
          >
            Go to Dashboard
          </Link>
        ) : (
          <div className="space-x-4">
            <Link
              href="/register"
              className="inline-block bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 px-8 rounded-lg text-lg transition"
            >
              Get Started
            </Link>
            <Link
              href="/login"
              className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-lg text-lg transition border-2 border-white"
            >
              Sign In
            </Link>
          </div>
        )}
      </div>

      {/* Features */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Features
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-blue-50 rounded-lg">
              <div className="text-4xl mb-4">🔍</div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                Quick Search
              </h4>
              <p className="text-gray-600">
                Search your ticket numbers against all past lottery draws
              </p>
            </div>
            <div className="p-6 bg-blue-50 rounded-lg">
              <div className="text-4xl mb-4">📊</div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                Historical Results
              </h4>
              <p className="text-gray-600">
                View complete Thai lottery results from previous draws
              </p>
            </div>
            <div className="p-6 bg-blue-50 rounded-lg">
              <div className="text-4xl mb-4">🔒</div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                Secure & Private
              </h4>
              <p className="text-gray-600">
                Your data is safe with our secure authentication system
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-900 text-white text-center py-6 mt-8">
        <p>&copy; 2026 Thai Lottery Checker. All rights reserved.</p>
      </footer>
    </div>
  );
}
