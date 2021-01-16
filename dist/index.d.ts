import * as types from './types';
declare class DSNET {
    /** A token obtained in OAUTH2 login flow */
    private accessToken;
    /** Optional API URL to exectute all queries against */
    baseURL: string;
    /**
     * @param {string} accessToken A token obtained in OAUTH2 login flow
     * @param {string} baseUrl Optional API URL to exectute all queries against */
    constructor(accessToken: string, baseUrl?: string);
    /** Get dormitory types array, no idea if this actually ever changes */
    getDormitoryTypes(): Promise<types.DormitoryType[]>;
    /**
     * Get list of all dormitories */
    getDormitoryList(): Promise<types.Dormitory[]>;
    /**
     * Get list of all floors of a dormitory (returned floor)
     * @param dormitoryID An unique dormitory ID
     * @returns Returned floor IDs are unique across entire campus*/
    getDormitoryFloors(dormitoryID: number): Promise<types.Floor[]>;
    /** Get list of all rooms at given floor */
    getRoomsAtFloor(floorID: number): Promise<types.Room[]>;
    getNetworkInfo(): Promise<types.NetworkInfo>;
    getReservations(): Promise<types.Reservation[]>;
    getUserInfo(): Promise<types.UserInfo>;
    getAccomodationInfo(): Promise<types.Accommodation>;
}
export default DSNET;
