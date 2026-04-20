import { useState } from 'react';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';

interface Coupon {
  id: string;
  sponsor: string;
  title: string;
  description: string;
  status: 'active' | 'used' | 'expired';
  expiryDate: string;
}

const COUPONS_STORAGE_KEY = 'carspot-coupons';

const defaultCoupons: Coupon[] = [
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
  {
    id: '5',
    sponsor: 'CarSpot Detail Lab',
    title: 'Free Interior Vacuum',
    description: 'Valid with any exterior wash package',
    status: 'active',
    expiryDate: 'Expires Jun 10, 2026',
  },
  {
    id: '6',
    sponsor: 'PitStop Cafe',
    title: 'Buy 1 Get 1 Coffee',
    description: 'Redeem one free coffee during any weekend meet',
    status: 'active',
    expiryDate: 'Expires Jul 5, 2026',
  },
];

const couponStatusOrder: Record<Coupon['status'], number> = {
  active: 0,
  used: 1,
  expired: 2,
};

const canUseStorage = () => typeof window !== 'undefined' && Boolean(window.localStorage);

function getCoupons() {
  if (!canUseStorage()) return defaultCoupons;

  try {
    const storedCoupons = JSON.parse(window.localStorage.getItem(COUPONS_STORAGE_KEY) || '[]') as Coupon[];
    if (!Array.isArray(storedCoupons) || storedCoupons.length === 0) return defaultCoupons;

    const storedById = new Map(storedCoupons.map((coupon) => [coupon.id, coupon]));
    return defaultCoupons.map((coupon) => storedById.get(coupon.id) || coupon);
  } catch {
    return defaultCoupons;
  }
}

function saveCoupons(coupons: Coupon[]) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(COUPONS_STORAGE_KEY, JSON.stringify(coupons));
}

function formatUsedDate() {
  return `Used on ${new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })}`;
}

function HardcodedQrCode({ coupon }: { coupon: Coupon }) {
  const code = `${coupon.sponsor}-${coupon.id}-${coupon.title}`;
  const cells = Array.from({ length: 121 }, (_, index) => {
    const row = Math.floor(index / 11);
    const col = index % 11;
    const finder =
      (row <= 2 && col <= 2) ||
      (row <= 2 && col >= 8) ||
      (row >= 8 && col <= 2);
    const value = code.charCodeAt(index % code.length) + row * 7 + col * 11 + index;
    return finder || value % 4 === 0 || value % 7 === 0;
  });

  return (
    <div className="w-52 h-52 bg-white rounded-lg p-4 mx-auto shadow-lg">
      <div className="grid grid-cols-11 gap-1 w-full h-full">
        {cells.map((isDark, index) => (
          <div
            key={index}
            className={`${isDark ? 'bg-black' : 'bg-white'} rounded-[1px]`}
          />
        ))}
      </div>
    </div>
  );
}

export function Rewards() {
  const [filter, setFilter] = useState<'all' | 'active' | 'used' | 'expired'>('all');
  const [coupons, setCoupons] = useState(() => getCoupons());
  const [confirmCoupon, setConfirmCoupon] = useState<Coupon | null>(null);
  const [detailCoupon, setDetailCoupon] = useState<Coupon | null>(null);

  const filteredCoupons = coupons.filter((coupon) => {
    if (filter === 'all') return true;
    return coupon.status === filter;
  }).sort((firstCoupon, secondCoupon) => {
    if (filter !== 'all') return 0;
    return couponStatusOrder[firstCoupon.status] - couponStatusOrder[secondCoupon.status];
  });

  const handleCouponClick = (coupon: Coupon) => {
    if (coupon.status !== 'active') return;
    setConfirmCoupon(coupon);
  };

  const handleConfirmUse = () => {
    if (!confirmCoupon) return;
    const usedCoupon: Coupon = {
      ...confirmCoupon,
      status: 'used',
      expiryDate: formatUsedDate(),
    };
    const nextCoupons = coupons.map((coupon) => coupon.id === usedCoupon.id ? usedCoupon : coupon);
    setCoupons(nextCoupons);
    saveCoupons(nextCoupons);
    setDetailCoupon(usedCoupon);
    setConfirmCoupon(null);
  };

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
            role={coupon.status === 'active' ? 'button' : undefined}
            tabIndex={coupon.status === 'active' ? 0 : undefined}
            onClick={() => handleCouponClick(coupon)}
            onKeyDown={(e) => {
              if (coupon.status === 'active' && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                handleCouponClick(coupon);
              }
            }}
            className={`bg-[#0F172A] border rounded-xl overflow-hidden ${
              coupon.status === 'active'
                ? 'border-[#A3E635]/30 hover:border-[#A3E635]/60 cursor-pointer transition-colors'
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
                  <p className="text-sm text-white/80">Tap to use coupon</p>
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

      <AlertDialog open={Boolean(confirmCoupon)} onOpenChange={(open) => !open && setConfirmCoupon(null)}>
        <AlertDialogContent className="bg-[#0F172A] border-white/[0.07] text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Use this coupon?</AlertDialogTitle>
            <AlertDialogDescription className="text-[#6B7280]">
              Are you sure you want to use{' '}
              <span className="text-white font-medium">{confirmCoupon?.title || 'this coupon'}</span>?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-white/20 text-white hover:bg-white/5">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-[#A3E635] text-black hover:bg-[#A3E635]/90"
              onClick={handleConfirmUse}
            >
              Sure
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={Boolean(detailCoupon)} onOpenChange={(open) => !open && setDetailCoupon(null)}>
        <DialogContent className="bg-[#0F172A] border-white/[0.07] text-white max-w-md">
          {detailCoupon && (
            <>
              <DialogHeader>
                <DialogTitle>{detailCoupon.title}</DialogTitle>
                <DialogDescription className="text-[#6B7280]">
                  {detailCoupon.sponsor} - {detailCoupon.description}
                </DialogDescription>
              </DialogHeader>

              <div className="bg-[#0B1120] border border-white/[0.07] rounded-xl p-6 text-center">
                <HardcodedQrCode coupon={detailCoupon} />
                <div className="mt-5">
                  <div className="text-xs uppercase tracking-wide text-[#6B7280] mb-1">Coupon Code</div>
                  <div className="font-mono text-lg text-[#A3E635]">
                    CARSPOT-{detailCoupon.id.padStart(3, '0')}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-[#6B7280]">{detailCoupon.expiryDate}</span>
                <Badge className="bg-[#6B7280] text-white">{detailCoupon.status}</Badge>
              </div>

              <Button
                className="w-full bg-[#A3E635] text-black hover:bg-[#A3E635]/90"
                onClick={() => setDetailCoupon(null)}
              >
                Done
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
