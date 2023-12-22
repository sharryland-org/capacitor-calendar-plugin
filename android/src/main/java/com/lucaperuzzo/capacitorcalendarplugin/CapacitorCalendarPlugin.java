package com.lucaperuzzo.capacitorcalendarplugin;

import android.content.Intent;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Locale;
import java.util.Objects;

@CapacitorPlugin(name = "CapacitorCalendar")
public class CapacitorCalendarPlugin extends Plugin {

    private CapacitorCalendar implementation = new CapacitorCalendar();

    @PluginMethod
    public void saveEventToCalendar(PluginCall call) throws ParseException {

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.getDefault());
        String eventTitle = call.getString("eventTitle", "");
        Calendar startDate = Calendar.getInstance();
        Calendar endDate = Calendar.getInstance();
        endDate.add(Calendar.HOUR, 1);
        String startDateString = call.getString("startDate");
        String endDateString = call.getString("endDate");
        if(startDateString!= null){
            startDate.setTime(Objects.requireNonNull(sdf.parse(startDateString)));
        }
        if(endDateString!= null){
            endDate.setTime(Objects.requireNonNull(sdf.parse(endDateString)));
        }
        Boolean isAllDay = call.getBoolean("isAllDay", false);
        Object location = call.getObject("location");
        Intent intent = implementation.saveEventToCalendar(eventTitle, startDate, endDate, isAllDay, location);
        getActivity().startActivity(intent);
        call.resolve();
    }
}
