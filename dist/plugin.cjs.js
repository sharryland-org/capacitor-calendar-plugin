'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@capacitor/core');

const CapacitorCalendar = core.registerPlugin('CapacitorCalendar', {
    web: () => Promise.resolve().then(function () { return web; }).then(m => new m.CapacitorCalendarWeb()),
});

class CapacitorCalendarWeb extends core.WebPlugin {
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
DTSTART:${dtstart.getFullYear().toPrecision(4)}${(dtstart.getMonth() + 1).toPrecision(2)}${dtstart.getDate().toPrecision(2)}T${dtstart
            .getHours()
            .toPrecision(2)}${dtstart.getMinutes().toPrecision(2)}${dtstart
            .getMilliseconds()
            .toPrecision(3)}
DTEND:${dtend.getFullYear().toPrecision(4)}${(dtend.getMonth() + 1).toPrecision(2)}${dtend.getDate().toPrecision(2)}T${dtend
            .getHours()
            .toPrecision(2)}${dtend.getMinutes().toPrecision(2)}${dtend
            .getMilliseconds()
            .toPrecision(3)}
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

var web = /*#__PURE__*/Object.freeze({
    __proto__: null,
    CapacitorCalendarWeb: CapacitorCalendarWeb
});

exports.CapacitorCalendar = CapacitorCalendar;
//# sourceMappingURL=plugin.cjs.js.map
