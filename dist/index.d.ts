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
    /** Returns network limits info.
     * @see {@link NetworkInfo} for explanation
     */
    getNetworkInfo(): Promise<types.NetworkInfo>;
    /** Since DSNET does not provide proper datetime in API response, I'm trying to parse it manually from string. So watch out, might not be infallible. */
    getReservations(): Promise<types.Reservation[]>;
    getUserInfo(): Promise<types.UserInfo>;
    getAccommodationInfo(): Promise<types.Accommodation>;
}
export default DSNET;
