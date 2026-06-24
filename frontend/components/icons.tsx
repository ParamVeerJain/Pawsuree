import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

/** Classic four-toe paw print. */
export function Paw(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" {...props}>
      <ellipse cx="7.6" cy="12.6" rx="3" ry="4" transform="rotate(-24 7.6 12.6)" />
      <ellipse cx="13.1" cy="8.2" rx="3" ry="4.2" transform="rotate(-8 13.1 8.2)" />
      <ellipse cx="19.6" cy="8.2" rx="3" ry="4.2" transform="rotate(8 19.6 8.2)" />
      <ellipse cx="25" cy="12.6" rx="3" ry="4" transform="rotate(24 25 12.6)" />
      <path d="M16.3 14.6c4.6 0 8.4 3.9 8.4 7.7 0 3.6-3.3 5.4-8.4 5.4s-8.4-1.8-8.4-5.4c0-3.8 3.8-7.7 8.4-7.7Z" />
    </svg>
  );
}

/** Dog bone — also doubles as the custom cursor. */
export function Bone(props: IconProps) {
  return (
    <svg viewBox="0 0 40 24" aria-hidden="true" {...props}>
      <path
        d="M11.5,3.5 C14.2,3.5 16.4,5.4 16.9,7.9 L23.1,7.9 C23.6,5.4 25.8,3.5 28.5,3.5 C31.5,3.5 34,5.9 34,8.9 C34,10.1 33.6,11.2 32.9,12 C33.6,12.8 34,13.9 34,15.1 C34,18.1 31.5,20.5 28.5,20.5 C25.8,20.5 23.6,18.6 23.1,16.1 L16.9,16.1 C16.4,18.6 14.2,20.5 11.5,20.5 C8.5,20.5 6,18.1 6,15.1 C6,13.9 6.4,12.8 7.1,12 C6.4,11.2 6,10.1 6,8.9 C6,5.9 8.5,3.5 11.5,3.5 Z"
        fill="#FFFDF4"
        stroke="#1D4E7E"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Floppy dog ear for the tops of the dog-tag cards. */
export function Ear({ flip = false, ...props }: IconProps & { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 34 40"
      aria-hidden="true"
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
      {...props}
    >
      <path
        d="M6,36 C2,24 4,10 13,4 C22,-1 31,5 31,14 C31,25 23,34 12,38 C9,39 7,38.5 6,36 Z"
        fill="#4A87C8"
        stroke="#1D4E7E"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M11,31 C9,23 11,13 17,9" stroke="#D9F1FB" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  );
}

/** Wagging tail for card hover states. */
export function Tail(props: IconProps) {
  return (
    <svg viewBox="0 0 44 30" aria-hidden="true" {...props}>
      <path
        d="M3,24 C14,26 26,22 33,13 C36,9 38,6 41,4"
        fill="none"
        stroke="#1D4E7E"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M3,24 C14,26 26,22 33,13 C36,9 38,6 41,4"
        fill="none"
        stroke="#4A87C8"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MapPin(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export function Phone(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

export function Mail(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

export function WhatsApp(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4 0-.5.2-.7l.4-.5c.1-.2.2-.3.3-.5v-.5L9.8 7.6c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.6-.3Z" />
    </svg>
  );
}

export function Bell(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M6 9a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6" />
      <path d="M10 19a2 2 0 0 0 4 0" />
    </svg>
  );
}

export function Check(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  );
}

export function Menu(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true" {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function Close(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true" {...props}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}
