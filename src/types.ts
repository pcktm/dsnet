export interface UserInfo {
    tenantId: number;
    displayName: string;
    name: {
      first: string,
      last: string,
    }
    language: 'pl' | 'en',
    verified: boolean,
    email: string,
    phone: string,
    gender: 'm' | 'f'; // >:(
    nationality: string;
}

export interface Reservation {
  reservationId: number;
  object: { id: number, name: string };
  parent: { id: number, name: string };
  slot: { id: number, name: string };
  from: Date;
  to: Date;
}

export interface Accommodation {
  tenantId: number;
  room: {
    id: number
    name: string
  };
  dormitory: {
    id: number
    name: string
  };
}

export interface DormitoryType {
  id: number;
  name: string
}

export interface Dormitory {
  id: number;
  typeId: number;
  name: string;
  shortname: string;
}

export interface Floor {
  /** Floor IDs are unique across entire campus */
  id: number;
  /** Basically the vertical floor index, the very bottom floor being 0 */
  floor: number;
  name: string;
}

export interface Room {
  id: number;
  /** @example For example: "411B" */
  name: string;
  /** How many people can reside in this room */
  capacity: number;
  /** Thanks to DSNET not documenting their API, we don't know for sure.
   * It may mean that this room is occupied by a person for whom this is the first year in the dormitory.
   */
  rookie: boolean;
  /** Might mean that a married couple occupies this room.*/
  marriage: boolean;
  /** Might mean that a disabled person occupies this room.*/
  disability: boolean;
}

/** Network limits info */
export interface NetworkInfo {
  tenantId: number;
  /** Upload, unlike download, is always limited, no matter the hour or the weekday */
  upload: {
    used: number;
    limit: number;
  }
  /** Download limit is calculated by multiplying the traffic with @link {currentMultipier}. */
  download: {
    used: {
      /** Downloaded data that counts towards the limit */
      limited: number;
      /** All downloaded data, even the one that was downloaded when @link {currentMultiplier} was 0.0 */
      all: number;
    }
    limit: number;
  }
  /** Download gets multipied by this ammount to calculate how much of it counts towards the limit.
   * Watch out: **can be bigger than one!**
   */
  currentMultiplier: number;
}