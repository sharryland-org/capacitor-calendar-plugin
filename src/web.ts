import { WebPlugin } from '@capacitor/core';

import type { CapacitorCalendarPlugin } from './definitions';

export class CapacitorCalendarWeb
  extends WebPlugin
  implements CapacitorCalendarPlugin
{
  async saveEventToCalendar(options: {
    eventTitle: string;
    startDate?: number;
    endDate?: number;
    timeZoneId?: string;
    isAllDay?: boolean;
    location?: string;
  }): Promise<void> {
    console.log('saveEventToCalendar', options);
    return;
  }
}
