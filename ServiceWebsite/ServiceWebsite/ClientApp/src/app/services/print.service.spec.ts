import {PrintService} from './print.service';

describe('print.service', () => {
  let service: PrintService;

  beforeAll(() => {
    service = new PrintService();
  });

  it('gets and sets the innerHTML to print contents from provided element id', () => {
    const div = document.createElement('div');
    div.setAttribute('id', 'myId');
    const p = document.createElement('p');
    div.appendChild(p);
    document.body.appendChild(div);
    const original = document.body.innerHTML;

    window.print = function() { };
    service.printPage('myId');

    expect(document.body.innerHTML).toBe(original);
  });
});
