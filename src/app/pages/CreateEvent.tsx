import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronRight, ChevronLeft, ImagePlus, Upload } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { addEvent, formatEventDate, formatEventTime, pickFallbackEventImage } from '../lib/events';

export function CreateEvent() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    coverImage: '',
    coverImageName: '',
    date: '',
    time: '',
    location: '',
    capacity: '',
    rules: '',
    permit: null as File | null,
    sponsors: '',
    rewardType: 'discount' as 'discount' | 'freeItem' | 'raffle',
  });

  const totalSteps = 4;

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleCoverImageChange = (file: File | null) => {
    if (!file) {
      setFormData((currentFormData) => ({ ...currentFormData, coverImage: '', coverImageName: '' }));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((currentFormData) => ({
        ...currentFormData,
        coverImage: typeof reader.result === 'string' ? reader.result : '',
        coverImageName: file.name,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    const name = formData.name.trim() || 'Untitled Car Meet';
    const capacity = Number(formData.capacity);
    const rules = formData.rules
      .split('\n')
      .map((rule) => rule.trim())
      .filter(Boolean);

    addEvent({
      id: `event-${Date.now()}`,
      name,
      coverImage: formData.coverImage || pickFallbackEventImage(`${name}-${formData.location}`),
      organizer: 'you',
      organizerVerified: true,
      date: formatEventDate(formData.date),
      time: formatEventTime(formData.time),
      location: formData.location.trim() || 'Location not set',
      capacity: Number.isFinite(capacity) && capacity > 0 ? capacity : 50,
      registered: 0,
      description: rules.length > 0
        ? rules.join(' ')
        : 'A community car meet created by the organizer.',
      rules: rules.length > 0
        ? rules
        : ['Respect attendees and their vehicles', 'Follow organizer instructions', 'Keep the venue clean'],
      sponsors: formData.sponsors
        .split(',')
        .map((sponsor) => sponsor.trim())
        .filter(Boolean),
    });
    navigate('/events');
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h2 className="mb-8">Create Event</h2>

      {/* Progress Stepper */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors ${
                  s <= step
                    ? 'bg-[#A3E635] text-black'
                    : 'bg-[#0F172A] border border-white/[0.07] text-white/40'
                }`}
              >
                {s}
              </div>
              {s < 4 && (
                <div className={`flex-1 h-0.5 mx-2 ${s < step ? 'bg-[#A3E635]' : 'bg-white/10'}`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm text-[#6B7280]">
          <span>Details</span>
          <span>Permits</span>
          <span>Sponsors</span>
          <span>Review</span>
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-[#0F172A] border border-white/[0.07] rounded-xl p-8">
        {step === 1 && (
          <div className="space-y-6">
            <h3>Event Details</h3>
            <div>
              <label className="block text-sm mb-2">Event Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., SoCal Cars & Coffee"
                className="bg-[#0B1120] border-white/10 text-white"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Card Photo</label>
              <label className="grid sm:grid-cols-[180px_1fr] gap-4 border-2 border-dashed border-white/20 rounded-xl p-4 hover:border-[#A3E635]/50 transition-colors cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleCoverImageChange(e.target.files?.[0] || null)}
                  className="hidden"
                />
                <div className="aspect-video rounded-lg overflow-hidden bg-[#0B1120] border border-white/[0.07] flex items-center justify-center">
                  {formData.coverImage ? (
                    <img src={formData.coverImage} alt="Event card preview" className="w-full h-full object-cover" />
                  ) : (
                    <ImagePlus className="w-10 h-10 text-white/40" />
                  )}
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-white/80 mb-1">Upload event card image</p>
                  <p className="text-sm text-white/40">JPG or PNG</p>
                  {formData.coverImageName && (
                    <p className="text-sm text-[#A3E635] mt-3">✓ {formData.coverImageName}</p>
                  )}
                </div>
              </label>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm mb-2">Date</label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="bg-[#0B1120] border-white/10 text-white"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Time</label>
                <Input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="bg-[#0B1120] border-white/10 text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm mb-2">Location</label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Full address"
                className="bg-[#0B1120] border-white/10 text-white"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Capacity</label>
              <Input
                type="number"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                placeholder="Maximum attendees"
                className="bg-[#0B1120] border-white/10 text-white"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Event Rules</label>
              <Textarea
                value={formData.rules}
                onChange={(e) => setFormData({ ...formData, rules: e.target.value })}
                placeholder="List the rules and guidelines for attendees"
                rows={4}
                className="bg-[#0B1120] border-white/10 text-white"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h3>Upload Permits</h3>
            <p className="text-[#6B7280]">Upload necessary permits and documentation for venue usage</p>
            <label className="block border-2 border-dashed border-white/20 rounded-xl p-12 text-center hover:border-[#A3E635]/50 transition-colors cursor-pointer">
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setFormData({ ...formData, permit: e.target.files?.[0] || null })}
                className="hidden"
              />
              <Upload className="w-12 h-12 text-white/40 mx-auto mb-4" />
              <p className="text-white/80 mb-2">Click or drag permit document</p>
              <p className="text-sm text-white/40">PDF, JPG, PNG up to 10MB</p>
              {formData.permit && (
                <p className="text-sm text-[#A3E635] mt-4">✓ {formData.permit.name}</p>
              )}
            </label>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h3>Sponsors & Rewards</h3>
            <div>
              <label className="block text-sm mb-2">Sponsor Names (comma-separated)</label>
              <Input
                value={formData.sponsors}
                onChange={(e) => setFormData({ ...formData, sponsors: e.target.value })}
                placeholder="e.g., AutoZone, Shell, Michelin"
                className="bg-[#0B1120] border-white/10 text-white"
              />
            </div>
            <div>
              <label className="block text-sm mb-4">Reward Type</label>
              <div className="space-y-3">
                {(['discount', 'freeItem', 'raffle'] as const).map((type) => (
                  <label key={type} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="rewardType"
                      checked={formData.rewardType === type}
                      onChange={() => setFormData({ ...formData, rewardType: type })}
                      className="accent-[#A3E635]"
                    />
                    <span>
                      {type === 'discount' && 'Discount Coupon'}
                      {type === 'freeItem' && 'Free Item'}
                      {type === 'raffle' && 'Raffle Entry'}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <h3>Review & Publish</h3>
            <div className="space-y-4">
              <div className="bg-[#0B1120] border border-white/[0.07] rounded-lg overflow-hidden">
                <div className="aspect-video">
                  <img
                    src={formData.coverImage || pickFallbackEventImage(`${formData.name}-${formData.location}`)}
                    alt="Event card preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="bg-[#0B1120] border border-white/[0.07] rounded-lg p-4">
                <div className="text-sm text-[#6B7280] mb-1">Event Name</div>
                <div className="font-medium">{formData.name || 'Not set'}</div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-[#0B1120] border border-white/[0.07] rounded-lg p-4">
                  <div className="text-sm text-[#6B7280] mb-1">Date & Time</div>
                  <div className="font-medium">
                    {formData.date && formData.time
                      ? `${formData.date} at ${formData.time}`
                      : 'Not set'}
                  </div>
                </div>
                <div className="bg-[#0B1120] border border-white/[0.07] rounded-lg p-4">
                  <div className="text-sm text-[#6B7280] mb-1">Capacity</div>
                  <div className="font-medium">{formData.capacity || 'Not set'}</div>
                </div>
              </div>
              <div className="bg-[#0B1120] border border-white/[0.07] rounded-lg p-4">
                <div className="text-sm text-[#6B7280] mb-1">Location</div>
                <div className="font-medium">{formData.location || 'Not set'}</div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-4 mt-8 pt-6 border-t border-white/[0.07]">
          {step > 1 && (
            <Button
              onClick={prevStep}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/5"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
          )}
          {step < totalSteps ? (
            <Button
              onClick={nextStep}
              className="ml-auto bg-[#A3E635] text-black hover:bg-[#A3E635]/90"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="ml-auto bg-[#A3E635] text-black hover:bg-[#A3E635]/90"
            >
              Publish Event
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
