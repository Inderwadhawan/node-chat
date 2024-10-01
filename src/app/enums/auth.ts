export enum LOGIN_TYPE {
    EMAIL = "Email",
    PHONE = "Phone",
    GMAIL = "Gmail",
    APPLE = "Apple",
    FACEBOOK = "Facebook",
    GOOGLE = "Google",
}

export enum ACTION {
    LOGIN = "login",
    SINGUP = "signUp"
}

export enum HEIGHTTYPE {
    CMS = "CM",
    M = "M",
    FEET = "FEET"
}

export enum GENDER {
    MALE = "MALE",
    FEMALE = "FEMALE"
}

export enum WEIGHTTYPE {
    LBS = "LBS",
    KGS = "KGS"
}

export enum USER_ROLE {
    ADMIN = "ADMIN",
    USER = "USER",
    EMPLOYER = "EMPLOYER"
}

export enum DIFFICULTY {
    BEGINNER = "BEGINNER",
    INTERMEDIATE = "INTERMEDIATE",
    ADVANCED = "ADVANCED"
}

export enum STATUS {
    ACTIVE = "Active",
    INACTIVE = "Inactive",
    DELETED = "Deleted",
    BLOCKED = "Blocked",
    PENDING = "Pending",
    REFUNDED = "Refunded"
}

export enum PAYMENT_STATUS {
    ACTIVE = "Active",
    INACTIVE = "Inactive",
    BLOCKED = "Blocked",
    PENDING = "Pending",
    FAILED = "Failed",
    REFUND_REQUSTED = "refund_requested",
    IMPORTED = "Imported"
}

export enum RAZORPAY_PAYMENT_STATUS {
    ACTIVE = "captured",
    REFUND = "refunded",
    FAILED = "failed",
}

export enum EXCERCISETYPE{
    ONEDAY = "1-2 DAYS",
    TWODAY = "2-4 DAYS",
    FIVEDAY = ">5 DAYS",
    NOTHING = "Not At All",
}

export enum EXPERIENCEINLIFTING{
    BEGINNER = "BEGINNER (<2 Years)",
    INTERMEDIATE = "INTERMEDIATE (3-6 Years)",
    ADVANCED = "ADVANCED (>6 Years)",
}

export enum ACCESSORIES{
    DEFAULT = "ORIGINAL BOX SET (DEFAULT)",
    BASIC = "BASIC BENCH",
    MULTI = "MULTIFUNCTION BENCH",
}