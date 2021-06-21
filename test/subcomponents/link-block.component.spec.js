import { LinkBlock } from '../../app/subcomponents/link-block.component';

describe('LinkBlock', () => {
  let block;

  const data = {
    type: "LINK",
    text: "link text",
    url: "http://www.example.url.com"
  };

  afterEach(() => {
    block = null;
  });

  describe('When PARAGRAPH block is created', () => {
    beforeEach(() => {
      block = new LinkBlock(data);
    });

    it('Then object html is correct', () => {
      expect(block.htmlNode.outerHTML).toBe(`<div class="govuk-body text">
  <a href="http://www.example.url.com" class="govuk-link" target="_blank" rel="external noopener noreferrer">link text</a>
</div>`);
    });

    it('And type is LINK', () => {
      expect(block.type).toBe('LINK');
    });

    it('And text is defined', () => {
      expect(block.text).toBe('link text');
    });

    it('And url is defined', () => {
      expect(block.url).toBe('http://www.example.url.com');
    });
  });
});