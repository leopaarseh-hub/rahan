interface IconProps { size?: number; stroke?: string; style?: React.CSSProperties }

const base = (paths: React.ReactNode) =>
  ({ size = 18, stroke = 'currentColor', style = {} }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={style}>
      {paths}
    </svg>
  );

export const PhoneIcon     = base(<path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>);
export const MapPinIcon    = base(<><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></>);
export const ClockIcon     = base(<><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>);
export const CartIcon      = base(<><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></>);
export const MenuIcon      = base(<><line x1="3" y1="8" x2="21" y2="8"/><line x1="3" y1="14" x2="21" y2="14"/></>);
export const XIcon         = base(<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>);
export const UserIcon      = base(<><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></>);
export const SearchIcon    = base(<><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>);
export const GlobeIcon     = base(<><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></>);
export const PlusIcon      = base(<><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>);
export const MinusIcon     = base(<line x1="5" y1="12" x2="19" y2="12"/>);
export const TrashIcon     = base(<><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/></>);
export const ArrowRightIcon= base(<><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>);
export const ArrowLeftIcon = base(<><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></>);
export const ExternalLinkIcon=base(<><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></>);
export const LockIcon      = base(<><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></>);
export const MailIcon      = base(<><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>);
export const LeafIcon      = base(<><path d="M17 8C8 10 5.9 16.17 3.82 19.5c.85.8 1.87 1.37 3 1.5C10 21 14 19 14 14c0-3-1-5-3-6"/><path d="M17 8c0 0-1 7-8 11"/></>);
export const PackageIcon   = base(<><polyline points="16.5 9.4 7.5 4.21"/><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></>);
export const CheckCircleIcon=base(<><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>);
export const CrownIcon     = base(<><path d="M3 18h18"/><path d="M4 15l-1-8 5 3.5L12 4l4 6.5L21 7l-1 8H4z"/></>);

// Icon lookup by name (for services)
export const IconByName: Record<string, React.FC<IconProps>> = {
  Package: PackageIcon, Leaf: LeafIcon, Globe: GlobeIcon,
  Mail: MailIcon, MapPin: MapPinIcon, Cart: CartIcon,
};
