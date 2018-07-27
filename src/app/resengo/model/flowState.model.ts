import { CreditCard } from './creditCard.model';
export interface FlowState {
  activeStepId?: number;
  eventID?: number;
  statusID?: number;
  arrivalTime?: string;
  arrivalDateTime?: string;
  arrivalDate?: string;
  noPersons?: number;
  flowID?: number;
  clientID?: number;
  subClientID?: number;
  applicationID?: number;
  acceptedTerms?: boolean;
  acceptedPrivacyConditions?: boolean;
  timeslotID?: number;
  creditcard?: CreditCard;
  noParkings?: number;
}
