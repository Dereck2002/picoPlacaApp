import { TestBed } from '@angular/core/testing';
import { PicoYPlacaService } from './service.service';

describe('PicoYPlacaService', () => {
  let service: PicoYPlacaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PicoYPlacaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should restrict plate with last digit 1 on Monday', () => {
    const lastDigit = 1;
    const dayOfWeek = 'Lunes';
    expect(service.isRestricted(lastDigit, dayOfWeek)).toBeTrue();
  });

  it('should allow plate with last digit 1 on Tuesday', () => {
    const lastDigit = 1;
    const dayOfWeek = 'Martes';
    expect(service.isRestricted(lastDigit, dayOfWeek)).toBeFalse();
  });

  it('should restrict plate with last digit 5 on Wednesday', () => {
    const lastDigit = 5;
    const dayOfWeek = 'Miércoles';
    expect(service.isRestricted(lastDigit, dayOfWeek)).toBeTrue();
  });

  it('should allow plate with last digit 5 on Thursday', () => {
    const lastDigit = 5;
    const dayOfWeek = 'Jueves';
    expect(service.isRestricted(lastDigit, dayOfWeek)).toBeFalse();
  });

  it('should restrict plate with last digit 0 on Friday', () => {
    const lastDigit = 0;
    const dayOfWeek = 'Viernes';
    expect(service.isRestricted(lastDigit, dayOfWeek)).toBeTrue();
  });

  it('should not restrict plates on weekends', () => {
    const lastDigit = 3;
    const saturday = 'Sábado';
    const sunday = 'Domingo';
    expect(service.isRestricted(lastDigit, saturday)).toBeFalse();
    expect(service.isRestricted(lastDigit, sunday)).toBeFalse();
  });
});
