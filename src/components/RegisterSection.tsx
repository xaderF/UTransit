import { useState } from "react";

import iconAutoload from "@/assets/icon-autoload.png";
import iconPayment from "@/assets/icon-payment.png";
import iconProtect from "@/assets/icon-protect.png";
import Stepper, { Step } from "@/components/Stepper";

const inputClassName =
  "w-full border border-input rounded-sm px-3 py-2 text-sm text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-ring";

const RegisterSection = () => {
  const [name, setName] = useState("");
  const [uoftEmail, setUoftEmail] = useState("");
  const [utorid, setUtorid] = useState("");
  const [tcardNumber, setTcardNumber] = useState("");
  const [tbucksEnabled, setTbucksEnabled] = useState(false);
  const [stepCompleted, setStepCompleted] = useState(false);

  return (
    <section className="bg-background py-10">
      <div className="max-w-[1080px] mx-auto px-4">
        <h2 className="text-2xl font-bold text-foreground mb-8">Register your UTransit account</h2>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center">
                <img src={iconProtect} alt="Secure account" className="w-24 h-24 mx-auto mb-3 object-contain" />
                <p className="text-sm text-foreground">Protect your transit wallet and linked student profile.</p>
              </div>
              <div className="text-center">
                <img src={iconPayment} alt="Wallet and passes" className="w-24 h-24 mx-auto mb-3 object-contain" />
                <p className="text-sm text-foreground">Manage TBucks-style wallet, passes, and ticket payments in one place.</p>
              </div>
              <div className="text-center">
                <img src={iconAutoload} alt="Auto load" className="w-24 h-24 mx-auto mb-3 object-contain" />
                <p className="text-sm text-foreground">Set up auto-reload and account links for a faster ride experience.</p>
              </div>
            </div>
          </div>

          <div className="lg:w-[420px] border border-border rounded-sm p-6 bg-background" id="sign-in">
            <h3 className="text-lg font-bold text-foreground mb-2">UofT Student Setup</h3>
            <p className="text-sm text-muted-foreground mb-4">Complete all 4 steps to connect your student transit profile.</p>

            <Stepper
              initialStep={1}
              onStepChange={() => setStepCompleted(false)}
              onFinalStepCompleted={() => setStepCompleted(true)}
              backButtonText="Previous"
              nextButtonText="Next"
            >
              <Step>
                <h4 className="text-base font-semibold text-foreground">Step 1: Student details</h4>
                <p className="text-sm text-muted-foreground">Enter your basic profile information.</p>

                <input
                  className={inputClassName}
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  className={inputClassName}
                  placeholder="UofT email (example@mail.utoronto.ca)"
                  value={uoftEmail}
                  onChange={(e) => setUoftEmail(e.target.value)}
                />
              </Step>

              <Step>
                <h4 className="text-base font-semibold text-foreground">Step 2: Connect UofT account</h4>
                <p className="text-sm text-muted-foreground">Placeholder for UofT SSO/account verification.</p>

                <input
                  className={inputClassName}
                  placeholder="UTORid"
                  value={utorid}
                  onChange={(e) => setUtorid(e.target.value)}
                />
                <select className={inputClassName} defaultValue="uoft-sso">
                  <option value="uoft-sso">Connect with UofT SSO</option>
                  <option value="manual">Manual verification (placeholder)</option>
                </select>
              </Step>

              <Step>
                <h4 className="text-base font-semibold text-foreground">Step 3: Connect TCard/TBucks</h4>
                <p className="text-sm text-muted-foreground">Placeholder for TCard and TBucks linking flow.</p>

                <input
                  className={inputClassName}
                  placeholder="TCard number"
                  value={tcardNumber}
                  onChange={(e) => setTcardNumber(e.target.value)}
                />

                <label className="flex items-center gap-2 text-sm text-foreground">
                  <input
                    type="checkbox"
                    className="accent-primary"
                    checked={tbucksEnabled}
                    onChange={(e) => setTbucksEnabled(e.target.checked)}
                  />
                  Enable TBucks wallet sync (placeholder)
                </label>
              </Step>

              <Step>
                <h4 className="text-base font-semibold text-foreground">Step 4: Review</h4>
                <p className="text-sm text-muted-foreground">Final placeholder review before real backend submission.</p>

                <div className="text-sm text-foreground space-y-1">
                  <p><strong>Name:</strong> {name || "-"}</p>
                  <p><strong>UofT Email:</strong> {uoftEmail || "-"}</p>
                  <p><strong>UTORid:</strong> {utorid || "-"}</p>
                  <p><strong>TCard:</strong> {tcardNumber || "-"}</p>
                  <p><strong>TBucks Sync:</strong> {tbucksEnabled ? "Enabled" : "Not enabled"}</p>
                </div>
              </Step>
            </Stepper>

            {stepCompleted && (
              <p className="mt-4 text-sm font-semibold text-green-600">Setup flow completed. Backend submission can be connected next.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterSection;
