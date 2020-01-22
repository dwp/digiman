import { Block } from '../../app/subcomponents/block.component';

describe('Block', () => {
  let blockComponent;
  const data = {
      type: "PARAGRAPH",
      text: "Test Text"
  };

  afterEach(() => {
    blockComponent = null;
  });

  describe('When Block is initialised', () => {
    it('Then throw a type error', () => {
      expect(() => { new Block({}); }).toThrow(new TypeError('Abstract class "Block" cannot be instantiated directly.'));
    });
  });
});