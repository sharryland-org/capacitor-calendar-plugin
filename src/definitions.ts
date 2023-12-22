export interface CapacitorCalendarPlugin {
  saveEventToCalendar(options: {
    eventTitle: string;
    startDate?: number;
    endDate?: number;
    timeZoneId?: string;
    isAllDay?: boolean;
    location?: string;
  }): Promise<void>;
}
