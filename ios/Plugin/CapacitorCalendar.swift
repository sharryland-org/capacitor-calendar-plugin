import Foundation
import Capacitor
import UIKit
import EventKit
import EventKitUI

@objc public class CapacitorCalendar: NSObject {

    func saveEventToCalendar(_ eventStore: EKEventStore, _ eventTitle: String, _ eventDescription: String, _ startDate: Double, _ endDate: Double, _ location: String?) -> EKEvent? {
        let event = EKEvent(eventStore: eventStore)
        event.title = eventTitle
        event.notes = eventDescription
        event.startDate = Date(milliseconds: startDate)
        event.endDate = Date(milliseconds: endDate)
        event.structuredLocation = EKStructuredLocation(title: location ?? "")
        return event
    }

}
