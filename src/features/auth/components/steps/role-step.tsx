'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
  CarTaxiFront,
  Languages,
  Megaphone,
  ShieldCheck,
  Store,
  UserRound,
} from 'lucide-react';
import { useRegistration } from '../../hooks/use-registration';
import { useAuth } from '@/hooks/use-auth';
import { navigateAuth } from '@/lib/auth-routing';
import type { User } from '@/core/types';

import { cn } from '@/lib/utils';
const styles = {
  style260_1: "relative min-h-dvh overflow-x-hidden overflow-y-auto bg-[#0B0F19] text-slate-100",
  style262_2: "pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_18%_10%,rgba(20,184,166,0.22),transparent_26%),radial-gradient(circle_at_82%_18%,rgba(45,212,191,0.10),transparent_28%)]",
  style271_3: "fixed top-4 z-40 inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/10 bg-[#161F30]/60 px-4 text-sm font-bold text-slate-100 shadow-2xl backdrop-blur-xl transition-colors duration-300 hover:border-[#14B8A6] hover:shadow-[0_0_20px_rgba(20,184,166,0.15)] focus-visible:border-[#14B8A6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14B8A6]/40 sm:top-6 sm:min-h-12 sm:px-5",
  style272_4: "left-4 sm:left-6",
  style272_5: "right-4 sm:right-6",
  style275_6: "h-4 w-4 text-[#14B8A6]",
  style279_7: "relative z-10 mx-auto flex min-h-dvh w-full max-w-6xl flex-col px-4 pb-20 pt-24 sm:px-6 sm:pb-24 sm:pt-28 lg:px-8 xl:justify-center",
  style280_8: "mx-auto flex max-w-3xl flex-col items-center text-center",
  style281_9: "flex h-14 w-14 items-center justify-center rounded-2xl border border-[#14B8A6]/35 bg-[#14B8A6]/10 text-[#14B8A6] shadow-[0_0_32px_rgba(20,184,166,0.18)] sm:h-16 sm:w-16",
  style282_10: "h-7 w-7",
  style285_11: "mt-6 max-w-3xl text-balance text-4xl font-black leading-tight tracking-normal text-[#F8FAFC] sm:text-5xl lg:text-7xl",
  style289_12: "mt-4 text-lg font-semibold leading-8 text-[#94A3B8] sm:text-xl",
  style328_19: "mx-auto mt-10 grid w-full max-w-6xl grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6",
  style329_20: "lg:grid-cols-4",
  style348_22: "group flex h-full min-h-52 flex-col items-start justify-between gap-4 rounded-3xl border border-white/5 bg-[#161F30]/60 p-5 text-start shadow-2xl backdrop-blur-xl transition-colors duration-300 hover:border-[#14B8A6] hover:shadow-[0_0_20px_rgba(20,184,166,0.15)] focus-visible:border-[#14B8A6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14B8A6]/40 active:border-[#14B8A6] active:shadow-[0_0_20px_rgba(20,184,166,0.15)] sm:min-h-56 sm:p-6",
  style349_23: "text-right",
  style349_24: "text-left",
  style352_25: "flex w-full flex-col items-start gap-4",
  style353_26: "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#14B8A6]/20 bg-[#14B8A6]/10 p-3 text-[#14B8A6] transition-colors duration-300 group-hover:border-[#14B8A6]/55 group-hover:bg-[#14B8A6]/15",
  style354_27: "h-7 w-7",
  style357_28: "block text-xl font-black leading-7 tracking-normal text-slate-100",
  style362_29: "block text-sm font-medium leading-7 text-slate-400 sm:text-[15px]",
  style372_30: "mx-auto mt-8 w-full max-w-6xl rounded-3xl border border-[#14B8A6]/20 bg-[#061414]/70 p-4 shadow-[0_20px_60px_rgba(20,184,166,0.08)] backdrop-blur-xl sm:p-5",
  style373_31: "flex flex-col gap-1",
  style373_32: "text-right",
  style373_33: "text-left",
  style374_34: "text-sm font-black tracking-normal text-[#14B8A6]",
  style377_35: "text-xs font-semibold leading-5 text-[#94A3B8]",
  style382_36: "mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5",
  style390_37: "min-h-24 rounded-2xl border border-white/10 bg-[#0B0F19]/70 p-4 text-left shadow-lg transition hover:border-[#14B8A6]/60 hover:bg-[#102033] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14B8A6]/50",
  style392_38: "block text-sm font-black text-[#F8FAFC]",
  style395_39: "mt-2 block text-xs font-semibold leading-5 text-[#94A3B8]",
} as const;


type Lang = 'ar' | 'en';
type RoleKey = 'rider' | 'driver' | 'advertiser' | 'delegate' | 'admin';

