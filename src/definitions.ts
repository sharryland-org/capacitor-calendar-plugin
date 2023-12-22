export interface CapacitorCalendarPlugin {
  saveEventToCalendar(options: {
    eventTitle: string;
    startDate?: Date;
    endDate?: Date;
    isAllDay?: boolean;
    location?: Location;
  }): Promise<void>;
}
export interface Location{
  title: string;
  latitude?: number;
  longitude?: number;
}