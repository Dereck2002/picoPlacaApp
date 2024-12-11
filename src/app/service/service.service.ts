import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PicoYPlacaService {
  // Restricciones de placas por día de la semana (basado en el último dígito)
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

  // Verificar si el último dígito tiene restricción en el día de la semana
  isRestricted(lastDigit: number, dayOfWeek: string): boolean {
    const restrictedDay = this.restrictedDays[lastDigit];
    return restrictedDay === dayOfWeek; // Comparar con el día actual
  }
}
