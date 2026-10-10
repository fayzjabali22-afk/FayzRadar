'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/contract';
import LoginPage from '@/features/auth/components/login-page';
import { useTranslations } from "next-intl";

const styles = {
  loadingRoot: 'flex h-dvh w-screen select-none flex-col items-center justify-center bg-[#0A0F1D] text-white/90',
  loadingIconFrame: 'flex h-14 w-14 items-center justify-center rounded-2xl border border-[#14B8A6]/30 bg-[#14B8A6]/10 shadow-[0_0_30px_rgba(20,184,166,0.18)]',
  loadingIcon: 'h-5 w-5 animate-spin rounded-full border-2 border-[#14B8A6]/25 border-t-[#14B8A6]',
  loadingTitle: 'mt-5 animate-pulse text-xl font-black tracking-normal',
  loadingBody: 'mt-2 text-xs font-bold text-[#94A3B8]',
  fallback: 'flex h-dvh w-screen flex-col items-center justify-center bg-[#0A0F1D] p-6 text-center text-white',
  fallbackContent: 'max-w-md space-y-4',
  fallbackTitle: 'text-xl font-bold',
  fallbackRole: 'text-xs text-gray-400',
  fallbackWarning: 'text-xs text-red-400',
} as const;

export default function HomePage() {
  const tAuto = useTranslations('auto');
  const { loading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading || !user) return;
    const role = (user.role || '').toLowerCase();
    if (role === 'driver' || role === 'captain') {
      router.replace('/captain');
    } else if (role === 'rider' || role === 'passenger') {
      router.replace('/rider');
    } else if (role === 'admin') {
      router.replace('/admin');
    } else if (role === 'delegate') {
      router.replace('/delegate');
    } else if (role === 'advertiser') {
      router.replace('/advertiser/dashboard');
    }
  }, [loading, router, user]);

  if (loading) {
    return (
      <div className={styles.loadingRoot}>
        <div className={styles.loadingIconFrame}><div className={styles.loadingIcon} /></div>
        <div className={styles.loadingTitle}>{tAuto('key_74d1106b')}</div>
        <div className={styles.loadingBody}>{tAuto('key_7588d11e')}</div>
      </div>
    );
  }

  if (!user) return <LoginPage />;

  return (
    <div className={styles.fallback}>
      <div className={styles.fallbackContent}>
        <h1 className={styles.fallbackTitle}>{tAuto('key_aa12bda7')} {user.name}</h1>
        <p className={styles.fallbackRole}>{tAuto('key_ccda32d9')} {user.role}</p>
        <p className={styles.fallbackWarning}>{tAuto('key_8160066f')}</p>
      </div>
    </div>
  );
}
