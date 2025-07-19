'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { Music } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-[var(--background)]/90 backdrop-blur border-b border-[var(--foreground)]/10">
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-blue-500">
          <Music className="w-6 h-6" />
          TuneFund
        </Link>
      </div>

      <div className="flex items-center gap-8">
        <Link href="/campaign" className="text-[var(--foreground)] hover:text-blue-500 transition-colors">
          Campaigns
        </Link>
        <Link href="/social" className="text-[var(--foreground)] hover:text-blue-500 transition-colors">
          Social
        </Link>
        <Link href="/dashboard" className="text-[var(--foreground)] hover:text-blue-500 transition-colors">
          Dashboard
        </Link>
        <ConnectButton />
      </div>
    </nav>
  );
}