import Foundation
import Capacitor
import UIKit
import EventKit
import EventKitUI

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(SharrylandCapacitorCalendarPlugin)
public class SharrylandCapacitorCalendarPlugin: CAPPlugin {
    private let implementation = CapacitorCalendar()

    @objc func saveEventToCalendar(_ call: CAPPluginCall) {
        let eventStore = EKEventStore()
        checkPermissions(eventStore) {(permission) -> Void in
            if permission {
                let eventTitle = call.getString("eventTitle") ?? ""
                let eventDescription = call.getString("eventDescription") ?? ""
                let startDate = call.getDouble("startDate") ?? Date().millisecondsSince1970
                let endDate = call.getDouble("endDate") ?? Date().addingTimeInterval(3600).millisecondsSince1970
                let location = call.getString("location")
                let event = self.implementation.saveEventToCalendar(eventStore, eventTitle, eventDescription, startDate, endDate, location)
                DispatchQueue.main.async {
                    let controller = EKEventEditViewController()
                    let viewController = self.bridge?.viewController
                    controller.event = event
                    controller.eventStore = eventStore
                    controller.editViewDelegate = viewController
                    viewController!.present(controller, animated: true, completion: nil)
                }
                call.resolve()
            } else {
                call.reject("")
            }
        }
    }
    private func checkPermissions(_ eventStore: EKEventStore, completion: @escaping (Bool) -> Void) {
        switch EKEventStore.authorizationStatus(for: .event) {
        case .authorized, .writeOnly, .fullAccess:
            // The app has permission to access the calendar
            completion(true)
        case .denied:
            // The app doesn't have permission, prompt the user to grant permission
            completion(false)
        case .notDetermined:
            // Request permission from the user
            if #available(iOS 17.0, *) {
                eventStore.requestWriteOnlyAccessToEvents(completion: {[weak self] (granted: Bool, _: Error?) -> Void in
                    completion(granted)
                })
            } else {
                // Fallback on earlier versions
                eventStore.requestAccess(to: .event, completion: {[weak self] (granted: Bool, _: Error?) -> Void in
                    completion(granted)
                })
            }
        default:
            completion(false)
        }
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
