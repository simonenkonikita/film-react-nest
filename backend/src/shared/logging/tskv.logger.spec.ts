import { TskvLogger } from './tskv.logger';
import { describe, beforeEach, afterEach, it, expect, jest } from '@jest/globals';

describe('TskvLogger', () => {
  let logger: TskvLogger;
  let stdoutSpy: jest.SpiedFunction<typeof process.stdout.write>;
  let stderrSpy: jest.SpiedFunction<typeof process.stderr.write>;

  beforeEach(() => {
    logger = new TskvLogger();
    stdoutSpy = jest.spyOn(process.stdout, 'write').mockImplementation(() => true);
    stderrSpy = jest.spyOn(process.stderr, 'write').mockImplementation(() => true);
  });

  afterEach(() => {
    stdoutSpy.mockRestore();
    stderrSpy.mockRestore();
  });

  describe('log method', () => {
    it('should write to stdout with TSKV format', () => {
      logger.log('test log message');

      expect(stdoutSpy).toHaveBeenCalledTimes(1);

      const output = stdoutSpy.mock.calls[0][0] as string;;

      expect(output).toContain('level=log');
      expect(output).toContain('message="test log message"');
      expect(output).toContain('timestamp=');
    });
  });

  describe('error method', () => {
    it('should write to stderr with TSKV format', () => {
      logger.error('test error message');

      expect(stderrSpy).toHaveBeenCalledTimes(1);
      expect(stdoutSpy).not.toHaveBeenCalled();

      const output = stderrSpy.mock.calls[0][0] as string;

      expect(output).toContain('level=error');
      expect(output).toContain('message="test error message"');
      expect(output).toContain('timestamp=');
    });
  });
  });
