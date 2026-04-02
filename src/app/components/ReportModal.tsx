import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  contentType: 'post' | 'user' | 'event';
  contentId: string;
}

export function ReportModal({ isOpen, onClose, contentType, contentId }: ReportModalProps) {
  const [selectedReason, setSelectedReason] = useState('');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const reasons = [
    'Spam or misleading',
    'Inappropriate content',
    'Harassment or hate speech',
    'Violence or dangerous content',
    'Copyright violation',
    'Other',
  ];

  const handleSubmit = () => {
    console.log('Reporting:', { contentType, contentId, reason: selectedReason, details });
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setSelectedReason('');
      setDetails('');
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#0F172A] border-white/[0.07] text-white max-w-md">
        {!submitted ? (
          <>
            <DialogHeader>
              <DialogTitle>Report {contentType}</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 pt-4">
              <div>
                <label className="block text-sm mb-3">Reason for report</label>
                <div className="space-y-2">
                  {reasons.map((reason) => (
                    <label key={reason} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="reason"
                        value={reason}
                        checked={selectedReason === reason}
                        onChange={(e) => setSelectedReason(e.target.value)}
                        className="accent-[#A3E635]"
                      />
                      <span className="text-sm">{reason}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="details" className="block text-sm mb-2">
                  Additional details (optional)
                </label>
                <Textarea
                  id="details"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Provide more context about this report..."
                  rows={4}
                  className="bg-[#0B1120] border-white/10 text-white"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={onClose}
                  variant="outline"
                  className="flex-1 border-white/20 text-white hover:bg-white/5"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!selectedReason}
                  className="flex-1 bg-[#A3E635] text-black hover:bg-[#A3E635]/90 disabled:opacity-50"
                >
                  Submit Report
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="py-12 text-center">
            <div className="w-16 h-16 bg-[#A3E635]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-[#A3E635]" />
            </div>
            <h3 className="mb-2">Report Submitted</h3>
            <p className="text-[#6B7280]">Thank you for helping keep CarSpot safe</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
