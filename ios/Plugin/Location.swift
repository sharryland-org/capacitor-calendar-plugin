//
//  Location.swift
//  CapacitorCalendarPlugin
//
//  Created by Luca Peruzzo on 22/12/23.
//

import Foundation
@objc public class Location: NSObject {
    let title: String
    let latitude: Double?
    let longitude: Double?

    init(title: String, latitude: Double?, longitude: Double?) {
        self.title = title
        self.latitude = latitude
        self.longitude = longitude
    }
}
