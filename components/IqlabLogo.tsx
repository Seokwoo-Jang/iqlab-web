import { asset } from '../lib/asset';

type Props = {
  className?: string;
};

/**
 * IQLAB logo. The source PNG already has a transparent background and is
 * tightly cropped, so it can sit directly on the dark navbar without any
 * SVG knockout filter.
 */
export default function IqlabLogo({ className = '' }: Props) {
  return (
    <span className={`inline-block ${className}`} style={{ lineHeight: 0 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset('/iqlab-logo-remove.png')}
        alt="IQLAB — Intelligent SoC · Quantum Computing"
        className="h-full w-auto block"
      />
    </span>
  );
}
