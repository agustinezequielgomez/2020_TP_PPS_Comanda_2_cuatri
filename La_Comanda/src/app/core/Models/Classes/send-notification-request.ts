export interface SendNotificationRequest<T> {
    registration_ids: string[];
    notification: Notification;
    data: T;
}

export interface SendNotificationResponse {
    multicast_id: number;
    success: number;
    failure: number;
    canonical_ids: number;
    results: { message_id: string }[];
}

export interface Notification {
    title: string;
    body: string;
    icon?: string;
    sound?: string;
    color?: string;
}
