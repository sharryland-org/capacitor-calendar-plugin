import Foundation
import Capacitor
import UIKit
import EventKit
import EventKitUI

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(CapacitorCalendarPlugin)
public class CapacitorCalendarPlugin: CAPPlugin {
    private let implementation = CapacitorCalendar()

    @objc func saveEventToCalendar(_ call: CAPPluginCall) {
        let eventStore = EKEventStore.init()
        let eventTitle = call.getString("eventTitle") ?? ""
        let startDate = call.getDouble("startDate") ?? Date().millisecondsSince1970
        let endDate = call.getDouble("endDate") ?? Date().addingTimeInterval(3600).millisecondsSince1970
        let isAllDay = call.getBool("isAllDay") ?? false
        let location = call.getString("location")
        let event = implementation.saveEventToCalendar(eventStore, eventTitle, startDate, endDate, isAllDay, location)
        DispatchQueue.main.async {
            let controller = EKEventEditViewController()
            let viewController = self.bridge?.viewController
            controller.event = event
            controller.eventStore = eventStore
            controller.editViewDelegate = viewController
            viewController!.present(controller, animated: true, completion: nil)
        }
        call.resolve()
    }

}
extension UIViewController: EKEventEditViewDelegate {
    public func eventEditViewController(_ controller: EKEventEditViewController, didCompleteWith action: EKEventEditViewAction) {
        controller.dismiss(animated: true, completion: nil)
    }
}
extension Date {
    var millisecondsSince1970: Double {
        Double((self.timeIntervalSince1970 * 1000.0).rounded())
    }
    
    init(milliseconds: Double) {
        self = Date(timeIntervalSince1970: TimeInterval(milliseconds) / 1000)
    }
}
