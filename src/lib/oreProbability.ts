import { measuredOreChance } from '../data/oreSpawnData';

// Piecewise monotone interpolation through measured observations, with decreasing
// slope within each interval. Beyond the last observation the final segment's
// diminishing-returns tail is extrapolated. This is a fit, not the server formula.
const highSlope = (measuredOreChance[2].chance - measuredOreChance[1].chance) / 30;
const tailScale = 1 / highSlope;

export function oreSpawnChance(level: number): number {
  const safeLevel = Math.max(0, Number.isFinite(level) ? level : 0);
  if (safeLevel <= 66) {
    const x = safeLevel / 66;
    return measuredOreChance[0].chance + (measuredOreChance[1].chance - measuredOreChance[0].chance) * (2 * x - x * x);
  }
  if (safeLevel <= 96) {
    const x = (safeLevel - 66) / 30;
    return measuredOreChance[1].chance + (measuredOreChance[2].chance - measuredOreChance[1].chance) * (2 * x - x * x);
  }
  const beyond = safeLevel - 96;
  return measuredOreChance[2].chance + (1 - Math.exp(-beyond / tailScale)) * 0.5;
}

export function chanceIncreasePerLevel(level: number): number {
  return Math.max(0, oreSpawnChance(level + 1) - oreSpawnChance(level));
}

export function isMeasuredLevel(level: number): boolean {
  return measuredOreChance.some(point => point.level === level);
}
