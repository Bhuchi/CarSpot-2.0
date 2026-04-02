import { useState } from 'react';
import { CheckCircle, XCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

interface Application {
  id: string;
  username: string;
  email: string;
  appliedAt: string;
  documentUrl: string;
  experience: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
}

const mockApplications: Application[] = [
  {
    id: '1',
    username: 'aspiring_organizer',
    email: 'aspiring@example.com',
    appliedAt: '2026-03-29',
    documentUrl: 'https://images.unsplash.com/photo-1623228297786-f198921716c1?w=400',
    experience: '5+ years organizing local car meets',
    reason: 'Want to create official monthly events in the LA area',
    status: 'pending',
  },
  {
    id: '2',
    username: 'event_master',
    email: 'eventmaster@example.com',
    appliedAt: '2026-03-28',
    documentUrl: 'https://images.unsplash.com/photo-1623228297786-f198921716c1?w=400',
    experience: 'Ran 10+ successful car shows',
    reason: 'Expanding to organize larger regional events',
    status: 'pending',
  },
];

export function AdminOrganizerVerification() {
  const [expandedApp, setExpandedApp] = useState<string | null>(null);

  const handleApprove = (appId: string) => {
    console.log(`Approving application ${appId}`);
  };

  const handleReject = (appId: string) => {
    console.log(`Rejecting application ${appId}`);
  };

  const toggleExpanded = (appId: string) => {
    setExpandedApp(expandedApp === appId ? null : appId);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h2 className="mb-8">Organizer Verification</h2>

      <div className="space-y-4">
        {mockApplications.map((app) => {
          const isExpanded = expandedApp === app.id;
          return (
            <div key={app.id} className="bg-[#0F172A] border border-white/[0.07] rounded-xl overflow-hidden">
              {/* Header */}
              <div
                className="p-6 flex items-center gap-4 cursor-pointer hover:bg-white/5 transition-colors"
                onClick={() => toggleExpanded(app.id)}
              >
                <div className="w-12 h-12 bg-[#A3E635] rounded-full flex items-center justify-center">
                  <span className="text-black font-semibold">{app.username[0].toUpperCase()}</span>
                </div>
                <div className="flex-1">
                  <div className="font-medium mb-1">@{app.username}</div>
                  <div className="text-sm text-[#6B7280]">{app.email}</div>
                </div>
                <Badge className="bg-[#F59E0B] text-black">{app.status}</Badge>
                <div className="text-sm text-[#6B7280]">Applied {app.appliedAt}</div>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-white/40" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-white/40" />
                )}
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="px-6 pb-6 pt-0 border-t border-white/[0.07]">
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    {/* Application Details */}
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-[#6B7280] mb-2">Experience</div>
                        <div className="bg-[#0B1120] border border-white/[0.07] rounded-lg p-4">
                          {app.experience}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-[#6B7280] mb-2">Reason for Application</div>
                        <div className="bg-[#0B1120] border border-white/[0.07] rounded-lg p-4">
                          {app.reason}
                        </div>
                      </div>
                    </div>

                    {/* Document Preview */}
                    <div>
                      <div className="text-sm text-[#6B7280] mb-2">Submitted Document</div>
                      <div className="bg-[#0B1120] border border-white/[0.07] rounded-lg p-4">
                        <img
                          src={app.documentUrl}
                          alt="Application document"
                          className="w-full rounded-lg mb-3"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-white/20 text-white hover:bg-white/5"
                        >
                          View Full Document
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 mt-6">
                    <Button
                      onClick={() => handleApprove(app.id)}
                      className="flex-1 bg-[#A3E635] text-black hover:bg-[#A3E635]/90"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      onClick={() => handleReject(app.id)}
                      className="flex-1 bg-[#EF4444]/20 text-[#EF4444] hover:bg-[#EF4444]/30"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {mockApplications.length === 0 && (
        <div className="bg-[#0F172A] border border-white/[0.07] rounded-xl p-12 text-center">
          <p className="text-[#6B7280]">No pending verification requests</p>
        </div>
      )}
    </div>
  );
}
