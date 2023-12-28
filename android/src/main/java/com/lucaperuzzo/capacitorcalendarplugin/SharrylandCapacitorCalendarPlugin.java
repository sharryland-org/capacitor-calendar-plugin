package com.sharryland.capacitorcalendarplugin;

import android.Manifest;
import android.content.Intent;
import com.getcapacitor.PermissionState;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;
import com.getcapacitor.annotation.PermissionCallback;
import java.util.Calendar;

@CapacitorPlugin(
    name = "CapacitorCalendar",
    permissions = { @Permission(alias = "calendar", strings = { Manifest.permission.READ_CALENDAR, Manifest.permission.WRITE_CALENDAR }) }
)
public class SharrylandCapacitorCalendarPlugin extends Plugin {

    private CapacitorCalendar implementation = new CapacitorCalendar();

    @PluginMethod
    public void saveEventToCalendar(PluginCall call) {
        if (getPermissionState("calendar") == PermissionState.GRANTED) {
            createEvent(call);
        } else {
            requestPermissionForAlias("calendar", call, "calendarPermsCallback");
        }
    }

    @PermissionCallback
    private void calendarPermsCallback(PluginCall call) {
        if (getPermissionState("calendar") == PermissionState.GRANTED) {
            createEvent(call);
        } else {
            call.reject("");
        }
    }

    private void createEvent(PluginCall call) {
        String eventTitle = call.getString("eventTitle", "");
        String eventDescription = call.getString("eventDescription", "");
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
        String location = call.getString("location");
        Intent intent = implementation.saveEventToCalendar(eventTitle, eventDescription, startDate, endDate, location);
        getActivity().startActivity(intent);
        call.resolve();
    }
}
