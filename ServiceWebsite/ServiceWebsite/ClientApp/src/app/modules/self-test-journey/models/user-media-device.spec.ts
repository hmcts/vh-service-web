import { UserMediaDevice } from './user-media-device';

describe('create instance of UserMediaDevice', () => {
  const model = new UserMediaDevice('label', '123', 'audioinput', '');

  it('instance is created', () => {
    expect(model).toBeTruthy();
    expect(model.label).toEqual('label');
    expect(model.groupId).toEqual('');
    expect(model.kind).toEqual('audioinput');
    expect(model.deviceId).toEqual('123');
  });
});
