'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { T } from '@/lib/translations';
import { withBase, WHATSAPP_PHONE, KOELN_PLZ } from '@/lib/data';
import { ArrowLeftIcon, MinusIcon, PlusIcon, TrashIcon, LockIcon, CartIcon, CrownIcon, WhatsAppIcon } from '@/components/Icons';

export default function CartPage() {
  const { lang } = useLanguage();
  const { cart, updateQty, removeFromCart } = useCart();
  const t = T[lang];
  const o = t.order;
  const sub = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const [form, setForm] = useState({ firstName: '', lastName: '', address: '', postCode: '', phone: '' });
  const [error, setError] = useState('');
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const orderViaWhatsApp = () => {
    if (Object.values(form).some(v => !v.trim())) { setError(o.requiredError); return; }
    const plz = parseInt(form.postCode.replace(/[^0-9]/g, ''), 10);
    if (isNaN(plz) || plz < KOELN_PLZ.min || plz > KOELN_PLZ.max) { setError(o.postCodeError); return; }
    setError('');
    const lines = cart.map(i =>
      `• ${lang === 'fa' ? i.fa : i.de} ×${i.qty} — €${(i.price * i.qty).toFixed(2)}`);
    const msg = [
      `🛒 ${o.msgTitle}`,
      '',
      `📦 ${o.msgProducts}:`,
      ...lines,
      '',
      `💰 ${o.msgTotal}: €${sub.toFixed(2)}`,
      '',
      `👤 ${o.msgName}: ${form.firstName.trim()}`,
      `👤 ${o.msgLastName}: ${form.lastName.trim()}`,
      `📍 ${o.msgAddress}: ${form.address.trim()}`,
      `📮 ${o.msgPostCode}: ${form.postCode.trim()}`,
      `📞 ${o.msgPhone}: ${form.phone.trim()}`,
      '',
      `🚚 ${o.msgFooter}`,
    ].join('\n');
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
  };

  return (
    <>
      <div style={{ background:'var(--cream-dark)', borderBottom:'1px solid var(--border)', padding:'52px 0 40px' }}>
        <div className="container">
          <p style={{ color:'var(--mid)', fontSize:13, marginBottom:6 }}>Kian Markt</p>
          <h1 className="d-font" style={{ fontSize:'clamp(30px,5vw,52px)', fontWeight:700, color:'var(--charcoal)', letterSpacing:'-0.02em' }}>
            {t.cartTitle} {cart.length > 0 && <span style={{ fontSize:'0.5em', color:'var(--mid)', fontWeight:400 }}>({cart.reduce((s,i)=>s+i.qty,0)})</span>}
          </h1>
        </div>
      </div>
      <div className="container" style={{ padding:'48px 24px' }}>
        {cart.length === 0 ? (
          <div style={{ textAlign:'center', padding:'80px 0' }}>
            <div style={{ width:80, height:80, borderRadius:20, background:'var(--olive-fade)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 24px' }}>
              <CartIcon size={36} stroke="var(--olive-xl)" />
            </div>
            <h2 style={{ fontSize:22, fontWeight:600, color:'var(--charcoal)', marginBottom:12 }}>{t.cartEmpty}</h2>
            <Link href="/shop" className="btn btn-primary" style={{ textDecoration:'none', display:'inline-flex', gap:8, alignItems:'center' }}>
              <ArrowLeftIcon size={16} stroke="#fff" /> {t.continueShopping}
            </Link>
          </div>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns:'1fr 340px', gap:28, alignItems:'start' }} className="cart-grid">
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {cart.map(item => (
                <div key={item.id} className="cart-item" style={{ display:'flex', alignItems:'center', gap:16, flexWrap:'wrap' }}>
                  <div style={{ width:68, height:68, borderRadius:14, background:item.imgBg, border:'1px solid var(--border-l)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:32, flexShrink:0, overflow:'hidden' }}>
                    {item.img
                      // eslint-disable-next-line @next/next/no-img-element
                      ? <img src={withBase(item.img)} alt={lang === 'fa' ? item.fa : item.de} style={{ width:'100%', height:'100%', objectFit:'contain' }} />
                      : <CrownIcon size={26} stroke="var(--gold)" />}
                  </div>
                  <div style={{ flex:1, minWidth:130 }}>
                    <div style={{ fontWeight:600, fontSize:14, color:'var(--charcoal)', marginBottom:3 }}>{lang === 'fa' ? item.fa : item.de}</div>
                    <div style={{ fontSize:12, color:'var(--light)' }}>{lang === 'fa' ? item.catFa : item.catDe}</div>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                    <button className="qty-btn" onClick={() => updateQty(item.id, -1)}><MinusIcon size={14} stroke="var(--olive)" /></button>
                    <span style={{ minWidth:22, textAlign:'center', fontWeight:700, fontSize:15 }}>{item.qty}</span>
                    <button className="qty-btn" onClick={() => updateQty(item.id, +1)}><PlusIcon size={14} stroke="var(--olive)" /></button>
                  </div>
                  <span className="d-font" style={{ fontWeight:700, fontSize:18, color:'var(--olive)', minWidth:72 }}>€{(item.price * item.qty).toFixed(2)}</span>
                  <button onClick={() => removeFromCart(item.id)} style={{ background:'var(--terra-fade)', color:'var(--terra)', border:'none', borderRadius:8, padding:'7px 10px', cursor:'pointer', display:'flex', alignItems:'center', gap:5, fontFamily:'inherit', fontSize:12, fontWeight:500 }}>
                    <TrashIcon size={13} stroke="var(--terra)" /> {t.remove}
                  </button>
                </div>
              ))}
              <Link href="/shop" className="btn btn-outline" style={{ alignSelf:'flex-start', marginTop:8, textDecoration:'none', display:'inline-flex', alignItems:'center', gap:7 }}>
                <ArrowLeftIcon size={15} stroke="var(--olive)" /> {t.continueShopping}
              </Link>
            </div>
            <div className="card" style={{ padding:'28px 24px', position:'sticky', top:80 }}>
              <h3 style={{ fontWeight:700, fontSize:17, marginBottom:24, color:'var(--charcoal)' }}>{t.orderSummary}</h3>
              <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:14, color:'var(--charcoal-m)' }}>
                  <span>{t.subtotal}</span><span className="d-font" style={{ fontWeight:600 }}>€{sub.toFixed(2)}</span>
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:14, color:'var(--charcoal-m)' }}>
                  <span>{t.delivery}</span><span style={{ color:'var(--sage)', fontWeight:600 }}>{t.freeShipping}</span>
                </div>
                <div className="divider" />
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:17, fontWeight:700, color:'var(--charcoal)' }}>
                  <span>{t.total}</span><span className="d-font">€{sub.toFixed(2)}</span>
                </div>
              </div>
              <div className="divider" style={{ margin:'22px 0 18px' }} />
              <h4 style={{ fontWeight:700, fontSize:14, marginBottom:14, color:'var(--charcoal)' }}>{o.formTitle}</h4>
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                  <input className="input" placeholder={o.firstName} value={form.firstName} onChange={set('firstName')} />
                  <input className="input" placeholder={o.lastName} value={form.lastName} onChange={set('lastName')} />
                </div>
                <input className="input" placeholder={o.address} value={form.address} onChange={set('address')} />
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1.4fr', gap:10 }}>
                  <input className="input" placeholder={o.postCode} value={form.postCode} onChange={set('postCode')} inputMode="numeric" />
                  <input className="input" placeholder={o.phone} value={form.phone} onChange={set('phone')} inputMode="tel" dir="ltr" />
                </div>
              </div>
              {error && (
                <div style={{ marginTop:12, background:'var(--terra-fade)', color:'var(--terra)', borderRadius:10, padding:'10px 14px', fontSize:13, fontWeight:500 }}>
                  {error}
                </div>
              )}
              <button onClick={orderViaWhatsApp} className="btn btn-full" style={{ marginTop:16, padding:'13px 0', fontSize:15, display:'flex', alignItems:'center', justifyContent:'center', gap:9, background:'linear-gradient(135deg, #1DA851 0%, #25D366 100%)', color:'#fff', borderRadius:12, boxShadow:'0 6px 18px rgba(37,211,102,.3)' }}>
                <WhatsAppIcon size={18} stroke="#fff" /> {o.submit}
              </button>
              <div className="alert" style={{ marginTop:16, display:'flex', alignItems:'flex-start', gap:8 }}>
                <LockIcon size={14} stroke="var(--gold)" style={{ flexShrink:0, marginTop:1 }} />
                <span>{o.note}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
