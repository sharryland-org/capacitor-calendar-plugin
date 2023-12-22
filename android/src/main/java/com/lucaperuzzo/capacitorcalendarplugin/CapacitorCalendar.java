package com.lucaperuzzo.capacitorcalendarplugin;

import android.content.Intent;
import android.provider.CalendarContract;
import java.util.Calendar;

public class CapacitorCalendar {

    public Intent saveEventToCalendar(String eventTitle, Calendar startDate, Calendar endDate, Boolean isAllDay, String location) {
        Intent intent = new Intent(Intent.ACTION_INSERT);
        intent.setData(CalendarContract.Events.CONTENT_URI);
        intent.putExtra(CalendarContract.EXTRA_EVENT_BEGIN_TIME, startDate.getTimeInMillis());
        intent.putExtra(CalendarContract.Events.ALL_DAY, isAllDay);
        intent.putExtra(CalendarContract.EXTRA_EVENT_END_TIME, endDate.getTimeInMillis());
        intent.putExtra(CalendarContract.Events.TITLE, eventTitle);
        intent.putExtra(CalendarContract.Events.EVENT_LOCATION, location);
        return intent;
    }
}
