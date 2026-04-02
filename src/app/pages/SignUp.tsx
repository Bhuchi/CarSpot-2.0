import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    console.log('Signing up with:', formData);
    // Mock signup - in real app would create account
    navigate('/');
  };

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="min-h-screen bg-[#080D1A] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 bg-[#A3E635] rounded-lg flex items-center justify-center">
            <span className="text-black font-bold text-xl">CS</span>
          </div>
          <span className="text-white font-bold text-2xl">CarSpot 2.0</span>
        </div>

        {/* Sign Up Card */}
        <div className="bg-[#0F172A] border border-white/[0.07] rounded-xl p-8">
          <h2 className="mb-2">Create account</h2>
          <p className="text-[#6B7280] mb-8">Join the car enthusiast community</p>

          <form onSubmit={handleSignUp} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm mb-2">
                Username
              </label>
              <Input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) => updateField('username', e.target.value)}
                placeholder="carspotter"
                className="bg-[#0B1120] border-white/10 text-white"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm mb-2">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="you@example.com"
                className="bg-[#0B1120] border-white/10 text-white"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm mb-2">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => updateField('password', e.target.value)}
                placeholder="••••••••"
                className="bg-[#0B1120] border-white/10 text-white"
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm mb-2">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => updateField('confirmPassword', e.target.value)}
                placeholder="••••••••"
                className="bg-[#0B1120] border-white/10 text-white"
                required
              />
            </div>

            <div className="text-sm">
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-[#A3E635] rounded mt-0.5" required />
                <span className="text-[#6B7280]">
                  I agree to the{' '}
                  <a href="#" className="text-[#A3E635] hover:underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-[#A3E635] hover:underline">
                    Privacy Policy
                  </a>
                </span>
              </label>
            </div>

            <Button type="submit" className="w-full bg-[#A3E635] text-black hover:bg-[#A3E635]/90 h-12">
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-[#6B7280]">Already have an account? </span>
            <Link to="/login" className="text-[#A3E635] hover:underline">
              Sign in
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-[#6B7280]">
          © 2026 CarSpot — built with Next.js
        </div>
      </div>
    </div>
  );
}
