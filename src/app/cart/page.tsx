'use client';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { T } from '@/lib/translations';
import { withBase } from '@/lib/data';
import { ArrowLeftIcon, ArrowRightIcon, MinusIcon, PlusIcon, TrashIcon, LockIcon, CartIcon } from '@/components/Icons';

export default function CartPage() {
  const { lang } = useLanguage();
  const { cart, updateQty, removeFromCart } = useCart();
  const t = T[lang];
  const sub = cart.reduce((s, i) => s + i.price * i.qty, 0);

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
                      : item.emoji}
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
              <button className="btn btn-primary btn-full" style={{ marginTop:24, padding:'13px 0', fontSize:15, display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
                {t.checkout} <ArrowRightIcon size={16} stroke="#fff" />
              </button>
              <div className="alert" style={{ marginTop:16, display:'flex', alignItems:'flex-start', gap:8 }}>
                <LockIcon size={14} stroke="var(--gold)" style={{ flexShrink:0, marginTop:1 }} />
                <span>{t.cartNote}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
