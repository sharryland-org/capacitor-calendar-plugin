import { WebPlugin } from '@capacitor/core';
import type { SharrylandCapacitorCalendarPlugin } from './definitions';
export declare class CapacitorCalendarWeb extends WebPlugin implements SharrylandCapacitorCalendarPlugin {
    saveEventToCalendar(options: {
        eventTitle: string;
        eventDescription?: string;
        startDate?: number;
        endDate?: number;
        location?: string;
    }): Promise<void>;
    private stripTagsAndFormatters;
}
