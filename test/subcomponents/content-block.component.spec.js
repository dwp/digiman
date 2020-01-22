import { ContentBlock } from '../../app/subcomponents/content-block.component';

describe('ContentBlock', () => {
  let block;

  const paragraphData = {
      type: "PARAGRAPH",
      content: "PARAGRAPH Text"
  };
  const hintData = {
      type: "HINT",
      content: "HINT Text"
  };
  const listData = {
      type: "LIST",
      content: ["List item 1", "List item 2"]
  };
  const breakData = {
      type: "BREAK"
  };
  const importantData = {
      type: "IMPORTANT",
      content: "IMPORTANT Text"
  };

  afterEach(() => {
    block = null;
  });

  describe('When PARAGRAPH block is created', () => {
    beforeEach(() => {
      block = new ContentBlock(paragraphData);
    });

    it('Then object html is correct', () => {
      expect(block.html).toBe('<p class="govuk-body text">PARAGRAPH Text</p>');
    });

    it('And type is PARAGRAPH', () => {
      expect(block.type).toBe('PARAGRAPH');
    });

    it('And content is as defined', () => {
      expect(block.content).toBe('PARAGRAPH Text');
    });
  });

  describe('When HINT block is created', () => {
    beforeEach(() => {
      block = new ContentBlock(hintData);
    });

    it('Then object html is correct', () => {
      expect(block.html).toBe('<p class="govuk-hint text">HINT Text</p>');
    });

    it('And type is HINT', () => {
      expect(block.type).toBe('HINT');
    });

    it('And content is as defined', () => {
      expect(block.content).toBe('HINT Text');
    });
  });

  describe('When LIST block is created', () => {
    beforeEach(() => {
      block = new ContentBlock(listData);
    });

    it('Then object html is correct', () => {
      expect(block.html).toBe(`<ul class="govuk-list govuk-list--bullet text">
    <li>List item 1</li>
    <li>List item 2</li>
</ul>`);
    });

    it('And type is LIST', () => {
      expect(block.type).toBe('LIST');
    });

    it('And content is as defined', () => {
      expect(block.content).toEqual(["List item 1", "List item 2"]);
    });
  });

  describe('When BREAK block is created', () => {
    beforeEach(() => {
      block = new ContentBlock(breakData);
    });

    it('Then object html is correct', () => {
      expect(block.html).toBe('<br />');
    });

    it('And type is BREAK', () => {
      expect(block.type).toBe('BREAK');
    });

    it('And content is as defined', () => {
      expect(block.content).toBe(undefined);
    });
  });

  describe('When IMPORTANT block is created', () => {
    beforeEach(() => {
      block = new ContentBlock(importantData);
    });

    it('Then object html is correct', () => {
      expect(block.html).toBe('<p class="govuk-inset-text text">IMPORTANT Text</p>');
    });

    it('And type is IMPORTANT', () => {
      expect(block.type).toBe('IMPORTANT');
    });

    it('And content is as defined', () => {
      expect(block.content).toBe('IMPORTANT Text');
    });
  });
});