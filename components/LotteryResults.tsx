'use client';

import { useState, useEffect } from 'react';

interface LotteryResult {
  _id: string;
  drawDate: string;
  drawNumber: string;
  firstPrize: string;
  secondPrize: string[];
  thirdPrize: string[];
  fourthPrize: string[];
  fifthPrize: string[];
  nearFirstPrize: string[];
  runningNumber: string[];
}

interface LotteryResultsProps {
  page?: number;
}

export default function LotteryResults({ page = 1 }: LotteryResultsProps) {
  const [results, setResults] = useState<LotteryResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(page);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchResults(currentPage);
  }, [currentPage]);

  async function fetchResults(pageNum: number) {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(`/api/lottery/results?page=${pageNum}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch results');
      }

      setResults(data.results);
      setTotalPages(data.pagination.pages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-600">กำลังโหลดผลลัพธ์...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-100 border-l-4 border-red-600 text-red-700 rounded-lg">
        {error}
      </div>
    );
  }

  if (results.length === 0) {
    return <div className="text-center py-12 text-gray-600">ไม่พบผลลัพธ์</div>;
  }

  return (
    <div className="space-y-8">
      {results.map((result) => (
        <div
          key={result._id}
          className="card-gold"
        >
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm text-gray-600">งวดประจำวันที่</p>
                <p className="text-xl font-bold text-gray-800">{result.drawDate}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">งวดที่</p>
                <p className="text-xl font-bold text-gray-800">{result.drawNumber}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <PrizeSection
              title="รางวัลที่ 1"
              numbers={[result.firstPrize]}
              color="gold"
              badge="1"
            />
            <PrizeSection
              title="รางวัลที่ 2"
              numbers={result.secondPrize}
              color="silver"
              badge="2"
            />
            <PrizeSection
              title="รางวัลที่ 3"
              numbers={result.thirdPrize}
              color="bronze"
              badge="3"
            />
            <PrizeSection
              title="รางวัลที่ 4"
              numbers={result.fourthPrize}
              color="blue"
              badge="4"
            />
            <PrizeSection
              title="รางวัลที่ 5"
              numbers={result.fifthPrize}
              color="purple"
              badge="5"
            />
            <PrizeSection
              title="รางวัลเข้าใกล้ที่ 1"
              numbers={result.nearFirstPrize}
              color="near"
              badge="เข้า"
            />
            <PrizeSection
              title="เลขท้าย 2 ตัว"
              numbers={result.runningNumber}
              color="running"
              badge="ท้าย"
            />
          </div>
        </div>
      ))}

      {totalPages > 1 && (
        <div className="flex justify-center gap-3 mt-8">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-5 py-3 bg-gradient-to-b from-[#d4af37] to-[#b8941f] hover:from-[#e8c547] hover:to-[#c4b82e] disabled:from-gray-400 disabled:to-gray-500 text-[#2d5f4f] disabled:text-gray-600 font-bold rounded-lg transition shadow-md"
          >
            ← ก่อนหน้า
          </button>
          <span className="px-4 py-3 font-bold text-gray-700">
            หน้า {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-5 py-3 bg-gradient-to-b from-[#d4af37] to-[#b8941f] hover:from-[#e8c547] hover:to-[#c4b82e] disabled:from-gray-400 disabled:to-gray-500 text-[#2d5f4f] disabled:text-gray-600 font-bold rounded-lg transition shadow-md"
          >
            ถัดไป →
          </button>
        </div>
      )}
    </div>
  );
}

function PrizeSection({
  title,
  numbers,
  color,
  badge,
}: {
  title: string;
  numbers: string[];
  color: string;
  badge: string;
}) {
  const colorClasses: Record<string, string> = {
    gold: 'bg-gradient-to-r from-yellow-200 to-yellow-100 text-gray-900',
    silver: 'bg-gradient-to-r from-gray-200 to-gray-100 text-gray-900',
    bronze: 'bg-gradient-to-r from-orange-200 to-orange-100 text-gray-900',
    blue: 'bg-gradient-to-r from-blue-200 to-blue-100 text-gray-900',
    purple: 'bg-gradient-to-r from-purple-200 to-purple-100 text-gray-900',
    near: 'bg-gradient-to-r from-green-200 to-green-100 text-gray-900',
    running: 'bg-gradient-to-r from-emerald-200 to-emerald-100 text-gray-900',
  };

  const badgeClasses: Record<string, string> = {
    '1': 'bg-gradient-to-b from-yellow-400 to-yellow-600 text-white',
    '2': 'bg-gradient-to-b from-gray-400 to-gray-600 text-white',
    '3': 'bg-gradient-to-b from-orange-400 to-orange-600 text-white',
    '4': 'bg-blue-500 text-white',
    '5': 'bg-purple-500 text-white',
    เข้า: 'bg-green-500 text-white',
    ท้าย: 'bg-emerald-500 text-white',
  };

  return (
    <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${badgeClasses[badge]}`}>
          {badge}
        </div>
        <p className="text-sm font-bold text-gray-700">{title}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {numbers.map((num, idx) => (
          <span
            key={idx}
            className={`px-4 py-2 rounded-full font-bold font-mono text-center min-w-fit ${colorClasses[color]}`}
          >
            {num}
          </span>
        ))}
      </div>
    </div>
  );
}
