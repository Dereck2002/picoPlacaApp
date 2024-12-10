import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

class PicoYPlaca {
  private restrictedDays: any = {
    lunes: [1, 2],
    martes: [3, 4],
    miercoles: [5, 6],
    jueves: [7, 8],
    viernes: [9, 0],
  };

  private restrictedHours: Array<[number, number]> = [
    [360, 570], // 06:00 - 09:30 en minutos
    [960, 1260], // 16:00 - 21:00 en minutos
  ];

  constructor(private plate: string, private date: string, private time: string) {}

  public checkIfCanDrive(): string {
    const lastDigit = this.getLastDigit(this.plate);
    if (lastDigit === -1) return 'Formato de placa inválido. Verifique e intente nuevamente.';

    const dayOfWeek = this.getDayOfWeek(this.date);
    const currentTimeMinutes = this.timeToMinutes(this.time);

    if (this.restrictedDays[dayOfWeek] && this.restrictedDays[dayOfWeek].includes(lastDigit)) {
      if (this.isRestrictedTime(currentTimeMinutes)) {
        return `¡No puede circular en este momento! Su vehículo tiene restricción los ${dayOfWeek}s.`;
      } else {
        return '¡Puede circular! Actualmente no está en horario restringido.';
      }
    } else {
      return '¡Puede circular! Su vehículo no tiene restricción en esta fecha.';
    }
  }

  private getLastDigit(plate: string): number {
    const match = plate.match(/\d+$/);
    return match ? parseInt(match[0].slice(-1), 10) : -1;
  }

  private getDayOfWeek(date: string): string {
    const days = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
    const parsedDate = new Date(date);
    return days[parsedDate.getDay()];
  }

  private timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  private isRestrictedTime(currentTime: number): boolean {
    return this.restrictedHours.some(([start, end]) => currentTime >= start && currentTime <= end);
  }
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  plate: string = ''; 
  date: string = ''; 
  time: string = ''; 
  result: string = ''; 

  constructor(private alertController: AlertController) {}

  checkIfCanDrive() {
    if (!this.plate || !this.date || !this.time) {
      this.result = 'Por favor ingrese todos los campos: placa, fecha y hora.';
      return;
    }

    const picoYPlaca = new PicoYPlaca(this.plate, this.date, this.time);
    this.result = picoYPlaca.checkIfCanDrive();
    this.presentAlert();
  }

  clearFields() {
    this.plate = '';
    this.date = '';
    this.time = '';
    this.result = '';
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Resultado',
      message: this.result,
      buttons: ['OK'],
    });

    await alert.present();
  }

  ngOnInit() {
    const currentDate = new Date();
    this.date = currentDate.toISOString().split('T')[0];
    this.time = currentDate.toTimeString().split(' ')[0].slice(0, 5);
  }
}
