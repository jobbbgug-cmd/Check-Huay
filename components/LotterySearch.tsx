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
      setError('กรุณาป้อนหมายเลขสลาก');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `/api/lottery/search?ticket=${encodeURIComponent(ticket)}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'ค้นหาไม่สำเร็จ');
      }

      setFound(data.found);
      setResults(data.results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาด');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="card-gold">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">
              กรอกหมายเลขสลากของคุณ
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={ticket}
                onChange={(e) => setTicket(e.target.value.toUpperCase())}
                placeholder="เช่น 123456"
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#DAA520] focus:ring-2 focus:ring-[#DAA520] font-mono text-lg transition"
              />
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-3 bg-gradient-to-b from-[#FFD700] to-[#b8941f] hover:from-[#e8c547] hover:to-[#c4b82e] disabled:from-gray-400 disabled:to-gray-500 text-[#8B7500] disabled:text-gray-600 font-bold rounded-lg transition shadow-lg ${
                  loading ? 'opacity-50' : ''
                }`}
              >
                {loading ? 'ค้นหา...' : 'ค้นหา'}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-100 border-l-4 border-red-600 text-red-700 rounded-lg">
              {error}
            </div>
          )}
        </div>
      </form>

      {searched && (
        <>
          {found ? (
            <div className="card-gold border-l-8 border-green-600 bg-gradient-to-r from-green-50 to-white">
              <h3 className="text-2xl font-bold text-green-700 mb-6">
                🎉 ยินดีด้วย! สลากของคุณถูกรางวัล!
              </h3>
              <div className="space-y-4">
                {results.map((result, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg p-5 border-2 border-green-400 shadow-md"
                  >
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">วันที่จับรางวัล</p>
                        <p className="font-bold text-lg text-gray-800">
                          {result.drawDate}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">งวดที่</p>
                        <p className="font-bold text-lg text-gray-800">
                          {result.drawNumber}
                        </p>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-3 rounded-lg text-center">
                      <p className="text-green-800 font-bold">
                        ✓ สลากของคุณตรงกับงวดนี้
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="card-gold border-l-8 border-gray-400 text-center bg-gradient-to-r from-gray-50 to-white">
              <p className="text-2xl font-bold text-gray-700 mb-2">
                ไม่พบผลลัพธ์
              </p>
              <p className="text-gray-600 mb-4">
                ไม่พบสลาก {ticket} ในรางวัลเนินหน้า
              </p>
              <p className="text-sm text-gray-500">
                ลองตรวจสอบสลากอื่นหรือเรียกดูผลการจับรางวัลในอดีต
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
