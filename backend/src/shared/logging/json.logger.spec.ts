import { JsonLogger } from './json.logger';
import { describe, beforeEach, afterEach, it, expect, jest } from '@jest/globals';

describe('JsonLogger', () => {
  let logger: JsonLogger;
  let consoleLogSpy: jest.SpiedFunction<typeof console.log>;
  let consoleErrorSpy: jest.SpiedFunction<typeof console.error>;
  let consoleWarnSpy: jest.SpiedFunction<typeof console.warn>;
  let consoleDebugSpy: jest.SpiedFunction<typeof console.debug>;
  let consoleInfoSpy: jest.SpiedFunction<typeof console.info>;

  beforeEach(() => {
    logger = new JsonLogger();
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => { });
    consoleDebugSpy = jest.spyOn(console, 'debug').mockImplementation(() => { });
    consoleInfoSpy = jest.spyOn(console, 'info').mockImplementation(() => { });
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
    consoleWarnSpy.mockRestore();
    consoleDebugSpy.mockRestore();
    consoleInfoSpy.mockRestore();
  });

  describe('log method', () => {
    it('should call console.log with JSON string', () => {
      logger.log('test log message');

      expect(consoleLogSpy).toHaveBeenCalledTimes(1);

      const loggedMessage = consoleLogSpy.mock.calls[0][0];
      const parsedLog = JSON.parse(loggedMessage);

      expect(parsedLog.level).toBe('log');
      expect(parsedLog.message).toBe('test log message');
      expect(parsedLog.timestamp).toBeDefined();
    });
  });

  describe('error method', () => {
    it('should call console.error with JSON string', () => {
      logger.error('test error message');

      expect(consoleErrorSpy).toHaveBeenCalledTimes(1);

      const errorMessage = consoleErrorSpy.mock.calls[0][0];
      const parsedError = JSON.parse(errorMessage);

      expect(parsedError.level).toBe('error');
      expect(parsedError.message).toBe('test error message');
      expect(parsedError.timestamp).toBeDefined();
    });
  });

  describe('warn method', () => {
    it('should call console.warn with JSON string', () => {
      logger.warn('test warn message');

      expect(consoleWarnSpy).toHaveBeenCalledTimes(1);

      const warnMessage = consoleWarnSpy.mock.calls[0][0];
      const parsedWarn = JSON.parse(warnMessage);

      expect(parsedWarn.level).toBe('warn');
      expect(parsedWarn.message).toBe('test warn message');
      expect(parsedWarn.timestamp).toBeDefined();
    });
  });

  describe('debug method', () => {
    it('should call console.debug with JSON string', () => {
      logger.debug('test debug message');

      expect(consoleDebugSpy).toHaveBeenCalledTimes(1);

      const debugMessage = consoleDebugSpy.mock.calls[0][0];
      const parsedDebug = JSON.parse(debugMessage);

      expect(parsedDebug.level).toBe('debug');
      expect(parsedDebug.message).toBe('test debug message');
      expect(parsedDebug.timestamp).toBeDefined();
    });
  });

  describe('verbose method', () => {
    it('should call console.info with JSON string', () => {
      logger.verbose('test verbose message');

      expect(consoleInfoSpy).toHaveBeenCalledTimes(1);

      const verboseMessage = consoleInfoSpy.mock.calls[0][0];
      const parsedVerbose = JSON.parse(verboseMessage);

      expect(parsedVerbose.level).toBe('verbose');
      expect(parsedVerbose.message).toBe('test verbose message');
      expect(parsedVerbose.timestamp).toBeDefined();
    });
  });
});
