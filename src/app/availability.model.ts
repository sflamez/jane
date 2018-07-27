import { Status } from './status.model.enum';

export interface Availability {
  date?: string;
  time?: string;
  nbrOfPeople?: number;
  statusID?: Status;
  availabilityStatus?: Status;
  arrivalDate?: string;
  arrivalTime?: string;
  timeslotID?: number;
  eventID?: number;
}
