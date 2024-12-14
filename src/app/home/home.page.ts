import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { PicoYPlacaService } from '../service/service.service';
import { AlertModalComponent } from './modal-component/alert-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  plate: string = ''; 
  date: string = new Date().toISOString().split('T')[0]; 
  time: string = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); 
  dayOfWeek: string = ''; 
  showCalendar: boolean = false;
  showTimePicker: boolean = false; 
  result: string = ''; 

  daysOfWeek = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ];

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private picoYPlacaService: PicoYPlacaService
  ) 
  {
    this.updateDayOfWeek(); 
  }

  toggleTimePicker() {
    this.showTimePicker = !this.showTimePicker;
  }

  updateDayOfWeek() {
    const [year, month, day] = this.date.split('-').map(Number);
    const selectedDate = new Date(year, month - 1, day); 
    this.dayOfWeek = this.daysOfWeek[selectedDate.getDay()];
  }
  
  updateTime() {
    const currentTime = new Date(`1970-01-01T${this.time}:00`);
    this.time = currentTime.toTimeString().slice(0, 5); 
  }

  async presentAlertModal(message: string) {
    const alert = await this.alertController.create({
      header: 'Restricción de circulación',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  checkIfCanDrive() {
    if (!this.plate || !this.date || !this.time) {
      this.presentAlertModal('Por favor, complete todos los campos.');
      return;
    }
  
    // Validación de la placa para diferentes tipos de vehículos
    const plateRegex = /^[A-Za-z]{2,3}-\d{3,4}$/; // Acepta formatos como ABC-123, AB-1234, ABC-1234
    if (!plateRegex.test(this.plate)) {
      this.presentAlertModal('La placa ingresada no es válida. Asegúrese de que siga un formato correcto como: ABC-1234 o AB-123.');
      return;
    }
  
    this.updateDayOfWeek(); 
    const currentDayOfWeek = this.dayOfWeek;
  
    // Extraer el último dígito de la placa
    const lastDigit = parseInt(this.plate.slice(-1), 10);
  
    if (isNaN(lastDigit)) {
      this.presentAlertModal('La placa ingresada no es válida. Asegúrese de que contenga números.');
      return;
    }
  
    // Verificar si el vehículo tiene restricciones en el día actual
    if (!this.picoYPlacaService.isRestricted(lastDigit, currentDayOfWeek)) {
      this.presentAlertModal('¡Puede circular con normalidad durante todo el día!');
      return;
    }
  
    // Definir horarios restringidos
    const restrictedTimes = [
      { start: '06:00', end: '09:30' },
      { start: '16:00', end: '21:00' },
    ];
  
    // Verificar si está dentro de los horarios restringidos
    if (this.isTimeInRestrictedRange(this.time, restrictedTimes)) {
      this.presentAlertModal(`No puede circular en los horarios restringidos: 
        de ${restrictedTimes[0].start} a ${restrictedTimes[0].end}
       y de ${restrictedTimes[1].start} a ${restrictedTimes[1].end}`);
      return;
    }
  
    // Si no está en horario restringido, mostrar mensaje con horarios posibles
    this.presentAlertModal(`¡Puede circular en esta fecha y hora fuera de los horarios de resticción! 
      Los horarios de restricción para su vehiculo son:
      de ${restrictedTimes[0].start} a ${restrictedTimes[0].end} (Mañana)
      y de ${restrictedTimes[1].start} a ${restrictedTimes[1].end} (Tarde)`);
  }  

  private isTimeInRestrictedRange(time: string, restrictedTimes: { start: string, end: string }[]): boolean {
    const [hours, minutes] = time.split(':').map(Number);
    const timeInMinutes = hours * 60 + minutes;

    for (const range of restrictedTimes) {
      const [startHours, startMinutes] = range.start.split(':').map(Number);
      const [endHours, endMinutes] = range.end.split(':').map(Number);
      const startInMinutes = startHours * 60 + startMinutes;
      const endInMinutes = endHours * 60 + endMinutes;

      if (timeInMinutes >= startInMinutes && timeInMinutes <= endInMinutes) {
        return true;
      }
    }

    return false;
  }

  async openAlertModal() {
    const modal = await this.modalController.create({
      component: AlertModalComponent,
      cssClass: 'my-custom-class',
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();
    console.log('Datos recibidos del modal', data); 
  }

  clearFields() {
    this.plate = '';
    this.date = new Date().toISOString().split('T')[0];
    this.time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    this.result = '';
    this.updateDayOfWeek();
  }
}
