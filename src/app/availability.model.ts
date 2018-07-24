import { Status } from './status.model.enum';

export interface Availability {
  date: Date;
  time: string;
  eventID: number;
  statusID: Status;
  timeslotID: number;
  availabilityStatus: Status;
}
