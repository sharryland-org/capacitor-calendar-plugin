import { registerPlugin } from '@capacitor/core';
const CapacitorCalendar = registerPlugin('CapacitorCalendar', {
    web: () => import('./web').then(m => new m.CapacitorCalendarWeb()),
});
export * from './definitions';
export { CapacitorCalendar };
//# sourceMappingURL=index.js.map