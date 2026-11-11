import { describe, expect, it } from 'vitest';
import { calculate } from '../lib/dropCalculator';
const base = { level: 96, hours: 8, minutes: 0, speed: 7722, module: 'none' as const, goldenRequirementsMet: false };
describe('drop estimates', () => {
  it('calculates blocks and applies Pumpkin Lord only to drop chance', () => {
    expect(calculate(base).blocks).toBe(61776);
    expect(calculate({ ...base, module: 'pumpkin' }).total).toBeCloseTo(calculate(base).total * 1.25);
  });
  it('applies Golden Time only when requirements are confirmed', () => {
    expect(calculate({ ...base, module: 'golden', goldenRequirementsMet: false }).goldenUptime).toBe(0);
    expect(calculate({ ...base, module: 'golden', goldenRequirementsMet: true }).goldenUptime).toBeGreaterThan(0);
  });
});
