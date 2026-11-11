import { describe, expect, it } from 'vitest';
import { chanceIncreasePerLevel, oreSpawnChance } from '../lib/oreProbability';
describe('ore spawn model', () => {
  it('matches measured calibration points', () => {
    expect(oreSpawnChance(0)).toBeCloseTo(2.08, 1);
    expect(oreSpawnChance(66)).toBeCloseTo(21.35, 0);
    expect(oreSpawnChance(96)).toBeCloseTo(22.79, 0);
  });
  it('has diminishing returns and stays a valid probability', () => {
    expect(chanceIncreasePerLevel(200)).toBeLessThan(chanceIncreasePerLevel(10));
    expect(oreSpawnChance(1e9)).toBeGreaterThanOrEqual(0);
    expect(oreSpawnChance(1e9)).toBeLessThanOrEqual(100);
  });
});
