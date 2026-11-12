'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { track, type ConversionEvent } from '@/lib/analytics';
import { PLATFORM_LOGIN_URL } from '@/lib/site';

interface Props {
  href: string;
  event: ConversionEvent;
  location: string;
  className?: string;
  children: ReactNode;
  external?: boolean;
  ariaLabel?: string;
  onClick?: () => void;
}

/**
 * Link que registra um evento de conversão antes de navegar.
 * O evento nunca bloqueia nem altera a navegação.
 */
export default function TrackedLink({ href, event, location, className, children, external, ariaLabel, onClick }: Props) {
  const handle = () => {
    track(event, { location });
    onClick?.();
  };

  if (external) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer" onClick={handle} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={handle} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

/**
 * Botão "Acessar Plataforma".
 * Preserva exatamente o comportamento original: mesma URL, nova aba, rel="noopener noreferrer".
 */
export function PlatformLoginLink({
  className,
  location,
  children = 'Acessar Plataforma',
  ariaLabel,
  onClick,
}: {
  className?: string;
  location: string;
  children?: ReactNode;
  ariaLabel?: string;
  onClick?: () => void;
}) {
  return (
    <TrackedLink
      href={PLATFORM_LOGIN_URL}
      external
      event="platform_login_click"
      location={location}
      className={className}
      ariaLabel={ariaLabel}
      onClick={onClick}
    >
      {children}
    </TrackedLink>
  );
}
