import { WebPlugin } from '@capacitor/core';
export class CapacitorCalendarWeb extends WebPlugin {
    async saveEventToCalendar(options) {
        const { eventTitle, eventDescription, startDate, endDate, location } = options;
        const dtstart = new Date(startDate || new Date().getTime());
        const dtend = new Date(endDate ||
            new Date(new Date().setHours(new Date().getHours() + 1)).getTime());
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
DTSTART:${dtstart.toISOString()}
DTEND:${dtend.toISOString()}
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
    stripTagsAndFormatters(value, inline = false) {
        if (!value)
            return '';
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
//# sourceMappingURL=web.js.map