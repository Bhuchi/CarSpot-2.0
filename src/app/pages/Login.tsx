import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Logging in with:', { email, password });
    // Mock login - in real app would authenticate
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#080D1A] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 bg-[#A3E635] rounded-lg flex items-center justify-center">
            <span className="text-black font-bold text-xl">CS</span>
          </div>
          <span className="text-white font-bold text-2xl">CarSpot 2.0</span>
        </div>

        {/* Login Card */}
        <div className="bg-[#0F172A] border border-white/[0.07] rounded-xl p-8">
          <h2 className="mb-2">Welcome back</h2>
          <p className="text-[#6B7280] mb-8">Sign in to your account to continue</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm mb-2">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-[#0B1120] border-white/10 text-white"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-[#A3E635] rounded" />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-[#A3E635] hover:underline">
                Forgot password?
              </a>
            </div>

            <Button type="submit" className="w-full bg-[#A3E635] text-black hover:bg-[#A3E635]/90 h-12">
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-[#6B7280]">Don't have an account? </span>
            <Link to="/signup" className="text-[#A3E635] hover:underline">
              Sign up
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
