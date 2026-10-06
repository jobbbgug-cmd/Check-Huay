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
    return <div className="text-center py-8">Loading lottery results...</div>;
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        {error}
      </div>
    );
  }

  if (results.length === 0) {
    return <div className="text-center py-8">No lottery results found</div>;
  }

  return (
    <div className="space-y-6">
      {results.map((result) => (
        <div
          key={result._id}
          className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            <div>
              <p className="text-gray-600 text-sm">Draw Date</p>
              <p className="text-lg font-semibold">{result.drawDate}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Draw Number</p>
              <p className="text-lg font-semibold">{result.drawNumber}</p>
            </div>
          </div>

          <div className="space-y-3">
            <PrizeSection
              title="Prize 1"
              numbers={[result.firstPrize]}
              color="gold"
            />
            <PrizeSection
              title="Prize 2"
              numbers={result.secondPrize}
              color="silver"
            />
            <PrizeSection
              title="Prize 3"
              numbers={result.thirdPrize}
              color="orange"
            />
            <PrizeSection
              title="Prize 4"
              numbers={result.fourthPrize}
              color="blue"
            />
            <PrizeSection
              title="Prize 5"
              numbers={result.fifthPrize}
              color="purple"
            />
            <PrizeSection
              title="Near Prize 1"
              numbers={result.nearFirstPrize}
              color="gray"
            />
            <PrizeSection
              title="Running Number"
              numbers={result.runningNumber}
              color="green"
            />
          </div>
        </div>
      ))}

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 rounded-lg"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 rounded-lg"
          >
            Next
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
}: {
  title: string;
  numbers: string[];
  color: string;
}) {
  const colorClasses: Record<string, string> = {
    gold: 'bg-yellow-100 text-yellow-900',
    silver: 'bg-gray-100 text-gray-900',
    orange: 'bg-orange-100 text-orange-900',
    blue: 'bg-blue-100 text-blue-900',
    purple: 'bg-purple-100 text-purple-900',
    gray: 'bg-gray-200 text-gray-800',
    green: 'bg-green-100 text-green-900',
  };

  return (
    <div>
      <p className="text-sm font-medium text-gray-700 mb-2">{title}</p>
      <div className="flex flex-wrap gap-2">
        {numbers.map((num, idx) => (
          <span
            key={idx}
            className={`px-3 py-1 rounded-full font-mono font-semibold text-sm ${colorClasses[color]}`}
          >
            {num}
          </span>
        ))}
      </div>
    </div>
  );
}
