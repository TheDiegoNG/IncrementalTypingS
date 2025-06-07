import { Upgrade } from './upgrade';

describe('Upgrade', () => {
  it('should create an instance', () => {
    const upg = new Upgrade('Test', 'desc', 1, 'FirstUpgradePoints', 'Starter');
    expect(upg).toBeTruthy();
  });
});
