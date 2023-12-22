package com.lucaperuzzo.capacitorcalendarplugin;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.provider.CalendarContract;
import java.time.ZonedDateTime;
import java.util.Calendar;
import java.util.Date;

public class CapacitorCalendar {

    public Intent saveEventToCalendar(String eventTitle, Calendar startDate, Calendar endDate, Boolean isAllDay, Object location) {
        Intent intent = new Intent(Intent.ACTION_INSERT);
        intent.setData(CalendarContract.Events.CONTENT_URI);
        intent.putExtra(CalendarContract.EXTRA_EVENT_BEGIN_TIME, startDate.getTimeInMillis());
        intent.putExtra(CalendarContract.Events.ALL_DAY, isAllDay);
        intent.putExtra(CalendarContract.EXTRA_EVENT_END_TIME, endDate.getTimeInMillis());
        intent.putExtra(CalendarContract.Events.TITLE, eventTitle);
        if(location != null) {
            Location rLocation = (Location) location;
            Uri address = Uri.parse("geo:" + rLocation.latitude + "," + rLocation.longitude + "?q=" + Uri.encode(rLocation.title));
            intent.putExtra(CalendarContract.Events.EVENT_LOCATION, address);
        }
        return intent;
    }
}
