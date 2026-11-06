"use client";

import { useEffect, useState } from "react";

type Props = { code: string; signature: string; autoLaunch: boolean };

export default function ReferralLanding({ code, signature, autoLaunch }: Props) {
  const [attempted, setAttempted] = useState(false);

  function openApp() {
    const query = new URLSearchParams();
    if (code) query.set("ref", code);
    if (signature) query.set("sig", signature);

    const fallback = `${window.location.origin}/r?${query.toString()}&launch=0`;
    const intent = `intent://referral?${query.toString()}#Intent;scheme=eurocars;package=com.eurocars.euro_cars;S.browser_fallback_url=${encodeURIComponent(fallback)};end`;
    window.location.href = intent;
    setAttempted(true);
  }

  useEffect(() => {
    if (!autoLaunch || !code || attempted) return;
    const timer = window.setTimeout(openApp, 450);
    return () => window.clearTimeout(timer);
  }, [autoLaunch, attempted, code, signature]);

  return (
    <main className="page">
      <div className="glow glow-one" aria-hidden="true" />
      <div className="glow glow-two" aria-hidden="true" />

      <section className="invite-card">
        <div className="app-icon">
          <img
            src="https://raw.githubusercontent.com/aboudwebs/Euro-car.syria/main/branding/icon_1024.png"
            alt="EURO CARS"
            width={96}
            height={96}
          />
        </div>

        <p className="brand" dir="ltr">EURO CARS</p>
        <h1>{code ? "أنت مدعو للانضمام إلى EURO CARS" : "افتح تطبيق EURO CARS"}</h1>
        <p className="description">
          {code
            ? "تم استلام دعوة المسوّق. افتح التطبيق للمتابعة، وسيبقى رمز الدعوة محفوظاً أثناء إنشاء حساب الورشة."
            : "تابع إلى التطبيق للوصول إلى خدمات قطع السيارات الأوروبية."}
        </p>

        {code ? (
          <div className="code-box">
            <span>رمز الدعوة</span>
            <strong dir="ltr">{code}</strong>
          </div>
        ) : null}

        <a
          className="open-button"
          href="#open-app"
          onClick={(event) => {
            event.preventDefault();
            openApp();
          }}
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
            <path d="M14 3h7v7M10 14 21 3M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
          </svg>
          فتح تطبيق EURO CARS
        </a>

        <p className="hint">
          {code
            ? "إذا لم يفتح التطبيق، تأكد من تثبيته ثم اضغط زر الفتح مرة أخرى."
            : "إذا لم يكن التطبيق مثبتاً على جهازك، ستحتاج إلى تثبيته قبل المتابعة."}
        </p>
        <div className="separator" />
        <p className="footer">EURO CARS · قطع السيارات الأوروبية</p>
      </section>
    </main>
  );
}