const copy = {
  ar: {
    switchLabel: 'English',
    ariaSwitch: 'تغيير اللغة إلى الإنجليزية',
    title: 'مرحبا بك في الرادار الذكي',
    subtitle: 'اختر نوع حسابك وكمل دخولك بسهولة',
    roles: {
      rider: {
        title: 'راكب',
        description: 'اطلب رحلتك وشوف السائقين القريبين منك، وحافظ على أمان حسابك.',
      },
      driver: {
        title: 'سائق',
        description: 'حدد سعرك، اشحن باقة الساعات، واستقبل الطلبات القريبة منك.',
      },
      advertiser: {
        title: 'معلن',
        description: 'اعمل إعلانات موجهة لمنطقتك، وتابع المشاهدات والنقرات بسهولة.',
      },
      delegate: {
        title: 'مندوب تسويق',
        description: 'سجل السائقين والمحلات، وتابع عمولتك من مكان واحد.',
      },
      admin: {
        title: 'مشرف',
        description: 'ادخل لوحة المتابعة، راجع الحسابات، وتابع حركة النظام بهدوء.',
      },
    },
  },
  en: {
    switchLabel: 'العربية',
    ariaSwitch: 'Switch language to Arabic',
    title: 'Welcome to Smart Radar',
    subtitle: 'Choose your account type and continue securely',
    roles: {
      rider: {
        title: 'Rider',
        description: 'Request your ride, view nearby drivers, and secure your account with a trust score.',
      },
      driver: {
        title: 'Captain',
        description: 'Set your own rates, top up your hourly package, and receive requests silently.',
      },
      advertiser: {
        title: 'Advertiser',
        description: 'Launch hyper-local ads targeted to specific areas and track live metrics.',
      },
      delegate: {
        title: 'Delegate',
        description: 'Onboard drivers and shops in the field, and earn guaranteed commissions.',
      },
      admin: {
        title: 'Admin',
        description: 'Open the control desk, review accounts, and keep system operations calm.',
      },
    },
  },
} as const;

// Admin is intentionally excluded from this grid — the control-desk login is
// only reachable from the separate radar-page landing site, not from the
// public role picker. The route/component behind it (navigateAuth('admin'))
// still exists for that link to work.
const roleConfig: Array<{
  key: RoleKey;
  Icon: typeof UserRound;
}> = [
  { key: 'rider', Icon: UserRound },
  { key: 'driver', Icon: CarTaxiFront },
  { key: 'advertiser', Icon: Megaphone },
  { key: 'delegate', Icon: Store },
];

const demoUsers: Array<{
  role: User['role'];
  label: string;
  description: string;
  user: User;
}> = [
  {
    role: 'rider',
    label: 'Rider demo',
    description: 'Requests, wallet, ride history',
    user: {
      uid: 'demo-rider-001',
      serial_id: 'P-1001',
      phone: '+962790000001',
      role: 'rider',
      name: 'Demo Rider',
      countryId: 1,
      currencyAr: 'د.أ',
      currencyEn: 'JOD',
      governorate: 'عمّان',
      district: 'الجامعة',
      isBufferActive: false,
      rating: 5,
      walletBalanceJD: 42.5,
      ratingSum: 48,
      ratingCount: 10,
      favoriteDrivers: ['demo-driver-001'],
    },
  },
  {
    role: 'driver',
    label: 'Captain demo',
    description: 'Driver radar, pricing, hours',
    user: {
      uid: 'demo-driver-001',
      serial_id: 'D-1001',
      phone: '+962790000002',
      role: 'driver',
      name: 'Demo Captain',
      governorate: 'عمّان',
      district: 'الجامعة',
      status: 'idle',
      isBufferActive: false,
      rating: 4.9,
      rank: 'Gold',
      paidHoursRemaining: 540,
      bonusHoursRemaining: 60,
      subscriptionHours: 10,
      walletBalanceJD: 128,
      vehicle: {
        year: 2023,
        plate: '77-12345',
        make: 'Toyota Corolla Hybrid',
        color: 'White',
      },
      affiliation: {
        type: 'independent',
        name: 'مستقل',
      },
    },
  },
  {
    role: 'advertiser',
    label: 'Advertiser demo',
    description: 'Campaign portal and ad tools',
    user: {
      uid: 'demo-advertiser-001',
      serial_id: 'A-1001',
      phone: '+962790000003',
      role: 'advertiser',
      name: 'Demo Advertiser',
      governorate: 'عمّان',
      district: 'الجامعة',
      isBufferActive: false,
      rating: 5,
      walletBalanceJD: 250,
      companyName: 'Smart Radar Ads',
      commercialRegister: 'CR-88294-A',
      adLicense: 'LIC-990-2026',
      businessType: 'commercial',
    },
  },
  {
    role: 'delegate',
    label: 'Delegate demo',
    description: 'Field onboarding cockpit',
    user: {
      uid: 'demo-delegate-001',
      serial_id: 'M-1001',
      phone: '+962790000004',
      role: 'delegate',
      name: 'Demo Delegate',
      governorate: 'عمّان',
      district: 'وادي السير',
      isBufferActive: false,
      rating: 4.8,
      referralCode: 'RAD-JOR-777',
      referredCount: 142,
      pendingDues: 85.5,
      walletBalanceJD: 85.5,
    },
  },
  {
    role: 'admin',
    label: 'Admin demo',
    description: 'Owner control dashboard',
    user: {
      uid: 'demo-admin-001',
      serial_id: 'S-1001',
      phone: '+962790000005',
      role: 'admin',
      name: 'Demo Admin',
      governorate: 'عمّان',
      district: 'الجامعة',
      isBufferActive: false,
      rating: 5,
    },
  },
];

