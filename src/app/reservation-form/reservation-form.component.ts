import { Appointment } from '../resengo/model/appointment.model';
import { Status } from '../status.model.enum';
import { ResengoService } from '../resengo/resengo.service';
import { Availability } from '../availability.model';
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FlowState } from '../resengo/model/flowState.model';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent {
  @Input() availabilities: Availability[];

  @Input() flowState: FlowState;

  @Output() appointment = new EventEmitter<Appointment>();

  @Output() flowStateUpdate = new EventEmitter<FlowState>();

  constructor(private resengo: ResengoService) {}

  getLabel(availability: Availability): string {
    return availability.time + (availability.availabilityStatus === Status.WAITING_LIST ? ' (wachtlijst)' : '');
  }

  doReservation(availability: Availability) {
    this.flowState.timeslotID = availability.timeslotID;
    this.flowState.arrivalDate = availability.date;
    this.flowState.arrivalTime = availability.arrivalTime;
    this.flowState.arrivalDateTime = availability.arrivalTime;
    this.flowState.eventID = availability.eventID;
    this.flowState.noPersons = availability.nbrOfPeople;
    this.resengo.initReservation(this.flowState).subscribe(res => {
      this.makeReservation(res.flowState);
    });
  }

  private makeReservation(flowState: FlowState) {
    flowState.activeStepId = 103;
    flowState.statusID = 20;
    flowState.acceptedPrivacyConditions = true;
    flowState.acceptedTerms = true;
    // flowState.titleID = 1;
    flowState.noParkings = 0;
    flowState.creditcard = { brand: 'VISA', cvc: '296', expiryMonth: 10, expiryYear: 2021, expirationDate: {}, number: '4236085187393425' };
    this.resengo.makeReservation(flowState).subscribe(appointment => this.appointment.emit(appointment));
  }

/*
my flowState upon call to /reservation:

{"isEditable":true,"activeStepId":103,"module":"CA","categoryID":0,"categoryLabel":null,"durationID":null,"durationTime":null,"durationUnit":null,"reservationID":19658405,"caClientID":1,"client":"The Jane Antwerp","eventID":17498003,"firstName":null,"lastName":null,"email":null,"company":null,"address":null,"postalcode":null,"city":null,"country":null,"guestName":"Wachten op registratie","guestEmail":null,"reserveForOther":false,"subscriptionName":null,"internalRemark":null,"remark":null,"onlineRes":false,"passage":false,"statusID":20,"waitingListPosition":0,"subscription":null,"reservationOrder":null,"advanceIsPercentage":false,"advancePercentage":0,"minimumAdvance":0,"parking":null,"phone":null,"isLastMinute":false,"lastMinuteError":false,"lastMinuteErrorMessage":null,"arrivalTime":"2018-08-16T12:30","departureDateTime":null,"arrivalDateTime":"2018-08-16T12:30:00+02:00","arrivalDate":"2018-08-16T00:00:00","guid":"e13eb718-f57a-4ca3-adbf-cca1ef1b4e8a","noPersons":4,"noPersons1":null,"noPersons2":null,"noPersons3":null,"noPersons4":null,"totalNOPersons":4,"offerID":null,"offerDescription":null,"pictureLink":null,"pictureLinkLarge":null,"offerLegalDescription":null,"flowID":101,"modifiedComments":false,"modified":false,"eventLabel":null,"clientID":745,"subClientID":285,"rN_PartnerID":51,"applicationID":1,"freeBitField1":null,"freeBitField2":null,"freeBitField3":null,"freeBitField4":null,"newsLetter":null,"enteredPinCode":0,"friendlyName":null,"loggedIn":true,"acceptedTerms":true,"acceptedPrivacyConditions":true,"priceMatrixID":0,"birthDay":null,"timeoutTime":"2018-07-27T18:03:27.3273983","timeslotID":1167505,"resourceID":null,"areaID":null,"reservationCost":{"showCost":false,"cost":0,"showAdvance":false,"advance":0},"creditcard":{"brand":"VISA","cvc":"296","expiryMonth":10,"expiryYear":2021,"expirationDate":{},"number":"4236085187393425"},"ogoneAuthorisation":null,"personID":2988920,"freeIntegerField1":null,"freeIntegerField2":null,"freeIntegerField3":null,"freeIntegerField4":null,"freeReferenceID1":null,"freeReferenceID2":null,"freeReferenceID3":null,"freeReferenceID4":null,"freeTextField1":null,"freeTextField2":null,"freeTextField3":null,"freeTextField4":null,"allergiesIncluded":false,"titleID":null,"memberID":null,"flowResultGuid":"c0071471-c11c-4e61-8c24-34db282ed13c","topMessage":"","middleMessage":"Reserveringen voor 7 of meer personen kunnen \r\nverstuurd worden naar contact@thejaneantwerp.com.","hourSelectionMessage":"","personProperties":null,"creditCardAliases":null,"voucherData":{"voucherTypeID":null,"voucherTypeLocked":false,"vouchers":null},"skipTableAssign":false,"reservationMode":10,"paymentType":null,"autoAssign":true,"reference":"Flow-NET","mobile":null,"voucherTypeID":null,"voucherID":null,"verificationCode":null,"smS_Voucher":null,"oF_OfferID":null,"noParkings":0,"telephone":null,"contactPerson":{"titleID":null,"first_Name":null,"last_Name":null,"email":null,"address":null,"postalCode":null,"city":null,"country":null,"mobile":null,"telephone":null,"personID":null,"birthDay":null,"company":null},"gaClientID":null}


official flowState upon call to /reservation:
{"extraGuardMessages":{},"initialDataError":null,"isEditable":true,"activeStepId":103,"module":"CA","durationTime":null,"durationUnit":null,"reservationID":19657886,"caClientID":1,"client":"The Jane Antwerp","eventID":17498003,"firstName":"Sem","lastName":"Flamez","email":"Sem.Flamez@gmail.com","company":null,"address":"Koolkapperstraat 28","postalcode":"9000","city":"Gent","country":"BE","guestName":null,"guestEmail":null,"reserveForOther":false,"subscriptionName":null,"internalRemark":null,"remark":null,"onlineRes":false,"passage":false,"statusID":20,"waitingListPosition":0,"subscription":null,"reservationOrder":null,"advanceIsPercentage":false,"advancePercentage":0,"minimumAdvance":0,"parking":null,"phone":{"countryPart":"+32","number":"0472780040"},"isLastMinute":false,"lastMinuteError":false,"lastMinuteErrorMessage":null,"arrivalTime":null,"departureDateTime":null,"arrivalDateTime":"2018-08-16T12:30:00","arrivalDate":"2018-08-15T22:00:00.000Z","guid":"15e6947d-b819-48f1-a278-56080d981c5e","totalNOPersons":0,"offerID":null,"offerDescription":null,"pictureLink":null,"pictureLinkLarge":null,"offerLegalDescription":null,"flowID":101,"modifiedComments":false,"modified":false,"eventLabel":null,"clientID":745,"subClientID":285,"rN_PartnerID":51,"applicationID":1,"freeBitField1":null,"freeBitField2":null,"freeBitField3":null,"freeBitField4":null,"newsLetter":false,"enteredPinCode":0,"friendlyName":"Sem Flamez","loggedIn":true,"acceptedTerms":true,"acceptedPrivacyConditions":true,"priceMatrixID":0,"birthDay":"1981-05-28T22:00:00.000Z","timeoutTime":"2018-07-27T17:44:04.5943608","timeslotID":1167505,"reservationCost":{"showCost":false,"cost":0,"showAdvance":false,"advance":0},"creditcard":{"brand":"VISA","number":"4236085187393425","expiryMonth":10,"expiryYear":2021,"cvc":"296","expirationDate":{}},"ogoneAuthorisation":{"isAlias":false,"aliases":null,"alias":null,"cardHolder":null,"number":null,"cvc":null,"expiryDate":null,"expiryMonth":0,"expiryYear":0,"remember":false,"errorMessage":null},"personID":2988920,"freeIntegerField1":null,"freeIntegerField2":null,"freeIntegerField3":null,"freeIntegerField4":null,"freeReferenceID2":null,"freeReferenceID3":null,"freeReferenceID4":null,"freeTextField1":null,"freeTextField2":null,"freeTextField3":null,"freeTextField4":null,"allergiesIncluded":false,"titleID":"2","memberID":null,"flowResultGuid":"22635b6d-fe0a-4105-94a7-d4eb200ddae9","topMessage":"","middleMessage":"Reserveringen voor 7 of meer personen kunnen \r\nverstuurd worden naar contact@thejaneantwerp.com.","hourSelectionMessage":"","personProperties":[{"personID":2988920,"email":"Sem.Flamez@gmail.com","company":null,"isOrganizer":true,"isGuest":false,"remark":null,"properties":[],"pictureLinkLarge":null,"friendlyName":"Sem Flamez","firstName":"Sem","lastName":"Flamez"},{"personID":null,"email":null,"company":null,"isOrganizer":false,"isGuest":true,"remark":null,"properties":[],"pictureLinkLarge":null,"friendlyName":" ","firstName":null,"lastName":null}],"creditCardAliases":null,"skipTableAssign":false,"reservationMode":0,"paymentType":null,"autoAssign":true,"reference":"Flow-NET","mobile":"+32-0472780040","voucherTypeID":null,"voucherID":null,"verificationCode":null,"smS_Voucher":null,"oF_OfferID":null,"noParkings":0,"telephone":null,"contactPerson":{"titleID":null,"first_Name":null,"last_Name":null,"email":null,"address":null,"postalCode":null,"city":null,"country":null,"mobile":null,"telephone":null,"personID":null,"birthDay":null,"company":null},"gaClientID":"27400373.1532004275","appointment":null,"isInlineMessage":false,"warpCompanyID":0,"voucherDescription":null,"categoryID":1507,"categoryLabel":"Middag","noPersons":4,"noPersons1":null,"noPersons2":null,"noPersons3":null,"noPersons4":null,"durationID":null,"noPersonsLabel":"Aantal personen","infoMessageDate":null,"dateMessageSet":false,"infoMessageTime":null,"timeMessageSet":false,"infoMessage":"","isModal":false,"reservationTimeout":899953.1248,"resourceID":null,"maxStepIndex":100,"activeStepIndex":100,"storingState":false,"storeStateAgain":false,"voucherData":{"vouchers":[]},"renderedExtraVouchers":true}


Difference can be checked at http://novicelab.org/jsonsortdiff/#diff
*/
}
