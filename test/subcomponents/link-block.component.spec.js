import { LinkBlock } from '../../app/subcomponents/link-block.component';

describe('LinkBlock', () => {
  let block;

  const data = {
    type: "LINK",
    content: "link text",
    url: "http://www.example.url.com"
  };

  afterEach(() => {
    block = null;
  });

  describe('When LINK block is created', () => {
    beforeEach(() => {
      block = new LinkBlock(data);
    });

    it('And type is LINK', () => {
      expect(block.type).toBe('LINK');
    });

    it('And content is defined', () => {
      expect(block.content).toBe('link text');
    });

    it('And url is defined', () => {
      expect(block.url).toBe('http://www.example.url.com');
    });
  });
});