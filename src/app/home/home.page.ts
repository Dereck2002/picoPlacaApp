import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

class PicoYPlaca {
  private restrictedDays: any = {
    lunes: [1, 2],
    martes: [3, 4],
    miércoles: [5, 6],
    jueves: [7, 8],
    viernes: [9, 0],
  };

  private restrictedHours: Array<[string, string]> = [
    ["06:00", "09:30"],
    ["16:00", "21:00"]
  ];

  constructor(private plate: string, private date: string, private time: string) {}

  public checkIfCanDrive(): string {
    const lastDigit = this.getLastDigit(this.plate);
    const dayOfWeek = this.getDayOfWeek(this.date);
    const currentTime = this.time;

    if (this.restrictedDays[dayOfWeek] && this.restrictedDays[dayOfWeek].includes(lastDigit)) {

      if (this.isRestrictedTime(currentTime)) {
        return '¡No puede circular en este momento!';
      } else {
        return '¡Puede circular!';
      }
    } else {
      return '¡Puede circular!';
    }
  }

  private getLastDigit(plate: string): number {
    const match = plate.match(/\d+$/);
    return match ? parseInt(match[0].slice(-1), 10) : -1;
  }

  private getDayOfWeek(date: string): string {
    const days = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    const parsedDate = new Date(date);
    return days[parsedDate.getDay()];
  }

  private isRestrictedTime(time: string): boolean {
    return this.restrictedHours.some(([start, end]) => time >= start && time <= end);
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
