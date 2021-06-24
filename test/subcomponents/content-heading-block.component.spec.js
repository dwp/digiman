import { ContentHeadingBlock } from '../../app/subcomponents/content-heading-block.component';

describe('ContentHeadingBlock', () => {
  let block;

  const data1 = {
    type: "HEADING",
    content: "HEADING Text",
    hasIntroductionHeading: false,
    isSectionWithIntroductionHeading: false
  };

  const data2 = {
    type: "HEADING",
    content: "HEADING Text",
    hasIntroductionHeading: true,
    isSectionWithIntroductionHeading: true
  };

  const data3 = {
    type: "HEADING",
    content: "HEADING Text",
    hasIntroductionHeading: true,
    isSectionWithIntroductionHeading: false
  };

  afterEach(() => {
    block = null;
  });

  describe('When HEADING block is created', () => {
    beforeEach(() => {
      block = new ContentHeadingBlock(data1);
    });

    it('And type is HEADING', () => {
      expect(block.type).toBe('HEADING');
    });

    it('And content is as defined', () => {
      expect(block.content).toBe('HEADING Text');
    });

    it('And hasIntroductionHeading is false', () => {
      expect(block.hasIntroductionHeading).toBeFalsy;
    });

    it('And isSectionWithIntroductionHeading is false', () => {
      expect(block.isSectionWithIntroductionHeading).toBeFalsy;
    });
  });

  describe('When HEADING block is created with introduction heading', () => {
    beforeEach(() => {
      block = new ContentHeadingBlock(data2);
    });

    it('And hasIntroductionHeading is false', () => {
      expect(block.hasIntroductionHeading).toBeTruthy;
    });

    it('And isSectionWithIntroductionHeading is false', () => {
      expect(block.isSectionWithIntroductionHeading).toBeFalsy;
    });
  });

  describe('When HEADING block is created with introduction heading as secondary heading', () => {
    beforeEach(() => {
      block = new ContentHeadingBlock(data3);
    });

    it('And hasIntroductionHeading is false', () => {
      expect(block.hasIntroductionHeading).toBeTruthy;
    });

    it('And isSectionWithIntroductionHeading is false', () => {
      expect(block.isSectionWithIntroductionHeading).toBeTruthy;
    });
  });
});