import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  plate: string = '';
  date: string = new Date().toISOString();
  time: string = new Date().toISOString();
  dayOfWeek: string = '';
  showCalendar: boolean = false;
  showTimePicker: boolean = false;
  result: string = '';
  currentTime: string = new Date().toLocaleTimeString();

  daysOfWeek = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ];

  restrictedDays: { [key: number]: string } = {
    1: 'Lunes',
    2: 'Lunes',
    3: 'Martes',
    4: 'Martes',
    5: 'Miércoles',
    6: 'Miércoles',
    7: 'Jueves',
    8: 'Jueves',
    9: 'Viernes',
    0: 'Viernes',
  };

  constructor() {
    this.updateDayOfWeek();
  }

  toggleCalendar() {
    this.showCalendar = !this.showCalendar;
  }

  toggleTimePicker() {
    this.showTimePicker = !this.showTimePicker;
  }

  updateDayOfWeek() {
    const selectedDate = new Date(this.date);
    this.dayOfWeek = this.daysOfWeek[selectedDate.getDay()];
  }

  checkIfCanDrive() {
    if (!this.plate || !this.date || !this.time) {
      this.result = 'Por favor, complete todos los campos.';
      return;
    }

    const lastDigit = this.plate.slice(-1);
    const restrictedDay = this.restrictedDays[parseInt(lastDigit, 10)];

    if (this.dayOfWeek === restrictedDay) {
      this.result = 'No puede circular en esta fecha.';
    } else {
      this.result = 'Puede circular en esta fecha.';
    }

    this.currentTime = new Date().toLocaleTimeString();
  }

  clearFields() {
    this.plate = '';
    this.date = new Date().toISOString();
    this.time = new Date().toISOString();
    this.result = '';
    this.updateDayOfWeek();
  }
}
