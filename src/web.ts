import { WebPlugin } from '@capacitor/core';

import type { CapacitorCalendarPlugin } from './definitions';

export class CapacitorCalendarWeb extends WebPlugin implements CapacitorCalendarPlugin {
  async saveEventToCalendar(options: {
    eventTitle: string;
    eventDescription?: string;
    startDate?: number;
    endDate?: number;
    location?: string;
  }): Promise<void> {
    const { eventTitle, eventDescription, startDate, endDate, location } = options;
    const dtstamp = new Date().toISOString();
    const dtstart = new Date(startDate || new Date().getTime()).toISOString();
    const dtend = new Date(endDate || new Date(new Date().setHours(new Date().getHours() + 1)).getTime()).toISOString();
    const calendar = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//ZContent.net//Zap Calendar 1.0//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
SUMMARY:${eventTitle}
UID:${Math.random().toString()}
SEQUENCE:0
STATUS:CONFIRMED
TRANSP:TRANSPARENT
DTSTAMP:${dtstamp.substring(0, dtstamp.length - 4).replaceAll('.', '').replaceAll(':', '').replaceAll('-', '')}
DTSTART:${dtstart.substring(0, dtstart.length - 4).replaceAll('.', '').replaceAll(':', '').replaceAll('-', '')}
DTEND:${dtend.substring(0, dtend.length - 4).replaceAll('.', '').replaceAll(':', '').replaceAll('-', '')}
LOCATION:${location}
DESCRIPTION:${this.stripTagsAndFormatters(eventDescription)}
X-ALT-DESC:${eventDescription}
END:VEVENT
END:VCALENDAR`;
    const blob = new File([calendar], 'calendar.ics');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'calendar.ics';
    a.rel = 'noopener';
    a.click();
    return;
  }
  private stripTagsAndFormatters(value?: string, inline = false) {
    if (!value) return '';
    const stripped = value
      .replace(/<[^>]*>?/gm, '')
      .replace(/\*\*/gm, '')
      .replace(/--/gm, '')
      .replace(/__/gm, '')
      .replace(/~~/gm, '')
      .replace(/```/gm, '');
    return inline ? stripped.replace(/\n/gm, ' ') : stripped;
  }
}
