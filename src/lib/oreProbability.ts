import { measuredOreChance, measuredOreTypes } from '../data/oreSpawnData';

// Smooth diminishing-returns estimate from the current working model. Its
// ~23.48% asymptote is a modeling assumption, not a confirmed server cap.
const baseChance = measuredOreChance[0].chance;
const growth = 21.4;
const decay = 0.036;

export function oreSpawnChance(level: number): number {
  const safeLevel = Math.max(0, Number.isFinite(level) ? level : 0);
  return baseChance + growth * (1 - Math.exp(-decay * safeLevel));
}

export function individualOreChances(level: number): Record<'coal' | 'copper' | 'gold', number> {
  const scale = oreSpawnChance(level) / oreSpawnChance(measuredOreTypes.level);
  return {
    coal: measuredOreTypes.coal * scale,
    copper: measuredOreTypes.copper * scale,
    gold: measuredOreTypes.gold * scale,
  };
}

export function chanceIncreasePerLevel(level: number): number {
  const currentLevel = Math.max(0, Number.isFinite(level) ? level : 0);
  return Math.max(0, oreSpawnChance(currentLevel) - oreSpawnChance(Math.max(0, currentLevel - 1)));
}

export function isMeasuredLevel(level: number): boolean {
  return measuredOreChance.some(point => point.level === level);
}
