export interface SharrylandCapacitorCalendarPlugin {
  saveEventToCalendar(options: {
    eventTitle: string;
    eventDescription?: string;
    startDate?: number;
    endDate?: number;
    location?: string;
  }): Promise<void>;
}
