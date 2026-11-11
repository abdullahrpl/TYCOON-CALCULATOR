import { describe, expect, it } from 'vitest';
import { calculate } from '../lib/dropCalculator';
const base = { level: 96, hours: 8, minutes: 0, speed: 7722, module: 'none' as const, goldenRequirementsMet: false };
describe('drop estimates', () => {
  it('calculates blocks and applies Pumpkin Lord only to drop chance', () => {
    expect(calculate(base).blocks).toBe(61776);
    expect(calculate({ ...base, module: 'pumpkin' }).total).toBeCloseTo(calculate(base).total * 1.25);
  });
  it('uses separate measured ore chances instead of repeating the total chance', () => {
    const measured = calculate({ ...base, hours: 1, minutes: 0, speed: 1000, module: 'none' });
    expect(measured.expected.carbonado).toBeCloseTo(1000 * 0.0733 * 0.0939, 5);
    expect(measured.expected.copper).toBeCloseTo(1000 * 0.0547 * 0.0723, 5);
    expect(measured.expected.graphene).toBeCloseTo(1000 * 0.0229 * 0.0604, 5);
    expect(measured.total).toBeLessThan(1000 * measured.oreChance * 0.0939);
  });
  it('applies Golden Time only when requirements are confirmed', () => {
    expect(calculate({ ...base, module: 'golden', goldenRequirementsMet: false }).goldenUptime).toBe(0);
    expect(calculate({ ...base, module: 'golden', goldenRequirementsMet: true }).goldenUptime).toBeGreaterThan(0);
  });
});
