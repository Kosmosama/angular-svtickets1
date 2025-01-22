import { MyEvent } from "./my-event";
import { User } from "./user";

export interface EventsResponse {
    events: MyEvent[];
    more: boolean;
    page: number;
    count: number;
}

export interface SingleEventResponse {
    event: MyEvent;
}

export interface TokenResponse {
    accessToken: string;
}

export interface UserResponse {
    user: User;
}