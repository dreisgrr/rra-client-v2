export const ACTION_TYPES = {
    START: "START",
    SUCCESS: "SUCCESS",
    FAILURE: "FAILURE",
    LOGOUT: "LOGOUT",
};
export const DEFAULT_NAMES = {
    APP_NAME: "Space Reservation App",
    CARELON_SITES: "Carelon Global Solutions Sites",
    LOADING_MESSAGE: "Loading...",
    NO_SITES: "No Sites",
}
export const ROLES = {
    ADMIN: "Admin",
    FACILITY: "Facility",
    WORKFORCE: "Workforce",
    MANAGER: "Manager",
    ASSOC: "Associate"
}
export const SPACE_TYPES_CODES = {
    conference: "Conference Rooms",
    training: "Training Rooms",
    gym: "Gyms",
    sleeping: "Sleeping Quarters",
    seat: "Seats"
}
export const SPACE_TYPES_NAMES = {
    CONFERENCE: "Conference Rooms",
    TRAINING: "Training Rooms",
    GYM: "Gyms",
    SLEEPING_QUARTER: "Sleeping Quarters",
    SEAT: "Seats"
}
export const SPACE_TYPES = {
    CONFERENCE: "conference",
    TRAINING: "training",
    GYM: "gym",
    SLEEPING_QUARTERS: "sleeping",
    SEAT: "seat"
}

export const SITE_DEFAULT_ID = '63b56fea41184440f9f90696'

export const SITE_NAMES = {
    AGT: "Alliance Global Tower",
    GLAS: "GLAS Tower",
    OFT: "One Fintech",
    SMS: "SM Strata"
}

export const DURATION_VALUES = ["1", "2", "3", "4"]

export const ERROR_MESSAGE = {
    CONTACT: "Contact System Administrator"
}
export const MODAL_MESSAGE = {
    RESERVATION_LIMIT: "Reservation Limit"
}

export const reservationStatusActions = [
    { name: "cancel", value: "CANCELLED" },
    { name: "approve", value: "APPROVED" },
    { name: "reject", value: "REJECTED" },
    { name: "check in", value: "CHECKED IN" },
];

export const reservationStatus = {
    SUBMITTED: "SUBMITTED",
    APPROVED: "APPROVED",
    REJECTED: "REJECTED",
    CANCELLED: "CANCELLED",
};

export const GLOBAL = {
    SESSION_DURATION: 1000 * 60 * 10 // 10 minutes
}