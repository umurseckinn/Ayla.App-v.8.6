"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Settings, User, X, ChevronDown, ChevronLeft, Save, AlertTriangle, LogOut, Shield, ChevronRight, FileText, RefreshCw } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { useProfile } from "@/hooks/useProfile";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BirthTimeSlider } from "@/components/ui/astrology-inputs/BirthTimeSlider";
import { CitySelector } from "@/components/ui/CitySelector";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { safeLocalStorage } from "@/lib/safe-utils";

type SettingsView = "main" | "profile" | "legal" | "privacy" | "kvkk";

export function SettingsDialog() {
    const { language, setLanguage, t } = useLanguage();
    const [isOpen, setIsOpen] = React.useState(false);
    const { profile, updateProfile, setSubscriptionStatus, subscriptionStatus } = useProfile();
    const [currentView, setCurrentView] = useState<SettingsView>("main");
    const [showResetConfirm, setShowResetConfirm] = useState(false);

    // Edit state
    const [editName, setEditName] = useState("");
    const [editDate, setEditDate] = useState("");
    const [editTime, setEditTime] = useState("");
    const [editLocation, setEditLocation] = useState("");

    // Initialize edit form when opening edit mode
    const handleStartEdit = () => {
        if (profile) {
            setEditName(profile.full_name || profile.name || "");
            setEditDate(profile.birth_date?.split('T')[0] || profile.birthDate?.split('T')[0] || "");
            setEditTime(profile.birth_time || profile.birthTime || "");
            setEditLocation(profile.birth_place || profile.birthPlace || "");
        }
        setCurrentView("profile");
    };

    const handleSave = async () => {
        if (!editName.trim()) {
            toast.error(t('nameRequired'));
            return;
        }

        if (!editDate || !editTime || !editLocation) {
            toast.error(t('allFieldsRequired'));
            return;
        }

        await updateProfile({
            name: editName,
            full_name: editName,
            birthDate: editDate,
            birth_date: editDate,
            birthTime: editTime,
            birth_time: editTime,
            birthPlace: editLocation,
            birth_place: editLocation
        });

        toast.success(t('saveSuccess'));
        setCurrentView("main");
    };

    const handleReset = () => {
        try {
            // Backup persistent data
            const persistentData = localStorage.getItem("ayla_persistent_store");
            
            safeLocalStorage.clear();
            sessionStorage.clear();
            
            // Restore persistent data
            if (persistentData) {
                localStorage.setItem("ayla_persistent_store", persistentData);
            }
            
            window.location.reload();
        } catch (e) {
            console.error("Reset error:", e);
            window.location.reload();
        }
    };

    const handleClose = () => {
        setIsOpen(false);
        setCurrentView("main");
        setShowResetConfirm(false);
    };

    const getTitle = () => {
        if (showResetConfirm) return t('confirmResetTitle');
        switch (currentView) {
            case "profile": return t('profile');
            case "legal": return t('legal');
            case "privacy": return t('privacyPolicy');
            case "kvkk": return t('kvkk');
            default: return t('settingsTitle');
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-mystic-gold/70 hover:text-mystic-gold hover:bg-mystic-gold/10 transition-colors"
                >
                    <Settings className="w-6 h-6" />
                </Button>
            </DialogTrigger>
            <DialogContent showCloseButton={false} className="max-w-md w-[90%] bg-black/80 backdrop-blur-xl border border-mystic-gold/20 text-mystic-gold p-0 overflow-hidden shadow-[0_0_50px_rgba(255,215,0,0.1)] rounded-[2rem]">
                <div className="flex flex-col h-[75vh] max-h-[650px]">
                    {/* Header */}
                    <div className="p-6 pb-4 flex items-center justify-between z-10 bg-gradient-to-b from-white/5 to-transparent border-b border-white/5">
                        <div className="flex items-center gap-2">
                            {(currentView !== "main" || showResetConfirm) && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => {
                                        if (showResetConfirm) {
                                            setShowResetConfirm(false);
                                        } else if (currentView === "privacy" || currentView === "kvkk") {
                                            setCurrentView("legal");
                                        } else {
                                            setCurrentView("main");
                                        }
                                    }}
                                    className="h-8 w-8 -ml-2 rounded-full hover:bg-white/10 text-mystic-gold"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </Button>
                            )}
                            <h2 className="text-xl font-mystic text-mystic-gold drop-shadow-[0_0_10px_rgba(255,215,0,0.3)] tracking-widest uppercase">
                                {getTitle()}
                            </h2>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleClose}
                            className="rounded-full hover:bg-white/10 w-8 h-8 text-white/50 hover:text-white"
                        >
                            <X className="w-5 h-5" />
                        </Button>
                    </div>

                    <div className="flex-1 overflow-hidden relative">
                        <AnimatePresence mode="wait">
                            {showResetConfirm ? (
                                <ResetConfirmContent
                                    key="reset"
                                    t={t}
                                    language={language}
                                    onConfirm={handleReset}
                                    onCancel={() => setShowResetConfirm(false)}
                                />
                            ) : currentView === "main" ? (
                                <MainMenuContent
                                    key="main"
                                    t={t}
                                    language={language}
                                    setLanguage={setLanguage}
                                    profile={profile}
                                    onEditProfile={handleStartEdit}
                                    onLegal={() => setCurrentView("legal")}
                                    onReset={() => setShowResetConfirm(true)}
                                    setSubscriptionStatus={setSubscriptionStatus}
                                    subscriptionStatus={subscriptionStatus}
                                />
                            ) : currentView === "profile" ? (
                                <EditProfileContent
                                    key="profile"
                                    t={t}
                                    language={language}
                                    editName={editName}
                                    setEditName={setEditName}
                                    editDate={editDate}
                                    setEditDate={setEditDate}
                                    editTime={editTime}
                                    setEditTime={setEditTime}
                                    editLocation={editLocation}
                                    setEditLocation={setEditLocation}
                                    onSave={handleSave}
                                />
                            ) : currentView === "legal" ? (
                                <LegalMenuContent
                                    key="legal"
                                    t={t}
                                    onPrivacy={() => setCurrentView("privacy")}
                                    onKvkk={() => setCurrentView("kvkk")}
                                />
                            ) : (
                                <TextContent
                                    key="text"
                                    content={currentView === "privacy" ? t('privacyContent') : t('kvkkContent')}
                                />
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

// --- Sub-components ---

function MainMenuContent({ t, language, setLanguage, profile, onEditProfile, onLegal, onReset, setSubscriptionStatus, subscriptionStatus }: any) {
    const handleRestorePurchase = async () => {
        await setSubscriptionStatus('premium');
        toast.success(language === 'en' ? 'Purchases restored successfully' : 'Satın alımlar başarıyla geri yüklendi');
    };

    const handleCancelPremium = async () => {
        if (subscriptionStatus !== 'premium') {
            toast.error(language === 'en' ? 'You do not have a premium membership' : 'Premium üyeliğiniz bulunmamaktadır');
            return;
        }
        await setSubscriptionStatus('free');
        toast.success(language === 'en' ? 'Premium membership cancelled' : 'Premium üyelik iptal edildi');
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col h-full overflow-y-auto p-6 space-y-8 scrollbar-none"
        >
            {/* Profile Section */}
            <Section title={t('profileDesc')}>
                <div className="p-1 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 overflow-hidden group">
                    <div className="flex items-center gap-4 p-5 pb-3">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-mystic-gold/20 to-amber-500/20 flex items-center justify-center text-mystic-gold ring-1 ring-white/20 shadow-inner">
                            <User className="w-7 h-7" />
                        </div>
                        <div>
                            <h3 className="font-mystic text-xl text-white group-hover:text-mystic-gold transition-colors">{profile?.full_name || profile?.name || t('profileDesc')}</h3>
                            <p className="text-xs text-white/40 font-serif italic space-x-2">
                                <span>{profile?.birth_date ? new Date(profile.birth_date).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US') : ''}</span>
                                <span>•</span>
                                <span>{profile?.is_birth_time_unknown ? (language === 'tr' ? 'Saat: Bilinmiyor' : 'Time: Unknown') : (profile?.birth_time || '')}</span>
                            </p>
                        </div>
                    </div>
                    <Button
                        onClick={onEditProfile}
                        className="w-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white justify-between h-12 rounded-2xl border-t border-white/5"
                        variant="ghost"
                    >
                        <span className="pl-2">{t('profile')}</span>
                        <Settings className="w-4 h-4 opacity-50" />
                    </Button>
                </div>
            </Section>

            {/* Language Section */}
            <Section title={t('language')}>
                <div className="p-1.5 rounded-2xl bg-black/40 border border-white/10 grid grid-cols-2 gap-1 backdrop-blur-sm">
                    <Button
                        variant="ghost"
                        onClick={() => setLanguage('tr')}
                        className={`h-11 rounded-xl transition-all font-medium ${language === 'tr' ? 'bg-mystic-gold text-black shadow-lg shadow-amber-500/20' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                    >
                        <span className="mr-2">🇹🇷</span> Türkçe
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={() => setLanguage('en')}
                        className={`h-11 rounded-xl transition-all font-medium ${language === 'en' ? 'bg-mystic-gold text-black shadow-lg shadow-amber-500/20' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                    >
                        <span className="mr-2">🇬🇧</span> English
                    </Button>
                </div>
            </Section>

            {/* Legal Section */}
            <Section title={t('legal')}>
                <Button
                    variant="ghost"
                    onClick={onLegal}
                    className="w-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white justify-between h-14 rounded-2xl px-4 border border-white/5"
                >
                    <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-mystic-gold/70" />
                        <div className="flex flex-col items-start">
                            <span className="font-medium">{t('legal')}</span>
                            <span className="text-[10px] text-white/40">{t('legalDesc')}</span>
                        </div>
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                </Button>
            </Section>

            {/* FAQ Section */}
            <Section title={t('help')}>
                <FAQItem question="Ayla?" answer={t('introDesc')} />
            </Section>

            {/* Account Actions */}
            <div className="space-y-3 pt-2 pb-6">
                {/* Restore Purchase */}
                <Button
                    variant="ghost"
                    onClick={handleRestorePurchase}
                    className="w-full bg-black hover:bg-black/90 text-[#D4AF37] justify-start h-14 rounded-2xl px-4 group border border-transparent hover:border-[#D4AF37]/20 transition-all"
                >
                    <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                        <RefreshCw className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                        <span className="block font-medium">{language === 'en' ? 'Restore Purchase' : 'Satın Almayı Geri Yükle'}</span>
                    </div>
                </Button>

                {/* Reset Profile */}
                <Button
                    variant="ghost"
                    onClick={onReset}
                    className="w-full text-rose-500 hover:text-rose-400 hover:bg-rose-500/10 justify-start h-14 rounded-2xl px-4 group border border-transparent hover:border-rose-500/20 transition-all"
                >
                    <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                        <LogOut className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                        <span className="block font-medium">{t('resetProfile')}</span>
                        <span className="text-[10px] text-rose-500/60 opacity-60">
                            {t('confirmResetMessage')}
                        </span>
                    </div>
                </Button>

                {/* Cancel Premium */}
                <Button
                    variant="ghost"
                    onClick={handleCancelPremium}
                    className="w-full bg-black hover:bg-black/90 text-red-600 justify-start h-14 rounded-2xl px-4 group border border-transparent hover:border-red-600/20 transition-all"
                >
                    <div className="w-10 h-10 rounded-full bg-red-600/10 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                        <X className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                        <span className="block font-medium">{language === 'en' ? 'Cancel Premium Membership' : 'Premium Üyeliğini İptal Et'}</span>
                    </div>
                </Button>
            </div>
        </motion.div>
    );
}

function EditProfileContent({ t, language, editName, setEditName, editDate, setEditDate, editTime, setEditTime, editLocation, setEditLocation, onSave }: any) {
    const [dateInputType, setDateInputType] = useState('text');

    const getFormattedDate = (dateStr: string) => {
        if (!dateStr) return "";
        const [year, month, day] = dateStr.split('-');
        if (!year || !month || !day) return dateStr;
        return language === 'tr' 
            ? `${day}.${month}.${year}` 
            : `${month}/${day}/${year}`;
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col h-full p-6 space-y-6 overflow-y-auto scrollbar-none"
        >
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label className="text-white/70 text-xs uppercase tracking-wider">{t('name')}</Label>
                    <Input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="bg-white/5 border-white/10 text-white focus:border-mystic-gold/50 h-12 rounded-xl"
                        placeholder={t('namePlaceholder')}
                    />
                </div>
                <div className="space-y-2">
                    <Label className="text-white/70 text-xs uppercase tracking-wider">{t('birthDate')}</Label>
                    <Input
                        type={dateInputType}
                        value={dateInputType === 'date' ? editDate : getFormattedDate(editDate)}
                        onChange={(e) => setEditDate(e.target.value)}
                        onFocus={() => setDateInputType('date')}
                        onBlur={() => setDateInputType('text')}
                        className="bg-white/5 border-white/10 text-white focus:border-mystic-gold/50 h-12 rounded-xl"
                        placeholder={language === 'tr' ? 'GG.AA.YYYY' : 'MM/DD/YYYY'}
                    />
                </div>
                <div className="space-y-2">
                    <Label className="text-white/70 text-xs uppercase tracking-wider">{t('birthTime')}</Label>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                        <BirthTimeSlider
                            value={editTime}
                            onChange={setEditTime}
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label className="text-white/70 text-xs uppercase tracking-wider">{t('birthCity')}</Label>
                    <CitySelector
                        value={editLocation}
                        onChange={setEditLocation}
                        placeholder={t('searchLocation')}
                    />
                </div>
            </div>

            <Button
                onClick={onSave}
                className="w-full bg-mystic-gold text-black hover:bg-mystic-gold/90 h-12 rounded-xl font-bold tracking-wide shadow-[0_0_20px_rgba(255,215,0,0.2)] mt-auto"
            >
                <Save className="w-4 h-4 mr-2" />
                {t('save')}
            </Button>
        </motion.div>
    );
}

function LegalMenuContent({ t, onPrivacy, onKvkk }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col h-full p-6 space-y-4 overflow-y-auto scrollbar-none"
        >
            <Button
                variant="ghost"
                onClick={onPrivacy}
                className="w-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white justify-between h-16 rounded-2xl px-4 border border-white/5 group"
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-mystic-gold/10 flex items-center justify-center text-mystic-gold group-hover:scale-110 transition-transform">
                        <Shield className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-lg">{t('privacyPolicy')}</span>
                </div>
                <ChevronRight className="w-5 h-5 opacity-50" />
            </Button>

            <Button
                variant="ghost"
                onClick={onKvkk}
                className="w-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white justify-between h-16 rounded-2xl px-4 border border-white/5 group"
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-mystic-gold/10 flex items-center justify-center text-mystic-gold group-hover:scale-110 transition-transform">
                        <FileText className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-lg">{t('kvkk')}</span>
                </div>
                <ChevronRight className="w-5 h-5 opacity-50" />
            </Button>
        </motion.div>
    );
}

function TextContent({ content }: { content: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="h-full p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-mystic-gold/20 hover:scrollbar-thumb-mystic-gold/40 scrollbar-track-transparent pr-2"
        >
            <div className="prose prose-invert prose-sm max-w-none text-white/80 whitespace-pre-line">
                {content}
            </div>
        </motion.div>
    );
}

function ResetConfirmContent({ t, language, onConfirm, onCancel }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center h-full space-y-6 text-center p-6"
        >
            <div className="w-24 h-24 rounded-full bg-rose-500/10 flex items-center justify-center border border-rose-500/20 shadow-[0_0_40px_rgba(225,29,72,0.3)] animate-pulse">
                <AlertTriangle className="w-12 h-12 text-rose-500" />
            </div>
            <div className="space-y-3">
                <h3 className="text-xl font-bold text-white">
                    {language === 'en' ? 'Attention!' : 'Dikkat!'}
                </h3>
                <p className="text-white/60 text-sm max-w-[260px] mx-auto leading-relaxed">
                    {language === 'en' 
                        ? 'Warning: If you reset your profile, your premium membership will not be available in the new profile.' 
                        : 'Premium üyeliğiniz profilinizi sıfırladığınız takdirde yeni açtığınız profilde olmayacaktır.'}
                </p>
            </div>
            <div className="flex flex-col gap-3 w-full max-w-[260px] pt-4">
                <Button
                    onClick={onConfirm}
                    className="w-full bg-rose-600 hover:bg-rose-700 text-white h-12 rounded-xl shadow-[0_0_20px_rgba(225,29,72,0.4)] transition-all transform hover:scale-105"
                >
                    {language === 'en' ? 'Continue' : 'Devam Et'}
                </Button>
                <Button
                    variant="ghost"
                    onClick={onCancel}
                    className="w-full hover:bg-white/5 text-white/50 hover:text-white h-12 rounded-xl"
                >
                    {language === 'en' ? 'Go Back' : 'Geri Dön'}
                </Button>
            </div>
        </motion.div>
    );
}

function Section({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div className="space-y-3">
            <h3 className="text-xs font-bold text-white/30 uppercase tracking-[0.2em] pl-2">{title}</h3>
            {children}
        </div>
    );
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div
            className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 ${isOpen ? 'bg-white/10 border-mystic-gold/30 shadow-[0_0_20px_rgba(255,215,0,0.05)]' : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'}`}
            onClick={() => setIsOpen(!isOpen)}
        >
            <div className="flex items-center justify-between">
                <h4 className={`font-mystic text-sm sm:text-base transition-colors ${isOpen ? 'text-mystic-gold' : 'text-white/80'}`}>{question}</h4>
                <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-mystic-gold' : 'text-white/30'}`}>
                    <ChevronDown className="w-4 h-4" />
                </div>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <p className="text-xs sm:text-sm text-white/60 leading-relaxed pt-3 mt-1 border-t border-white/5">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
