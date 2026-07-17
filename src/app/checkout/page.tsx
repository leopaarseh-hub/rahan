'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { T } from '@/lib/translations';
import { withBase, WHATSAPP_PHONE, KOELN_PLZ } from '@/lib/data';
import { ArrowLeftIcon, CartIcon, CheckCircleIcon, LockIcon, WhatsAppIcon, MapPinIcon } from '@/components/Icons';

type Phase = 'form' | 'sending' | 'done';

export default function CheckoutPage() {
  const { lang } = useLanguage();
  const { cart } = useCart();
  const t = T[lang];
  const o = t.order;
  const c = t.checkout;
  const sub = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const [form, setForm] = useState({ firstName: '', lastName: '', address: '', postCode: '', phone: '' });
  const [error, setError] = useState('');
  const [phase, setPhase] = useState<Phase>('form');
  const [waUrl, setWaUrl] = useState('');
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = () => {
    if (Object.values(form).some(v => !v.trim())) { setError(o.requiredError); return; }
    const plz = parseInt(form.postCode.replace(/[^0-9]/g, ''), 10);
    if (isNaN(plz) || plz < KOELN_PLZ.min || plz > KOELN_PLZ.max) { setError(o.postCodeError); return; }
    setError('');
    const fa = lang === 'fa';
    // RLM keeps Farsi lines right-to-left even when they contain Latin text
    const rtl = fa ? '‏' : '';
    const cur = fa ? 'یورو' : 'EUR';
    const times = fa ? '×' : 'x';
    const SEP = '----------------------------';
    const lines = cart.map((i, n) =>
      `${rtl}${n + 1}. ${fa ? i.fa : i.de}  (${times}${i.qty})  =  ${(i.price * i.qty).toFixed(2)} ${cur}`);
    let msg = [
      `${rtl}*${o.msgTitle}*`,
      SEP,
      '',
      `${rtl}*${o.msgProducts}:*`,
      ...lines,
      '',
      `${rtl}*${o.msgTotal}: ${sub.toFixed(2)} ${cur}*`,
      '',
      SEP,
      `${rtl}${o.msgName}: ${form.firstName.trim()}`,
      `${rtl}${o.msgLastName}: ${form.lastName.trim()}`,
      `${rtl}${o.msgAddress}: ${form.address.trim()}`,
      `${rtl}${o.msgPostCode}: ${form.postCode.trim()}`,
      `${rtl}${o.msgPhone}: ${form.phone.trim()}`,
      SEP,
    ].join('\n');
    // Farsi message uses Persian digits everywhere
    if (fa) msg = msg.replace(/[0-9]/g, d => '۰۱۲۳۴۵۶۷۸۹'[+d]);
    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
    setWaUrl(url);
    // open synchronously within the click gesture so browsers allow the popup
    window.open(url, '_blank', 'noopener');
    setPhase('sending');
    setTimeout(() => setPhase('done'), 1600);
  };

  const steps = [
    { label: c.step1, state: 'done' },
    { label: c.step2, state: phase === 'form' ? 'active' : 'done' },
    { label: c.step3, state: phase === 'done' ? 'done' : phase === 'sending' ? 'active' : 'todo' },
  ] as const;

  return (
    <>
      <div className="dark-lux" style={{ padding:'48px 0 38px' }}>
        <div className="hero-pattern" />
        <div className="container" style={{ position:'relative' }}>
          <p style={{ color:'rgba(255,255,255,.45)', fontSize:13, marginBottom:6 }}>Kian Markt</p>
          <h1 className="d-font" style={{ fontSize:'clamp(30px,5vw,48px)', fontWeight:700, color:'#fff', letterSpacing:'-0.02em' }}>{c.title}</h1>
        </div>
      </div>

      <div className="container" style={{ padding:'44px 24px 70px' }}>
        {/* Stepper */}
        <div className="steps" style={{ marginBottom:44 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center' }}>
              {i > 0 && <div className={`step-line ${s.state !== 'todo' ? 'on' : ''}`} />}
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
                <div className={`step-dot ${s.state}`}>
                  {s.state === 'done' ? <CheckCircleIcon size={17} stroke="#fff" /> : i + 1}
                </div>
                <span style={{ fontSize:12, fontWeight:600, color: s.state === 'todo' ? 'var(--light)' : 'var(--olive)', whiteSpace:'nowrap' }}>{s.label}</span>
              </div>
            </div>
          ))}
        </div>

        {cart.length === 0 && phase === 'form' ? (
          <div style={{ textAlign:'center', padding:'60px 0' }}>
            <div style={{ width:80, height:80, borderRadius:20, background:'var(--olive-fade)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 24px' }}>
              <CartIcon size={36} stroke="var(--olive-xl)" />
            </div>
            <h2 style={{ fontSize:22, fontWeight:600, color:'var(--charcoal)', marginBottom:14 }}>{t.cartEmpty}</h2>
            <Link href="/shop" className="btn btn-primary" style={{ textDecoration:'none', display:'inline-flex', gap:8, alignItems:'center' }}>
              <ArrowLeftIcon size={16} stroke="#fff" /> {t.continueShopping}
            </Link>
          </div>
        ) : phase === 'done' ? (
          /* ── Success ── */
          <div style={{ textAlign:'center', padding:'40px 0 20px', maxWidth:520, margin:'0 auto' }}>
            <div className="success-ring">
              <CheckCircleIcon size={46} stroke="#fff" />
            </div>
            <h2 className="d-font" style={{ fontSize:32, fontWeight:700, color:'var(--olive)', margin:'26px 0 12px' }}>{c.doneTitle}</h2>
            <p style={{ fontSize:15, color:'var(--mid)', lineHeight:1.8, marginBottom:30 }}>{c.doneSub}</p>
            <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
              <a href={waUrl} target="_blank" rel="noreferrer" className="btn btn-full" style={{ maxWidth:280, padding:'13px 0', fontSize:15, display:'flex', alignItems:'center', justifyContent:'center', gap:9, background:'linear-gradient(135deg, #1DA851 0%, #25D366 100%)', color:'#fff', borderRadius:12, textDecoration:'none', boxShadow:'0 6px 18px rgba(37,211,102,.3)' }}>
                <WhatsAppIcon size={18} stroke="#fff" /> {c.reopen}
              </a>
              <Link href="/shop" className="btn btn-outline" style={{ textDecoration:'none', display:'inline-flex', alignItems:'center', gap:7 }}>
                <ArrowLeftIcon size={15} stroke="var(--olive)" /> {c.backShop}
              </Link>
            </div>
          </div>
        ) : phase === 'sending' ? (
          /* ── Preparing ── */
          <div style={{ textAlign:'center', padding:'70px 0' }}>
            <div className="lux-spinner" />
            <p className="d-font" style={{ fontSize:22, fontWeight:600, color:'var(--olive)', marginTop:26 }}>{c.sending}</p>
          </div>
        ) : (
          /* ── Form + Recap ── */
          <div style={{ display:'grid', gridTemplateColumns:'1.15fr 1fr', gap:28, alignItems:'start' }} className="cart-grid">
            <div className="card lux-card" style={{ padding:'34px 30px' }}>
              <h3 style={{ fontWeight:700, fontSize:18, marginBottom:6, color:'var(--charcoal)' }}>{o.formTitle}</h3>
              <div style={{ display:'flex', alignItems:'center', gap:7, fontSize:12.5, color:'var(--olive)', fontWeight:600, marginBottom:24 }}>
                <MapPinIcon size={14} stroke="var(--pom)" /> {o.msgFooter}
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                  <div className="field">
                    <label>{o.firstName}</label>
                    <input className="input" value={form.firstName} onChange={set('firstName')} />
                  </div>
                  <div className="field">
                    <label>{o.lastName}</label>
                    <input className="input" value={form.lastName} onChange={set('lastName')} />
                  </div>
                </div>
                <div className="field">
                  <label>{o.address}</label>
                  <input className="input" value={form.address} onChange={set('address')} />
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1.4fr', gap:14 }}>
                  <div className="field">
                    <label>{o.postCode}</label>
                    <input className="input" value={form.postCode} onChange={set('postCode')} inputMode="numeric" />
                  </div>
                  <div className="field">
                    <label>{o.phone}</label>
                    <input className="input" value={form.phone} onChange={set('phone')} inputMode="tel" dir="ltr" />
                  </div>
                </div>
              </div>
              {error && (
                <div style={{ marginTop:16, background:'var(--pom-fade)', color:'var(--pom)', borderRadius:10, padding:'11px 15px', fontSize:13, fontWeight:500 }}>
                  {error}
                </div>
              )}
              <button onClick={submit} className="btn btn-full" style={{ marginTop:22, padding:'14px 0', fontSize:15.5, display:'flex', alignItems:'center', justifyContent:'center', gap:9, background:'linear-gradient(135deg, #1DA851 0%, #25D366 100%)', color:'#fff', borderRadius:12, boxShadow:'0 6px 18px rgba(37,211,102,.3)' }}>
                <WhatsAppIcon size={18} stroke="#fff" /> {o.submit}
              </button>
              <div className="alert" style={{ marginTop:16, display:'flex', alignItems:'flex-start', gap:8 }}>
                <LockIcon size={14} stroke="var(--gold)" style={{ flexShrink:0, marginTop:1 }} />
                <span>{o.note}</span>
              </div>
            </div>

            {/* Recap */}
            <div className="card lux-card" style={{ padding:'28px 24px', position:'sticky', top:80 }}>
              <h3 style={{ fontWeight:700, fontSize:17, marginBottom:20, color:'var(--charcoal)' }}>{t.orderSummary}</h3>
              <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:20 }}>
                {cart.map(i => (
                  <div key={i.id} style={{ display:'flex', alignItems:'center', gap:12 }}>
                    <div style={{ width:46, height:46, borderRadius:11, border:'1px solid var(--border-l)', background:'#fff', overflow:'hidden', flexShrink:0 }}>
                      {i.img && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={withBase(i.img)} alt={lang === 'fa' ? i.fa : i.de} style={{ width:'100%', height:'100%', objectFit:'contain' }} />
                      )}
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:13, fontWeight:600, color:'var(--charcoal)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{lang === 'fa' ? i.fa : i.de}</div>
                      <div style={{ fontSize:11.5, color:'var(--light)' }}>×{i.qty}</div>
                    </div>
                    <span className="d-font" style={{ fontSize:15, fontWeight:700, color:'var(--pom)' }}>€{(i.price * i.qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="divider" />
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:14, color:'var(--charcoal-m)', margin:'14px 0 8px' }}>
                <span>{t.delivery}</span><span style={{ color:'var(--sage)', fontWeight:600 }}>{t.freeShipping}</span>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:18, fontWeight:700, color:'var(--charcoal)' }}>
                <span>{t.total}</span><span className="d-font" style={{ color:'var(--pom)' }}>€{sub.toFixed(2)}</span>
              </div>
              <Link href="/cart" style={{ display:'inline-flex', alignItems:'center', gap:6, marginTop:18, fontSize:13, color:'var(--mid)', textDecoration:'none' }}>
                <ArrowLeftIcon size={13} stroke="var(--mid)" /> {c.back}
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
