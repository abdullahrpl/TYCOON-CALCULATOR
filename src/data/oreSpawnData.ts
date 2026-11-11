export const measuredOreChance = [
  { level: 0, chance: 2.08 },
  { level: 66, chance: 21.35 },
  { level: 96, chance: 22.79 },
] as const;

// Individual ore shares have not been measured yet. Keep them unavailable rather than
// inventing a distribution that would imply server-backed accuracy.
export const oreDistribution = [
  { name: 'Coal', color: '#9b8a6c' }, { name: 'Copper', color: '#dc885b' },
  { name: 'Iron', color: '#b8b9b1' }, { name: 'Gold', color: '#e5bd59' },
  { name: 'Redstone', color: '#d7584e' }, { name: 'Lapis', color: '#6088d8' },
  { name: 'Diamond', color: '#72d7d0' }, { name: 'Emerald', color: '#62ba83' },
] as const;
