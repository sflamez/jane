import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';
import { CheckAvailabilityFormComponent } from './check-availability-form/check-availability-form.component';

@NgModule({
  declarations: [AppComponent, CheckAvailabilityFormComponent, ReservationFormComponent],
  imports: [BrowserModule, HttpClientModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
