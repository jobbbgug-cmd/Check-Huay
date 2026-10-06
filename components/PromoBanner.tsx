'use client';

import { useState } from 'react';

export default function PromoBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    {
      id: 1,
      title: 'เริ่มแล้ววันนี้ เกศศาลหวยลาว',
      subtitle: 'จับเงินรางวัลจำนวนมาก',
      image: '🎊',
      color: 'from-blue-500 to-purple-600',
    },
    {
      id: 2,
      title: 'ยอดเลิศระสมครบ',
      subtitle: 'รับโบนัสพิเศษทุกวัน',
      image: '🏆',
      color: 'from-yellow-500 to-orange-600',
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const banner = banners[currentSlide];

  return (
    <div className="w-full px-4 py-4">
      <div className="max-w-6xl mx-auto relative">
        <div className={`bg-gradient-to-r ${banner.color} rounded-2xl p-8 shadow-2xl border-4 border-[#FFD700] relative overflow-hidden`}>
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="text-9xl absolute -top-10 -right-10">{banner.image}</div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <div className="text-5xl mb-4">{banner.image}</div>
            <h2 className="text-3xl font-bold text-white mb-2">
              {banner.title}
            </h2>
            <p className="text-white/90 text-lg mb-6">
              {banner.subtitle}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={prevSlide}
              className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition"
            >
              ←
            </button>
            <div className="flex gap-2">
              {banners.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full transition ${
                    idx === currentSlide ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
