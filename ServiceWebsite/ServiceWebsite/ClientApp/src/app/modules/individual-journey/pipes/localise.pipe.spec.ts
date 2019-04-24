import { Localisation } from 'src/app/modules/shared/localisation';
import { LocalisePipe } from './localise.pipe';

describe('LocalisePipe', () => {
  it('passes text and value to localisation class for localisation', () => {
    const localisation = jasmine.createSpyObj<Localisation>(['get']);
    localisation.get.and.callFake((value: string, arg: string) => {
      if (arg) {
        return 'called with argument';
      }
      return value;
    });

    const pipe = new LocalisePipe(localisation);

    expect(pipe.transform('just a value')).toBe('just a value');
    expect(pipe.transform('just a value', 'and an argument')).toBe('called with argument');
  });
});
