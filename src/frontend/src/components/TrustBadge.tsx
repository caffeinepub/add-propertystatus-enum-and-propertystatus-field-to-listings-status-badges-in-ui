import { memo } from 'react';
import { ShieldCheck } from 'lucide-react';

export type TrustBadgeVariant = 'verified' | 'featured' | 'premium' | 'elite';

interface TrustBadgeProps {
  variant?: TrustBadgeVariant;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const TrustBadge = memo(({ variant = 'verified', size = 'md', className = '' }: TrustBadgeProps) => {
  const sizeMap = {
    sm: { width: 60, height: 24, fontSize: 10, iconSize: 12 },
    md: { width: 80, height: 28, fontSize: 11, iconSize: 14 },
    lg: { width: 100, height: 32, fontSize: 12, iconSize: 16 },
  };

  const dimensions = sizeMap[size];

  const getVariantConfig = () => {
    switch (variant) {
      case 'verified':
        return {
          gradientId: 'goldGradient',
          gradientStops: [
            { offset: '0%', color: '#FFD700', opacity: 1 },
            { offset: '50%', color: '#FFA500', opacity: 1 },
            { offset: '100%', color: '#FF8C00', opacity: 1 },
          ],
          glowColor: 'rgba(255, 215, 0, 0.4)',
          text: 'Verified',
          icon: true,
        };
      case 'featured':
        return {
          gradientId: 'purpleGradient',
          gradientStops: [
            { offset: '0%', color: '#A855F7', opacity: 1 },
            { offset: '100%', color: '#8B5CF6', opacity: 1 },
          ],
          glowColor: 'rgba(168, 85, 247, 0.4)',
          text: 'Featured',
          icon: false,
        };
      case 'premium':
        return {
          gradientId: 'goldOutlineGradient',
          gradientStops: [
            { offset: '0%', color: '#FFD700', opacity: 1 },
            { offset: '100%', color: '#FFA500', opacity: 1 },
          ],
          glowColor: 'rgba(255, 215, 0, 0.3)',
          text: 'Premium',
          icon: false,
        };
      case 'elite':
        return {
          gradientId: 'diamondGradient',
          gradientStops: [
            { offset: '0%', color: '#E0E7FF', opacity: 1 },
            { offset: '50%', color: '#C7D2FE', opacity: 1 },
            { offset: '100%', color: '#A5B4FC', opacity: 1 },
          ],
          glowColor: 'rgba(224, 231, 255, 0.5)',
          text: 'Elite',
          icon: false,
        };
      default:
        return {
          gradientId: 'goldGradient',
          gradientStops: [
            { offset: '0%', color: '#FFD700', opacity: 1 },
            { offset: '100%', color: '#FFA500', opacity: 1 },
          ],
          glowColor: 'rgba(255, 215, 0, 0.4)',
          text: 'Verified',
          icon: true,
        };
    }
  };

  const config = getVariantConfig();

  return (
    <div className={`inline-flex items-center ${className}`}>
      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: `drop-shadow(0 2px 8px ${config.glowColor})` }}
      >
        <defs>
          <linearGradient id={config.gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            {config.gradientStops.map((stop, index) => (
              <stop
                key={index}
                offset={stop.offset}
                style={{ stopColor: stop.color, stopOpacity: stop.opacity }}
              />
            ))}
          </linearGradient>
          <filter id="subtleGlow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background with rounded corners */}
        <rect
          x="0"
          y="0"
          width={dimensions.width}
          height={dimensions.height}
          rx={dimensions.height / 2}
          fill={`url(#${config.gradientId})`}
          filter="url(#subtleGlow)"
        />

        {/* Icon (if applicable) */}
        {config.icon && (
          <g transform={`translate(${dimensions.height / 4}, ${dimensions.height / 2 - dimensions.iconSize / 2})`}>
            <ShieldCheck
              width={dimensions.iconSize}
              height={dimensions.iconSize}
              className="text-white"
              style={{ fill: 'white' }}
            />
          </g>
        )}

        {/* Text */}
        <text
          x={config.icon ? dimensions.height / 2 + dimensions.iconSize / 2 + 2 : dimensions.width / 2}
          y={dimensions.height / 2}
          textAnchor={config.icon ? 'start' : 'middle'}
          dominantBaseline="central"
          fill="white"
          fontSize={dimensions.fontSize}
          fontWeight="700"
          fontFamily="Arial, sans-serif"
        >
          {config.text}
        </text>
      </svg>
    </div>
  );
});

TrustBadge.displayName = 'TrustBadge';

export default TrustBadge;