export function RoleStep() {
  const router = useRouter();
  const { setStep, setRole, setAuthMode, lang, setLang } = useRegistration();
  const { loginAsMockUser } = useAuth();
  const [showDemo, setShowDemo] = useState(false);
  const currentLang = lang as Lang;
  const content = copy[currentLang];
  const isArabic = currentLang === 'ar';

  const handleRoleSelect = (role: RoleKey) => {
    if (role === 'admin') {
      setStep('admin');
      return;
    }
    setRole(role);
    setAuthMode('login');
    setStep('personal');
  };

  const openDemoDashboard = (user: User) => {
    loginAsMockUser(user);
    const roleRoutes: Partial<Record<User['role'], string>> = {
      rider: '/rider',
      driver: '/captain',
      advertiser: '/advertiser/dashboard',
      delegate: '/delegate',
      admin: '/admin',
    };
    const target = roleRoutes[user.role] || '/';
    router.push(target);
  };

  return (
    <main
      dir={isArabic ? 'rtl' : 'ltr'}
      className="relative min-h-dvh overflow-x-hidden overflow-y-auto bg-[#0A0F1D] text-slate-100 flex flex-col justify-between p-4 sm:p-6"
    >
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_20%_15%,rgba(20,184,166,0.18),transparent_40%),radial-gradient(circle_at_80%_85%,rgba(59,130,246,0.12),transparent_45%)]" />

      {/* Language Switcher */}
      <div className="relative z-20 flex justify-between items-center w-full max-w-4xl mx-auto pt-2">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#14B8A6]/30 bg-[#14B8A6]/10 text-[#14B8A6] shadow-[0_0_15px_rgba(20,184,166,0.2)]">
            <ShieldCheck className="h-5 w-5" strokeWidth={2} />
          </div>
          <span className="text-sm font-black tracking-wider text-white">الرادار الذكي</span>
        </div>

        <button
          type="button"
          aria-label={content.ariaSwitch}
          onClick={() => setLang(isArabic ? 'en' : 'ar')}
          className="inline-flex h-9 items-center gap-2 rounded-full border border-white/10 bg-[#161F30]/80 px-3.5 text-xs font-bold text-slate-200 shadow-lg backdrop-blur-md transition hover:border-[#14B8A6] hover:text-white"
        >
          <Languages className="h-3.5 w-3.5 text-[#14B8A6]" />
          <span>{content.switchLabel}</span>
        </button>
      </div>

      {/* Center Container */}
      <section className="relative z-10 mx-auto my-auto flex w-full max-w-4xl flex-col items-center py-6">
        <div className="text-center max-w-xl mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-3">
            {content.title}
          </h1>
          <p className="text-sm sm:text-base font-medium text-[#94A3B8]">
            {content.subtitle}
          </p>
        </div>

        {/* Primary Role Cards: Rider and Captain (Clear, High-Contrast, Direct Action) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
          {/* Captain Card */}
          <div
            onClick={() => handleRoleSelect('driver')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleRoleSelect('driver'); }}
            className="group relative flex flex-col justify-between p-6 rounded-3xl border border-white/10 bg-[#161F30]/80 hover:bg-[#161F30] hover:border-[#14B8A6] shadow-xl backdrop-blur-xl transition-all duration-200 cursor-pointer hover:shadow-[0_0_30px_rgba(20,184,166,0.2)] hover:-translate-y-1 active:scale-[0.98]"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#14B8A6]/30 bg-[#14B8A6]/15 text-[#14B8A6] group-hover:scale-110 transition-transform">
                  <CarTaxiFront className="h-6 w-6" strokeWidth={2} />
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#14B8A6]/10 text-[#14B8A6] border border-[#14B8A6]/20">
                  {isArabic ? 'كابتن معتمد' : 'Captain'}
                </span>
              </div>
              <h2 className="text-2xl font-black text-white mb-2">
                {isArabic ? 'سائق (كابتن)' : 'Captain / Driver'}
              </h2>
              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed mb-6">
                {content.roles.driver.description}
              </p>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRoleSelect('driver');
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#0D9488] to-[#14B8A6] text-white font-black text-sm shadow-lg hover:brightness-110 transition cursor-pointer"
            >
              {isArabic ? 'دخول الكابتن ←' : 'Captain Login →'}
            </button>
          </div>

          {/* Rider Card */}
          <div
            onClick={() => handleRoleSelect('rider')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleRoleSelect('rider'); }}
            className="group relative flex flex-col justify-between p-6 rounded-3xl border border-white/10 bg-[#161F30]/80 hover:bg-[#161F30] hover:border-[#3B82F6] shadow-xl backdrop-blur-xl transition-all duration-200 cursor-pointer hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] hover:-translate-y-1 active:scale-[0.98]"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#3B82F6]/30 bg-[#3B82F6]/15 text-[#3B82F6] group-hover:scale-110 transition-transform">
                  <UserRound className="h-6 w-6" strokeWidth={2} />
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/20">
                  {isArabic ? 'طلب رحلات' : 'Rider'}
                </span>
              </div>
              <h2 className="text-2xl font-black text-white mb-2">
                {isArabic ? 'راكب' : 'Rider'}
              </h2>
              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed mb-6">
                {content.roles.rider.description}
              </p>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRoleSelect('rider');
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white font-black text-sm shadow-lg hover:brightness-110 transition cursor-pointer"
            >
              {isArabic ? 'دخول الراكب ←' : 'Rider Login →'}
            </button>
          </div>
        </div>

        {/* Secondary Compact Roles (Advertiser / Delegate / Admin) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          <button
            type="button"
            onClick={() => handleRoleSelect('advertiser')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-[#161F30]/60 hover:bg-[#161F30] hover:border-[#14B8A6]/50 text-xs font-bold text-slate-300 hover:text-white transition cursor-pointer active:scale-95"
          >
            <Megaphone className="h-3.5 w-3.5 text-amber-400" />
            <span>{isArabic ? 'بوابة المعلنين' : 'Advertiser Portal'}</span>
          </button>

          <button
            type="button"
            onClick={() => handleRoleSelect('delegate')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-[#161F30]/60 hover:bg-[#161F30] hover:border-[#14B8A6]/50 text-xs font-bold text-slate-300 hover:text-white transition cursor-pointer active:scale-95"
          >
            <Store className="h-3.5 w-3.5 text-emerald-400" />
            <span>{isArabic ? 'مندوب التسويق' : 'Marketing Delegate'}</span>
          </button>

          <button
            type="button"
            onClick={() => handleRoleSelect('admin')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-[#161F30]/60 hover:bg-[#161F30] hover:border-destructive/50 text-xs font-bold text-slate-400 hover:text-white transition cursor-pointer active:scale-95"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-rose-400" />
            <span>{isArabic ? 'لوحة الإدارة' : 'Admin'}</span>
          </button>
        </div>
      </section>

      {/* Discreet Collapsible Demo Mode (No Visual Clutter) */}
      <footer className="relative z-10 w-full max-w-2xl mx-auto pt-2 pb-1 text-center">
        <button
          type="button"
          onClick={() => setShowDemo(!showDemo)}
          className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#94A3B8]/70 hover:text-[#14B8A6] transition py-1 px-3 rounded-full hover:bg-white/5 cursor-pointer"
        >
          <span>⚡ {isArabic ? 'تجربة سريعة بدون تسجيل (Demo)' : 'Quick Demo Access'}</span>
          <span className="text-[9px]">{showDemo ? '▲' : '▼'}</span>
        </button>

        {showDemo && (
          <div className="mt-3 p-3 rounded-2xl border border-white/10 bg-[#0B1322]/95 shadow-xl backdrop-blur-xl animate-in fade-in duration-200">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {demoUsers.map((demo) => (
                <button
                  key={demo.role}
                  type="button"
                  onClick={() => openDemoDashboard(demo.user)}
                  className="py-2.5 px-2 rounded-xl border border-white/10 bg-[#161F30] hover:bg-[#14B8A6]/20 hover:border-[#14B8A6] text-center text-xs font-bold text-white transition active:scale-95 cursor-pointer"
                >
                  <span className="block text-[11px] truncate">{demo.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </footer>
    </main>
  );
}
