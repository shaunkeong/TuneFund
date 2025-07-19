'use client';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { anvil, sepolia, mainnet } from 'wagmi/chains';

export default getDefaultConfig({
  appName: 'tunefund',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  chains: [mainnet, sepolia, anvil],
  ssr: false,
});

