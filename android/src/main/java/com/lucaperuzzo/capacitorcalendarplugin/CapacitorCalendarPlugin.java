package com.lucaperuzzo.capacitorcalendarplugin;

import android.content.Intent;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.util.Calendar;

@CapacitorPlugin(name = "CapacitorCalendar")
public class CapacitorCalendarPlugin extends Plugin {

    private CapacitorCalendar implementation = new CapacitorCalendar();

    @PluginMethod
    public void saveEventToCalendar(PluginCall call) {
        String eventTitle = call.getString("eventTitle", "");
        Calendar startDate = Calendar.getInstance();
        Calendar endDate = Calendar.getInstance();
        endDate.add(Calendar.HOUR, 1);
        Long startDateMillis = call.getLong("startDate");
        Long endDateMillis = call.getLong("endDate");
        if (startDateMillis != null) {
            startDate.setTimeInMillis(startDateMillis);
        }
        if (endDateMillis != null) {
            endDate.setTimeInMillis(endDateMillis);
        }
        Boolean isAllDay = call.getBoolean("isAllDay", false);
        String location = call.getString("location");
        Intent intent = implementation.saveEventToCalendar(eventTitle, startDate, endDate, isAllDay, location);
        getActivity().startActivity(intent);
        call.resolve();
    }
}
