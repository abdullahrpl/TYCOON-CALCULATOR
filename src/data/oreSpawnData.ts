export const measuredOreChance = [
  { level: 0, chance: 2.08 },
  { level: 66, chance: 21.35 },
  { level: 96, chance: 22.79 },
] as const;

// Observed individual spawn chances at level 96. Above/below this level, the
// current estimate keeps these ore shares proportional to the modeled total.
export const measuredOreTypes = {
  level: 96,
  coal: 7.33,
  copper: 5.47,
  gold: 2.29,
} as const;

export const oreDistribution = [
  { key: 'coal', name: 'Coal', color: '#9b8a6c' },
  { key: 'copper', name: 'Copper', color: '#dc885b' },
  { key: 'gold', name: 'Gold', color: '#e5bd59' },
] as const;
