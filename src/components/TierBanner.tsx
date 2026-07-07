// Displays current tier name and influence progress toward the next tier
// Shown below the header to give players a sense of progression

interface TierBannerProps {
  tier: number;
  influence: number;
}

const TIER_NAMES: Record<number, string> = {
  1: "Neighborhood Cat Colony",
  2: "City Cat Network",
  3: "Regional Cat Authority",
  4: "National CatNet",
  5: "Global Feline Internet",
};

const TIER_THRESHOLDS: Record<number, number> = {
  1: 100,
  2: 300,
  3: 600,
  4: 1000,
};

export function TierBanner({ tier, influence }: TierBannerProps) {
  const tierName = TIER_NAMES[tier] ?? "Unknown";
  const threshold = TIER_THRESHOLDS[tier];
  const isMaxTier = tier >= 5;

  return (
    <div className="tier-banner">
      <div className="tier-banner-left">
        <span className="tier-badge">TIER {tier}</span>
        <span className="tier-name">{tierName}</span>
      </div>
      {!isMaxTier && threshold && (
        <div className="tier-banner-right">
          <span className="tier-progress-label">
            Influence to next tier: {influence} / {threshold}
          </span>
          <div className="tier-progress-bar">
            <div
              className="tier-progress-fill"
              style={{
                width: `${Math.min(100, (influence / threshold) * 100)}%`,
              }}
            />
          </div>
        </div>
      )}
      {isMaxTier && <span className="tier-max">Maximum Tier Reached</span>}
    </div>
  );
}
