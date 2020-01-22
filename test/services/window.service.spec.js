import windowService from '../../app/services/window.service';

describe('Window Service', () => {
  let digiman, secondDigiman;
  const digimanOne = {
    definition: { id: 'definition' },
    state: { id: 'state' },
    type: 'TYPE'
  };
  const digimanTwo = {
    definition: { id: 'definition' },
    state: { id: 'state' },
    type: 'TYPE-TWO'
  };

  afterEach(() => {
    window.digimanStub = [];
    digiman = null;
    secondDigiman = null;
  });

  beforeEach(() => {
    window.digimanStub = [
      digimanOne, digimanTwo
    ];
  });

  describe('When checkStubData is called in Window Service', () => {
    beforeEach(() => {
      digiman = windowService.checkStubData();
    });

    it('Then true is returned as there are digiman in window.digimanStub', () => {
      expect(digiman).toBe(true);
    });
  });

  describe('When first digiman is requested from Window Service', () => {
    beforeEach(() => {
      digiman = windowService.getFirstDigiman();
    });

    it('Then the returned digiman should match the first digiman in window.digimanStub', () => {
      expect(digiman).toEqual(digimanOne);
    });
  });

  describe('When digimans are requested from Window Service', () => {
    beforeEach(() => {
      digiman = windowService.getDigiman('TYPE-TWO');
      secondDigiman = windowService.getDigiman('TYPE');
    });

    it('Then the returned digiman should match the TYPE-TWO', () => {
      expect(digiman).toEqual(digimanTwo);
    });

    it('Then the returned digiman should match the TYPE', () => {
      expect(secondDigiman).toEqual(digimanOne);
    });
  });

  describe('When first digiman is removed from Window Service', () => {
    beforeEach(() => {
      windowService.removeDigiman('TYPE');
      digiman = windowService.getFirstDigiman('TYPE-TWO');
      secondDigiman = windowService.getDigiman('TYPE');
    });

    it('Then the first returned digiman should match the TYPE-TWO', () => {
      expect(digiman).toEqual(digimanTwo);
    });

    it('And the removed type is null when requested', () => {
      expect(secondDigiman).toEqual(undefined);
    });
  });
});