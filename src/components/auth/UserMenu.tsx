import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { User, LogOut, Settings, BarChart } from 'lucide-react';
import { AuthModal } from './AuthModal';

export function UserMenu() {
  const { user, profile, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!user) {
    return (
      <>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setAuthMode('login');
              setShowAuthModal(true);
            }}
          >
            Sign In
          </Button>
          <Button
            size="sm"
            className="bg-teal-600 hover:bg-teal-700"
            onClick={() => {
              setAuthMode('signup');
              setShowAuthModal(true);
            }}
          >
            Sign Up
          </Button>
        </div>
        <AuthModal
          open={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          defaultMode={authMode}
        />
      </>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <User className="w-4 h-4" />
          <span className="hidden sm:inline">{profile?.fullName || 'Account'}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 glass-card border-white/10">
        <DropdownMenuLabel>
          <div>
            <p className="font-medium text-white">{profile?.fullName || 'User'}</p>
            <p className="text-xs text-gray-400">{user.email}</p>
            <p className="text-xs text-teal-400 mt-1 capitalize">{profile?.tier} Plan</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuItem className="cursor-pointer">
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <BarChart className="w-4 h-4 mr-2" />
          Usage & Analytics
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-400">
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
