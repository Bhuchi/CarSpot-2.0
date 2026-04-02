import { useState } from 'react';
import { Badge } from '../components/ui/badge';

interface Coupon {
  id: string;
  sponsor: string;
  title: string;
  description: string;
  status: 'active' | 'used' | 'expired';
  expiryDate: string;
}

const mockCoupons: Coupon[] = [
  {
    id: '1',
    sponsor: 'AutoZone',
    title: '20% Off Any Purchase',
    description: 'Valid on all items in-store and online',
    status: 'active',
    expiryDate: 'Expires May 15, 2026',
  },
  {
    id: '2',
    sponsor: 'Shell',
    title: 'Free Car Wash',
    description: 'Premium wash with any fill-up',
    status: 'active',
    expiryDate: 'Expires Apr 30, 2026',
  },
  {
    id: '3',
    sponsor: 'Michelin',
    title: '$50 Off Tire Set',
    description: 'Valid on sets of 4 tires',
    status: 'used',
    expiryDate: 'Used on Mar 28, 2026',
  },
  {
    id: '4',
    sponsor: 'Valvoline',
    title: 'Free Oil Change',
    description: 'Standard oil change service',
    status: 'expired',
    expiryDate: 'Expired Mar 1, 2026',
  },
];

export function Rewards() {
  const [filter, setFilter] = useState<'all' | 'active' | 'used' | 'expired'>('all');

  const filteredCoupons = mockCoupons.filter((coupon) => {
    if (filter === 'all') return true;
    return coupon.status === filter;
  });

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h2 className="mb-8">My Coupons</h2>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-8">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === 'all'
              ? 'bg-[#A3E635] text-black'
              : 'bg-[#0F172A] text-white/60 hover:text-white border border-white/[0.07]'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === 'active'
              ? 'bg-[#A3E635] text-black'
              : 'bg-[#0F172A] text-white/60 hover:text-white border border-white/[0.07]'
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter('used')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === 'used'
              ? 'bg-[#A3E635] text-black'
              : 'bg-[#0F172A] text-white/60 hover:text-white border border-white/[0.07]'
          }`}
        >
          Used
        </button>
        <button
          onClick={() => setFilter('expired')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === 'expired'
              ? 'bg-[#A3E635] text-black'
              : 'bg-[#0F172A] text-white/60 hover:text-white border border-white/[0.07]'
          }`}
        >
          Expired
        </button>
      </div>

      {/* Coupons Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredCoupons.map((coupon) => (
          <article
            key={coupon.id}
            className={`bg-[#0F172A] border rounded-xl overflow-hidden ${
              coupon.status === 'active'
                ? 'border-[#A3E635]/30'
                : coupon.status === 'used'
                ? 'border-white/[0.07] opacity-60'
                : 'border-white/[0.07] opacity-40'
            }`}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-sm text-[#6B7280] mb-1">{coupon.sponsor}</div>
                  <h3 className="mb-2">{coupon.title}</h3>
                  <p className="text-sm text-[#6B7280]">{coupon.description}</p>
                </div>
                <Badge
                  className={
                    coupon.status === 'active'
                      ? 'bg-[#A3E635] text-black'
                      : coupon.status === 'used'
                      ? 'bg-[#6B7280] text-white'
                      : 'bg-[#EF4444]/20 text-[#EF4444]'
                  }
                >
                  {coupon.status}
                </Badge>
              </div>

              {coupon.status === 'active' && (
                <div className="bg-[#0B1120] border border-white/[0.07] rounded-lg p-4 mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1685575112968-7dd67bc447b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxciUyMGNvZGUlMjBkaWdpdGFsfGVufDF8fHx8MTc3NTAyOTQwOHww&ixlib=rb-4.1.0&q=80&w=400"
                    alt="QR Code"
                    className="w-32 h-32 mx-auto rounded"
                  />
                  <p className="text-xs text-center text-[#6B7280] mt-2">Scan at checkout</p>
                </div>
              )}

              <div className="text-xs text-[#6B7280]">{coupon.expiryDate}</div>
            </div>
          </article>
        ))}
      </div>

      {filteredCoupons.length === 0 && (
        <div className="bg-[#0F172A] border border-white/[0.07] rounded-xl p-12 text-center">
          <p className="text-[#6B7280]">No {filter !== 'all' ? filter : ''} coupons found</p>
        </div>
      )}
    </div>
  );
}
