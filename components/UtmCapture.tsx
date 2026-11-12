'use client';

import { useEffect } from 'react';
import { captureUtm } from '@/lib/utm';

/** Captura UTMs da URL de entrada e guarda na sessão. Não renderiza nada. */
export default function UtmCapture() {
  useEffect(() => {
    captureUtm();
  }, []);
  return null;
}
