import { LocalisePipe } from './pipes/localise.pipe';

describe('LocalisePipe', () => {
  it('create an instance', () => {
    const pipe = new LocalisePipe();
    expect(pipe).toBeTruthy();
  });
});
