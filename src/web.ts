import { WebPlugin } from '@capacitor/core';

import type { CapacitorCalendarPlugin, Location } from './definitions';

export class CapacitorCalendarWeb
  extends WebPlugin
  implements CapacitorCalendarPlugin
{
  async saveEventToCalendar(options: {
    eventTitle: string;
    startDate?: Date;
    endDate?: Date;
    isAllDay?: boolean;
    location?: Location;
  }): Promise<void> {
    console.log('saveEventToCalendar', options);
    return;
  }
}
