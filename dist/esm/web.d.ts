import { WebPlugin } from '@capacitor/core';
import type { CapacitorCalendarPlugin } from './definitions';
export declare class CapacitorCalendarWeb extends WebPlugin implements CapacitorCalendarPlugin {
    saveEventToCalendar(options: {
        eventTitle: string;
        eventDescription?: string;
        startDate?: number;
        endDate?: number;
        location?: string;
    }): Promise<void>;
    private stripTagsAndFormatters;
}
