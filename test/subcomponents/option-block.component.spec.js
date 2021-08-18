import { OptionBlock } from '../../app/subcomponents/option-block.component';

describe('OptionBlock', () => {
  let blockComponent;

  afterEach(() => {
    blockComponent = null;
  });

  describe('When OptionBlock is initialised', () => {
    it('Then throw a type error', () => {
      expect(() => { new OptionBlock({}); }).toThrow(new TypeError('Abstract class "OptionBlock" cannot be instantiated directly.'));
    });
  });
});