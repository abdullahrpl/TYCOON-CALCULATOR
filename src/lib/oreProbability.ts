import { measuredOreChance } from '../data/oreSpawnData';

// Logarithmic estimate calibrated to levels 0 and 96. It has no practical
// level cap and keeps increasing with diminishing per-level gains. Since this
// represents a probability, the output is capped at 100%. It is not the server formula.
const baseChance = measuredOreChance[0].chance;
const logScale = (measuredOreChance[2].chance - baseChance) / Math.log1p(measuredOreChance[2].level);

export function oreSpawnChance(level: number): number {
  const safeLevel = Math.max(0, Number.isFinite(level) ? level : 0);
  return Math.min(100, baseChance + logScale * Math.log1p(safeLevel));
}

export function chanceIncreasePerLevel(level: number): number {
  return Math.max(0, oreSpawnChance(level + 1) - oreSpawnChance(level));
}

export function isMeasuredLevel(level: number): boolean {
  return measuredOreChance.some(point => point.level === level);
}
