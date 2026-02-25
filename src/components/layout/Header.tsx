import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Zap } from 'lucide-react';
import Link from 'next/link';

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur">
            <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white">
                        <Zap className="h-4 w-4" />
                    </div>
                    <span className="text-xl font-semibold tracking-tight text-white">
                        YieldForge
                    </span>
                </Link>
                <div className="flex items-center gap-4">
                    <ConnectButton
                        chainStatus="icon"
                        showBalance={false}
                        accountStatus="avatar"
                    />
                </div>
            </div>
        </header>
    );
}
