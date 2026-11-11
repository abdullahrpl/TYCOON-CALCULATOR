import { describe, expect, it } from 'vitest';
import { chanceIncreasePerLevel, individualOreChances, oreSpawnChance } from '../lib/oreProbability';
describe('ore spawn model', () => {
  it('matches measured calibration points', () => {
    expect(oreSpawnChance(0)).toBeCloseTo(2.08, 1);
    expect(oreSpawnChance(66)).toBeCloseTo(21.49, 2);
    expect(oreSpawnChance(96)).toBeCloseTo(22.80, 2);
  });
  it('approaches the assumed 23.48% asymptote with diminishing returns', () => {
    expect(oreSpawnChance(150)).toBeCloseTo(23.383, 2);
    expect(oreSpawnChance(1000)).toBeLessThan(23.48);
    expect(oreSpawnChance(1000)).toBeGreaterThan(oreSpawnChance(150));
    expect(chanceIncreasePerLevel(200)).toBeLessThan(chanceIncreasePerLevel(10));
    expect(oreSpawnChance(Number.MAX_VALUE)).toBeCloseTo(23.48, 5);
  });
  it('uses the observed ore-specific rates at level 96 and keeps them within total ore chance', () => {
    const chances = individualOreChances(96);
    expect(chances.coal).toBeCloseTo(7.33, 2);
    expect(chances.copper).toBeCloseTo(5.47, 2);
    expect(chances.gold).toBeCloseTo(2.29, 2);
    expect(chances.coal + chances.copper + chances.gold).toBeLessThanOrEqual(oreSpawnChance(96));
  });
  it('reports the change from the previous level in percentage points', () => {
    expect(chanceIncreasePerLevel(184)).toBeCloseTo(oreSpawnChance(184) - oreSpawnChance(183), 10);
    expect(chanceIncreasePerLevel(184)).toBeLessThan(0.048);
  });
});
