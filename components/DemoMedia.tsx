'use client';

import { useRef, useState } from 'react';
import PlatformMockup from '@/components/PlatformMockup';
import Icon from '@/components/Icon';
import { track } from '@/lib/analytics';
import type { DemoMediaData, MockupVariant } from '@/lib/content';

const ALLOWED_EMBED_HOSTS = ['www.youtube-nocookie.com', 'www.youtube.com', 'player.vimeo.com'];

function safeEmbed(url?: string) {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.protocol !== 'https:' || !ALLOWED_EMBED_HOSTS.includes(u.hostname)) return null;
    u.searchParams.set('autoplay', '1');
    return u.toString();
  } catch {
    return null;
  }
}

/**
 * Mídia de uma demonstração, em ordem de prioridade:
 *  1. videoSrc   → <video> nativo (mede início e conclusão)
 *  2. videoEmbed → YouTube/Vimeo carregado só no clique (mede início; leve para a página)
 *  3. screenshot → captura real
 *  4. nada       → representação ilustrativa identificada como tal
 */
export default function DemoMedia({
  demoId,
  title,
  media,
  mockup,
}: {
  demoId: string;
  title: string;
  media: DemoMediaData;
  mockup: MockupVariant;
}) {
  const started = useRef(false);
  const [embedActive, setEmbedActive] = useState(false);
  const embed = safeEmbed(media.videoEmbed);

  const onStart = () => {
    if (started.current) return;
    started.current = true;
    track('video_start', { demo: demoId });
  };

  if (media.videoSrc) {
    return (
      <div className="demo-video">
        <video
          controls
          preload="none"
          playsInline
          poster={media.poster}
          onPlay={onStart}
          onEnded={() => track('video_complete', { demo: demoId })}
          aria-label={`Vídeo: ${title}`}
        >
          <source src={media.videoSrc} />
          Seu navegador não suporta vídeo.
        </video>
      </div>
    );
  }

  if (embed) {
    return (
      <div className="demo-video">
        {embedActive ? (
          <iframe
            src={embed}
            title={`Vídeo: ${title}`}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <button
            type="button"
            className="demo-video-facade"
            onClick={() => {
              onStart();
              setEmbedActive(true);
            }}
            style={media.poster ? { backgroundImage: `url(${media.poster})` } : undefined}
            aria-label={`Reproduzir vídeo: ${title}`}
          >
            <span className="demo-play">
              <Icon name="play" size={26} />
            </span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="demo-still">
      <PlatformMockup uid={`demo-${demoId}`} variant={mockup} screenshot={media.screenshot} screenshotAlt={media.screenshotAlt || title} />
      {!media.screenshot && (
        <p className="demo-pending">
          <Icon name="play" size={14} />
          Vídeo em preparação — veja esta solução ao vivo em uma demonstração.
        </p>
      )}
    </div>
  );
}
