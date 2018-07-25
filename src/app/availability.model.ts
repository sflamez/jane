import { Status } from './status.model.enum';

export interface Availability {
  date?: string;
  time?: string;
  nbrOfPeople?: number;
  eventID?: number;
  statusID?: Status;
  timeslotID?: number;
  availabilityStatus?: Status;
}
