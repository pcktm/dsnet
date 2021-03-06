'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class DSNET {
    /**
     * @param {string} accessToken A token obtained in OAUTH2 login flow
     * @param {string} baseUrl Optional API URL to exectute all queries against */
    constructor(accessToken, baseUrl = 'https://panel.dsnet.agh.edu.pl/api/beta') {
        this.accessToken = accessToken;
        this.baseURL = baseUrl;
    }
    /** Get dormitory types array, no idea if this actually ever changes */
    async getDormitoryTypes() {
        const res = (await axios_1.default.get(`${this.baseURL}/dormitory/types`, { headers: { 'Authorization': `Bearer ${this.accessToken}` } })).data;
        return res;
    }
    /**
     * Get list of all dormitories */
    async getDormitoryList() {
        const res = (await axios_1.default.get(`${this.baseURL}/dormitory/dormitories`, { headers: { 'Authorization': `Bearer ${this.accessToken}` } })).data;
        return res.map(el => {
            return {
                id: el.id,
                typeId: el.type_id,
                name: el.name,
                shortname: el.shortname
            };
        });
    }
    /**
     * Get list of all floors of a dormitory (returned floor)
     * @param dormitoryID An unique dormitory ID
     * @returns Returned floor IDs are unique across entire campus*/
    async getDormitoryFloors(dormitoryID) {
        const res = (await axios_1.default.get(`${this.baseURL}/dormitory/levels/${dormitoryID}`, { headers: { 'Authorization': `Bearer ${this.accessToken}` } })).data;
        return res.map(el => {
            return {
                id: el.id,
                floor: el.floor,
                name: el.name
            };
        });
    }
    /** Get list of all rooms at given floor */
    async getRoomsAtFloor(floorID) {
        const res = (await axios_1.default.get(`${this.baseURL}/dormitory/rooms/${floorID}`, { headers: { 'Authorization': `Bearer ${this.accessToken}` } })).data;
        return res.map(el => {
            return {
                id: el.id,
                name: el.name,
                capacity: el.capacity,
                rookie: el.rookie,
                marriage: el.marriage,
                disability: el.disability
            };
        });
    }
    /** Returns network limits info.
     * @see {@link NetworkInfo} for explanation
     */
    async getNetworkInfo() {
        const res = (await axios_1.default.get(`${this.baseURL}/network/transfer`, { headers: { 'Authorization': `Bearer ${this.accessToken}` } })).data;
        return {
            tenantId: res.tenant_id,
            upload: {
                used: res.upload_limited,
                limit: res.upload_limit
            },
            download: {
                used: {
                    limited: res.download_limited,
                    all: res.download_all
                },
                limit: res.download_limit
            },
            currentMultiplier: res.cost / 100
        };
    }
    /** Since DSNET does not provide proper datetime in API response, I'm trying to parse it manually from string. So watch out, might not be infallible. */
    async getReservations() {
        const reservations = await axios_1.default.get(`${this.baseURL}/reservations/current`, { headers: { 'Authorization': `Bearer ${this.accessToken}` } });
        const mappedRes = reservations.data.map((res) => {
            const parsedFrom = new Date(`${res.day}T${res.slot_name.split('-')[0]}`);
            const parsedTo = new Date(`${res.day}T${res.slot_name.split('-')[1]}`);
            if (parsedTo.getHours() < 6)
                parsedTo.setDate(parsedTo.getDate() + 1);
            return {
                reservationId: res.id,
                object: { id: res.object_id, name: res.object_name },
                parent: { id: res.parent_id, name: res.parent_name },
                slot: { id: res.slot_id, name: res.slot_name },
                from: parsedFrom,
                to: parsedTo
            };
        });
        return mappedRes;
    }
    async getUserInfo() {
        const basicInfo = (await axios_1.default.get(`${this.baseURL}/tenant/user`, { headers: { 'Authorization': `Bearer ${this.accessToken}` } })).data;
        const personalInfo = (await axios_1.default.get(`${this.baseURL}/tenant/personal`, { headers: { 'Authorization': `Bearer ${this.accessToken}` } })).data;
        // console.log({basic: userInfo.data, personal: personalUserInfo.data})
        return {
            tenantId: basicInfo.tenant_id,
            displayName: basicInfo.name + " " + basicInfo.surname,
            name: {
                first: basicInfo.name,
                last: basicInfo.surname
            },
            email: personalInfo.email,
            phone: personalInfo.phone,
            verified: basicInfo.verified,
            language: basicInfo.language,
            nationality: personalInfo.nationality,
            gender: personalInfo.gender,
        };
    }
    async getAccommodationInfo() {
        const res = await axios_1.default.get(`${this.baseURL}/tenant/accommodation`, { headers: { 'Authorization': `Bearer ${this.accessToken}` } });
        return {
            tenantId: res.data.tenant_id,
            room: {
                id: res.data.room_id,
                name: res.data.room,
            },
            dormitory: {
                id: res.data.dormitory_id,
                name: res.data.dormitory
            }
        };
    }
}
exports.default = DSNET;
