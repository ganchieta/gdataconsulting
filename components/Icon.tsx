/**
 * Ícones de traço simples (24×24, stroke = currentColor), desenhados para o site.
 * Uso: <Icon name="finance" size={22} />
 */

const PATHS = {
  sheet: 'M4 4h16v16H4zM4 9h16M4 14h16M9 4v16',
  scatter: 'M5 6h.01M12 4h.01M19 7h.01M7 13h.01M15 12h.01M5 19h.01M12 18h.01M19 17h.01',
  plug: 'M9 2v6M15 2v6M6 8h12v3a6 6 0 0 1-12 0zM12 17v5',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2',
  eye: 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  repeat: 'M17 2l4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4M21 13v2a3 3 0 0 1-3 3H3',
  finance: 'M3 3v18h18M7 15l4-4 3 3 6-6M16 8h4v4',
  integration: 'M6 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM18 15a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM9 6h5a3 3 0 0 1 3 3v6M15 18h-5a3 3 0 0 1-3-3V9',
  chart: 'M4 20V10M10 20V4M16 20v-7M22 20H2',
  erp: 'M3 4h18v6H3zM3 14h18v6H3zM7 7h.01M7 17h.01',
  users: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8',
  api: 'M8 6l-6 6 6 6M16 6l6 6-6 6M14 4l-4 16',
  database: 'M12 8c4.4 0 8-1.3 8-3s-3.6-3-8-3-8 1.3-8 3 3.6 3 8 3zM4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
  layers: 'M12 2l10 5-10 5L2 7zM2 17l10 5 10-5M2 12l10 5 10-5',
  bolt: 'M13 2L4 14h7l-1 8 9-12h-7z',
  target: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  scale: 'M3 21h18M5 21V11M10 21V7M15 21V13M20 21V3',
  support: 'M3 14v-2a9 9 0 0 1 18 0v2M21 15a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2zM3 15a2 2 0 0 0 2 2h1v-6H5a2 2 0 0 0-2 2zM18 17v1a3 3 0 0 1-3 3h-3',
  check: 'M20 6L9 17l-5-5',
  arrow: 'M5 12h14M12 5l7 7-7 7',
  play: 'M7 4l13 8-13 8z',
  login: 'M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3',
  calendar: 'M4 5h16v16H4zM4 10h16M8 3v4M16 3v4',
  chat: 'M21 12a8 8 0 0 1-11.8 7L3 21l2-6.2A8 8 0 1 1 21 12z',
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  plus: 'M12 5v14M5 12h14',
  car: 'M5 17h14M3 17v-5l2-5h14l2 5v5h-2M7 17v2M17 17v2M3 12h18M7 14.5h.01M17 14.5h.01',
  building: 'M4 21V5l8-3 8 3v16M4 21h16M9 8h.01M15 8h.01M9 12h.01M15 12h.01M9 16h.01M15 16h.01M11 21v-3h2v3',
  rocket: 'M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2M9 15l-3-3c1-4 4.5-9 13-9 0 8.5-5 12-9 13zM15 9.01V9',
} as const;

export type IconName = keyof typeof PATHS;

export default function Icon({
  name,
  size = 22,
  strokeWidth = 1.8,
  className,
}: {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
