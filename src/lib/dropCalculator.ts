import { specialDrops } from '../data/specialDropData';
import { CoreModule, goldenTimeDuration, goldenTimeUptime } from './coreModules';
import { oreSpawnChance, individualOreChances, chanceIncreasePerLevel } from './oreProbability';

export type CalculatorInput = { level: number; hours: number; minutes: number; speed: number; module: CoreModule; goldenRequirementsMet: boolean };
export type Calculation = { oreChance: number; oreTypes: Record<'coal' | 'copper' | 'gold', number>; blocks: number; expected: Record<string, number>; total: number; chanceIncrease: number; goldenDuration: number; goldenUptime: number };

export function calculate(input: CalculatorInput): Calculation {
  const hours = Math.max(0, input.hours) + Math.max(0, input.minutes) / 60;
  const blocks = Math.max(0, input.speed) * hours;
  const oreChance = oreSpawnChance(input.level) / 100;
  const oreTypes = individualOreChances(input.level);
  const multiplier = input.module === 'pumpkin' ? 1.25 : 1;
  const duration = input.module === 'golden' && input.goldenRequirementsMet ? goldenTimeDuration(input.level) : 0;
  const uptime = duration > 0 ? goldenTimeUptime(input.level) : 0;
  const expected: Record<string, number> = {};
  for (const drop of specialDrops) {
    const oreKey = drop.key === 'carbonado' ? 'coal' : drop.key === 'copper' ? 'copper' : 'gold';
    // Golden Time replaces non-gold generator outcomes while active.
    const baseOreChance = oreTypes[oreKey] / 100;
    const effectiveOreChance = drop.key === 'graphene' ? baseOreChance + (1 - baseOreChance) * uptime : baseOreChance;
    expected[drop.key] = blocks * effectiveOreChance * drop.chance / 100 * multiplier;
  }
  const total = Object.values(expected).reduce((sum, value) => sum + value, 0);
  return { oreChance, oreTypes, blocks, expected, total, chanceIncrease: chanceIncreasePerLevel(input.level), goldenDuration: duration, goldenUptime: uptime };
}
