import { describe, expect, it } from 'vitest';
import { goldenTimeDuration, goldenTimeUptime } from '../lib/coreModules';
describe('Golden Time model', () => {
  it('caps active duration at 120 seconds', () => { expect(goldenTimeDuration(30)).toBe(10); expect(goldenTimeDuration(900)).toBe(120); });
  it('calculates uptime assuming cooldown starts after effect ends', () => { expect(goldenTimeUptime(360)).toBeCloseTo(0.5); });
});
