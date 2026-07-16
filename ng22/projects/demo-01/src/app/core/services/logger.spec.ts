import { TestBed } from '@angular/core/testing';

import { ERROR_LEVEL, Logger } from './logger';
import { Mock } from 'vitest';

describe('Logger', () => {
  let service: Logger;
  vi.spyOn(console, 'error');
  vi.spyOn(console, 'warn');
  vi.spyOn(console, 'info');
  vi.spyOn(console, 'log');

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Logger);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have default error level 4', () => {
    expect(service.level).toBe(4);
  });

  describe('When level is 4', () => {
    it('should log error messages ', () => {
      service.error('Test error');
      expect(console.error).toHaveBeenCalledWith('Test error');
    });

    it('should log warning messages ', () => {
      service.warn('Test warning');
      expect(console.warn).toHaveBeenCalledWith('Test warning');
    });

    it('should log info messages ', () => {
      service.info('Test info');
      expect(console.info).toHaveBeenCalledWith('Test info');
    });

    it('should log debug messages ', () => {
      service.log('Test debug');
      expect(console.log).toHaveBeenCalledWith('Test debug');
    });
  });

  describe('When level is 3', () => {
    beforeEach(() => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [{ provide: ERROR_LEVEL, useValue: 3 }],
      });
      service = TestBed.inject(Logger);
    });

    it('should have default error level 3', () => {
      expect(service.level).toBe(3);
    });

    it('should log error messages ', () => {
      service.error('Test error');
      expect(console.error).toHaveBeenCalledWith('Test error');
    });

    it('should log warning messages ', () => {
      service.warn('Test warning');
      expect(console.warn).toHaveBeenCalledWith('Test warning');
    });

    it('should log info messages ', () => {
      service.info('Test info');
      expect(console.info).toHaveBeenCalledWith('Test info');
    });

    it('should NOT log debug messages ', () => {
      (console.log as Mock).mockClear();
      service.log('Test debug');
      expect(console.log).not.toHaveBeenCalled();
    });
  });

  describe('When level is 2', () => {
    beforeEach(() => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [{ provide: ERROR_LEVEL, useValue: 2 }],
      });
      service = TestBed.inject(Logger);
    });

    it('should have default error level 2', () => {
      expect(service.level).toBe(2);
    });

    it('should log error messages ', () => {
      service.error('Test error');
      expect(console.error).toHaveBeenCalledWith('Test error');
    });

    it('should log warning messages ', () => {
      service.warn('Test warning');
      expect(console.warn).toHaveBeenCalledWith('Test warning');
    });

    it('should NOT log info messages ', () => {
      (console.info as Mock).mockClear();
      service.info('Test info');
      expect(console.info).not.toHaveBeenCalled();
    });

    it('should NOT log debug messages ', () => {
      (console.log as Mock).mockClear();
      service.log('Test debug');
      expect(console.log).not.toHaveBeenCalled();
    });
  });

  describe('When level is 1', () => {
    beforeEach(() => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [{ provide: ERROR_LEVEL, useValue: 1 }],
      });
      service = TestBed.inject(Logger);
    });

    it('should have default error level 1', () => {
      expect(service.level).toBe(1);
    });

    it('should log error messages ', () => {
      service.error('Test error');
      expect(console.error).toHaveBeenCalledWith('Test error');
    });

    it('should NOT log warning messages ', () => {
      (console.warn as Mock).mockClear();
      service.warn('Test warning');
      expect(console.warn).not.toHaveBeenCalled();
    });

    it('should NOT log info messages ', () => {
      (console.info as Mock).mockClear();
      service.info('Test info');
      expect(console.info).not.toHaveBeenCalled();
    });

    it('should NOT log debug messages ', () => {
      (console.log as Mock).mockClear();
      service.log('Test debug');
      expect(console.log).not.toHaveBeenCalled();
    });
  });

  describe('When level is 0', () => {
    beforeEach(() => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [{ provide: ERROR_LEVEL, useValue: 0 }],
      });
      service = TestBed.inject(Logger);
    });

    it('should have default error level 0', () => {
      expect(service.level).toBe(0);
    });

    it('should NOT log error messages ', () => {
      (console.error as Mock).mockClear();
      service.error('Test error');
      expect(console.error).not.toHaveBeenCalled();
    });

    it('should NOT log warning messages ', () => {
      (console.warn as Mock).mockClear();
      service.warn('Test warning');
      expect(console.warn).not.toHaveBeenCalled();
    });

    it('should NOT log info messages ', () => {
      (console.info as Mock).mockClear();
      service.info('Test info');
      expect(console.info).not.toHaveBeenCalled();
    });

    it('should NOT log debug messages ', () => {
      (console.log as Mock).mockClear();
      service.log('Test debug');
      expect(console.log).not.toHaveBeenCalled();
    });
  });
});
