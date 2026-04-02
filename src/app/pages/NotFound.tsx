import { Link } from 'react-router';
import { Home } from 'lucide-react';
import { Button } from '../components/ui/button';

export function NotFound() {
  return (
    <div className="min-h-screen bg-[#080D1A] flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#A3E635] mb-4">404</h1>
        <h2 className="mb-4">Page Not Found</h2>
        <p className="text-[#6B7280] mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button className="bg-[#A3E635] text-black hover:bg-[#A3E635]/90">
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
