import { registerPlugin } from '@capacitor/core';

import type { SharrylandCapacitorCalendarPlugin } from './definitions';

const CapacitorCalendar = registerPlugin<SharrylandCapacitorCalendarPlugin>('CapacitorCalendar', {
  web: () => import('./web').then(m => new m.CapacitorCalendarWeb()),
});

export * from './definitions';
export { CapacitorCalendar };
