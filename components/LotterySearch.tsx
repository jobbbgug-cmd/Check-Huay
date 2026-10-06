'use client';

import { useState } from 'react';

interface SearchResult {
  drawDate: string;
  drawNumber: string;
  [key: string]: any;
}

export default function LotterySearch() {
  const [ticket, setTicket] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [found, setFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    setSearched(true);

    if (!ticket.trim()) {
      setError('Please enter a ticket number');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `/api/lottery/search?ticket=${encodeURIComponent(ticket)}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Search failed');
      }

      setFound(data.found);
      setResults(data.results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter Your Ticket Number
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={ticket}
                onChange={(e) => setTicket(e.target.value.toUpperCase())}
                placeholder="e.g., 123456"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition"
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
        </div>
      </form>

      {searched && (
        <>
          {found ? (
            <div className="bg-green-50 border-2 border-green-400 rounded-lg p-6">
              <h3 className="text-lg font-bold text-green-800 mb-4">
                🎉 Congratulations! Your Ticket Won!
              </h3>
              <div className="space-y-4">
                {results.map((result, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-4 border border-green-300">
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div>
                        <p className="text-sm text-gray-600">Draw Date</p>
                        <p className="font-semibold">{result.drawDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Draw Number</p>
                        <p className="font-semibold">{result.drawNumber}</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded text-sm text-gray-700">
                      <p>✓ Your ticket matched in this draw</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-6 text-center">
              <p className="text-gray-700 font-medium">
                No matching results found for ticket {ticket}
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Try checking another ticket or browse past results
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
