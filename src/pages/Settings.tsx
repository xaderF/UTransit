import { type FormEvent, useEffect, useState } from "react";
import { SlidersHorizontal, UserRound } from "lucide-react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useCurrentUser } from "@/hooks/use-api";
import {
  applyTextSizeMode,
  applyThemeMode,
  loadAccountDraft,
  loadTextSizeMode,
  loadThemeMode,
  saveAccountDraft,
  saveTextSizeMode,
  saveThemeMode,
  type TextSizeMode,
  type ThemeMode,
} from "@/lib/user-preferences";

const inputClass =
  "w-full border border-input rounded-sm px-3 py-2 text-sm text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-ring";
const labelClass = "block text-sm font-semibold text-foreground mb-1";
type SettingsPanel = "general" | "account";

const Settings = () => {
  const { data: user, isLoading: userLoading } = useCurrentUser();

  const [themeMode, setThemeMode] = useState<ThemeMode>(() => loadThemeMode());
  const [textSizeMode, setTextSizeMode] = useState<TextSizeMode>(() => loadTextSizeMode());

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [utorid, setUtorid] = useState("");
  const [accountSaved, setAccountSaved] = useState("");
  const [accountInitDone, setAccountInitDone] = useState(false);
  const [activePanel, setActivePanel] = useState<SettingsPanel>("general");

  useEffect(() => {
    const syncPanelFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash === "account" || hash === "general") {
        setActivePanel(hash);
      }
    };

    syncPanelFromHash();
    window.addEventListener("hashchange", syncPanelFromHash);
    return () => window.removeEventListener("hashchange", syncPanelFromHash);
  }, []);

  useEffect(() => {
    applyThemeMode(themeMode);
    saveThemeMode(themeMode);
  }, [themeMode]);

  useEffect(() => {
    applyTextSizeMode(textSizeMode);
    saveTextSizeMode(textSizeMode);
  }, [textSizeMode]);

  useEffect(() => {
    if (accountInitDone || userLoading) return;

    const draft = loadAccountDraft();
    const fallbackEmail = user?.email ?? "";

    setFullName(draft.fullName ?? user?.full_name ?? "");
    setEmail(draft.email ?? fallbackEmail);
    setStudentId(draft.studentId ?? user?.student_id ?? "");
    setUtorid(draft.utorid ?? (fallbackEmail.includes("@") ? fallbackEmail.split("@")[0] : ""));
    setAccountInitDone(true);
  }, [accountInitDone, userLoading, user]);

  const saveAccount = (e: FormEvent) => {
    e.preventDefault();

    saveAccountDraft({
      fullName: fullName.trim(),
      email: email.trim(),
      studentId: studentId.trim(),
      utorid: utorid.trim(),
    });

    setAccountSaved("Account preferences saved. Profile now reflects these values.");
  };

  const selectPanel = (panel: SettingsPanel) => {
    setActivePanel(panel);
    window.history.replaceState(null, "", `#${panel}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-10">
        <div className="max-w-[1080px] mx-auto px-4">
          <h1 className="text-3xl font-bold text-foreground mb-4">Settings</h1>

          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
            <aside className="border border-border rounded-sm bg-card p-4 h-fit">
              <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold mb-3">Preferences</p>
              <div className="space-y-1 mb-4">
                <button
                  type="button"
                  onClick={() => selectPanel("general")}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-sm text-left text-sm font-medium transition-colors ${
                    activePanel === "general" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <SlidersHorizontal size={16} />
                  General
                </button>
              </div>

              <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold mb-3">Account</p>
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => selectPanel("account")}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-sm text-left text-sm font-medium transition-colors ${
                    activePanel === "account" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <UserRound size={16} />
                  Account info
                </button>
              </div>
            </aside>

            <section className="border border-border rounded-sm bg-card p-6" id={activePanel}>
              {activePanel === "general" ? (
                <>
                  <h2 className="text-xl font-bold text-foreground mb-4">General</h2>

                  <div className="mb-5">
                    <p className="text-sm font-semibold text-foreground mb-2">Appearance mode</p>
                    <div className="flex flex-wrap gap-2">
                      {(["light", "dark"] as ThemeMode[]).map((mode) => (
                        <button
                          key={mode}
                          type="button"
                          onClick={() => setThemeMode(mode)}
                          className={`px-3 py-1.5 rounded-sm border text-sm font-medium transition-colors ${
                            themeMode === mode
                              ? "bg-primary text-primary-foreground border-primary"
                              : "border-border text-foreground hover:bg-muted"
                          }`}
                        >
                          {mode[0].toUpperCase() + mode.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-foreground mb-2">Text size</p>
                    <div className="flex flex-wrap gap-2">
                      {(["small", "medium", "large"] as TextSizeMode[]).map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setTextSizeMode(size)}
                          className={`px-3 py-1.5 rounded-sm border text-sm font-medium transition-colors ${
                            textSizeMode === size
                              ? "bg-primary text-primary-foreground border-primary"
                              : "border-border text-foreground hover:bg-muted"
                          }`}
                        >
                          {size[0].toUpperCase() + size.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-foreground mb-1">Account</h2>
                  <p className="text-sm text-muted-foreground mb-4">Update profile fields used by the app.</p>

                  <form onSubmit={saveAccount} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Full name</label>
                      <input className={inputClass} value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Jane Doe" />
                    </div>

                    <div>
                      <label className={labelClass}>Student email</label>
                      <input
                        className={inputClass}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@mail.utoronto.ca"
                        type="email"
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Student ID</label>
                      <input className={inputClass} value={studentId} onChange={(e) => setStudentId(e.target.value)} placeholder="1001234567" />
                    </div>

                    <div>
                      <label className={labelClass}>UTORid</label>
                      <input className={inputClass} value={utorid} onChange={(e) => setUtorid(e.target.value)} placeholder="yourutorid" />
                    </div>

                    <div className="md:col-span-2 flex items-center gap-3 mt-1">
                      <button
                        type="submit"
                        className="bg-secondary text-secondary-foreground font-semibold px-6 py-2.5 rounded-sm text-sm hover:opacity-90 transition-opacity"
                      >
                        Save account info
                      </button>
                      {accountSaved && <p className="text-sm text-muted-foreground">{accountSaved}</p>}
                    </div>
                  </form>

                  {!user && !userLoading && (
                    <p className="text-sm text-muted-foreground mt-4">Sign in to sync these values with your backend account in a later update.</p>
                  )}
                </>
              )}
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Settings;
