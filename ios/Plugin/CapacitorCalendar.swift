import Foundation
import Capacitor
import UIKit
import EventKit
import EventKitUI

@objc public class CapacitorCalendar: NSObject {

    func saveEventToCalendar(_ eventStore: EKEventStore, _ eventTitle: String, _ startDate: Double, _ endDate: Double, _ isAllDay: Bool, _ location: String?) -> EKEvent? {

        var event: EKEvent?
        // Check for permission to access the calendar
        switch EKEventStore.authorizationStatus(for: .event) {
        case .authorized:
            // The app has permission to access the calendar
            event = createEvent(eventStore, eventTitle, startDate, endDate, isAllDay, location)
        case .denied:
            // The app doesn't have permission, prompt the user to grant permission
            print("Access to calendar is denied. Please enable calendar access in settings.")
        case .notDetermined:
            // Request permission from the user
            if #available(iOS 17.0, *) {
                eventStore.requestWriteOnlyAccessToEvents(completion: {[weak self] (granted: Bool, _: Error?) -> Void in
                    if granted {
                        event = self?.createEvent(eventStore, eventTitle, startDate, endDate, isAllDay, location)
                    } else {
                        print("Access to calendar is denied. Please enable calendar access in settings.")
                    }
                })
            } else {
                // Fallback on earlier versions
                eventStore.requestAccess(to: .event, completion: {[weak self] (granted: Bool, _: Error?) -> Void in
                    if granted {
                        event = self?.createEvent(eventStore, eventTitle, startDate, endDate, isAllDay, location)
                    } else {
                        print("Access to calendar is denied. Please enable calendar access in settings.")
                    }
                })
            }
        default:
            break
        }
        return event
    }

    func createEvent(_ eventStore: EKEventStore, _ eventTitle: String, _ startDate: Double, _ endDate: Double, _ isAllDay: Bool, _ location: String?) -> EKEvent {
        // Create an event
        let event = EKEvent(eventStore: eventStore)
        event.title = eventTitle
        event.startDate = Date(milliseconds: startDate)
        event.endDate = Date(milliseconds: endDate)
        event.isAllDay = isAllDay
        event.structuredLocation = EKStructuredLocation.init(title: location ?? "")
        return event
    }
}
