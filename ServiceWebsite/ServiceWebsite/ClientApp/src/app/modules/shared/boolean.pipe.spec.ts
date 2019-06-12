import { AppYesNoPipe } from './boolean.pipe';

describe('YesNoPipe', () => {

  it('should return Yes', () => {
    const pipe = new AppYesNoPipe();
    const result = pipe.transform(true);
    expect(result).toBe('Yes');
  });

  it('should return No', () => {
    const pipe = new AppYesNoPipe();
    const result = pipe.transform(false);
    expect(result).toBe('No');
  });

  it('should return Error', () => {
    const pipe = new AppYesNoPipe();
    expect(() => pipe.transform(null)).toThrow(new Error(`Unexpected bool value: ${null}`));
  });
});
