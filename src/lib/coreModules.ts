export type CoreModule = 'none' | 'pumpkin' | 'golden';
export const coreModules = [
  { value: 'none', label: 'Tanpa Modul', detail: 'Peluang dasar' },
  { value: 'pumpkin', label: 'Crown of the Pumpkin Lord', detail: 'Ultima · +25% peluang special drop' },
  { value: 'golden', label: 'Golden Time', detail: 'Ultima · generator emas sementara' },
] as const;

export function goldenTimeDuration(level: number): number { return Math.min(Math.max(level, 0) / 3, 120); }
export function goldenTimeUptime(level: number): number {
  const duration = goldenTimeDuration(level);
  return duration / (duration + 120);
}
