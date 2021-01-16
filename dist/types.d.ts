export interface UserInfo {
    tenantId: number;
    displayName: string;
    name: {
        first: string;
        last: string;
    };
    language: 'pl' | 'en';
    verified: boolean;
    email: string;
    phone: string;
    gender: 'm' | 'f';
    nationality: string;
}
export interface Reservation {
    reservationId: number;
    object: {
        id: number;
        name: string;
    };
    parent: {
        id: number;
        name: string;
    };
    slot: {
        id: number;
        name: string;
    };
    from: Date;
    to: Date;
}
export interface Accommodation {
    tenantId: number;
    room: {
        id: number;
        name: string;
    };
    dormitory: {
        id: number;
        name: string;
    };
}
export interface DormitoryType {
    id: number;
    name: string;
}
export interface Dormitory {
    id: number;
    typeId: number;
    name: string;
    shortname: string;
}
export interface Floor {
    id: number;
    floor: number;
    name: string;
}
export interface Room {
    id: number;
    name: string;
    capacity: number;
    rookie: boolean;
    marriage: boolean;
    disability: boolean;
}
export interface NetworkInfo {
    tenantId: number;
    upload: {
        used: number;
        limit: number;
    };
    download: {
        used: {
            limited: number;
            all: number;
        };
        limit: number;
    };
    currentMultiplier: number;
}
