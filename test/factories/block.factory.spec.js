import { BlockFactory } from '../../app/factories/block.factory';
import { ContentBlock } from '../../app/subcomponents/content-block.component';
import { ValueBlock } from '../../app/subcomponents/value-block.component';
import { DateBlock } from '../../app/subcomponents/date-block.component';
import { OptionBlock } from '../../app/subcomponents/option-block.component';

describe('Block Factory', () => {
    const factory = new BlockFactory();
    let block;

    const contentHeading = {
        "type": "HEADING",
        "content": "Heading"
    };

    const contentParagraph = {
        "type": "PARAGRAPH",
        "content": "Normal paragraph"
    };

    const contentImportant = {
        "type": "IMPORTANT",
        "content": "Important paragraph"
    };

    const contentHint = {
        "type": "HINT",
        "content": "Hint paragraph"
    };

    const contentBreak = {
        "type": "BREAK"
    };

    const contentUnoderedList = {
        "type": "LIST",
        "content": [
            "List item 1",
            "List item 2",
            "List item 3"
        ]
    };

    const contentOrderedList = {
        "type": "LIST_ORDERED",
        "content": [
            "Ordered list item 1",
            "Ordered list item 2",
            "Ordered list item 3"
        ]
    };

    const contentTextInput = {
        "type": "TEXT_INPUT",
        "id": "qb-start-id_input-box-label_t7zvl3vu23",
        "label": "Input box label",
        "hint": "Input box hint"
    };

    const contentTextArea = {
        "type": "TEXTAREA",
        "id": "qb-start-id_textarea-label_rolwxjc87f",
        "label": "Textarea label",
        "hint": "Textarea hint"
    };

    const contentDate = {
        "type": "DATE",
        "id": "qb-start-id_date-label_uh7op7uusg",
        "label": "Date label",
        "hint": ""
    };

    const contentCheckbox = {
        "type": "CHECKBOX",
        "id": "qb-start-id_checkbox-label_0miprh7apb",
        "label": "Checkbox label",
        "hint": "Checkbox hint",
        "options": [
            {
                "value": "qb-start-id_checkbox-label_0miprh7apb_option-1_0",
                "text": "Option 1"
            },
            {
                "value": "qb-start-id_checkbox-label_0miprh7apb_option-2_1",
                "text": "Option 2"
            }
        ]
    };

    const contentRadio = {
        "type": "RADIO",
        "id": "qb-start-id_radio-label_vvm6h04guf",
        "label": "Radio label",
        "hint": "Radio hint",
        "options": [
            {
                "value": "qb-start-id_radio-label_vvm6h04guf_option-1_0",
                "text": "Option 1"
            },
            {
                "value": "qb-start-id_radio-label_vvm6h04guf_option-2_1",
                "text": "Option 2"
            }
        ]
    };

    const decisionCheckbox = {
        "hint": null,
        "id": "qb-end_question",
        "label": "End",
        "options": [
            {
                "questionBlockId": "done",
                "text": "Done",
                "optionId": "done"
            }
        ],
        "type": "CHECKBOX"
    };

    describe('When HEADING block is created', () => {
        beforeEach(() => {
            block = factory.createContentBlock(contentHeading, false);
        });

        it('Then content block is returned', () => {
            expect(block instanceof ContentBlock).toBe(true);
        });

        it('And object has defined _type property', () => {
            expect(block._type).toEqual('HEADING');
        });

        it('And object has defined _content property', () => {
            expect(block._content).toEqual('Heading');
        });
    });

    describe('When PARAGRAPH block is created', () => {
        beforeEach(() => {
            block = factory.createContentBlock(contentParagraph, false);
        });

        it('Then content block is returned', () => {
            expect(block instanceof ContentBlock).toBe(true);
        });

        it('And object has defined _type property', () => {
            expect(block._type).toEqual('PARAGRAPH');
        });

        it('And object has defined _content property', () => {
            expect(block._content).toEqual('Normal paragraph');
        });
    });

    describe('When IMPORTANT block is created', () => {
        beforeEach(() => {
            block = factory.createContentBlock(contentImportant, false);
        });

        it('Then content block is returned', () => {
            expect(block instanceof ContentBlock).toBe(true);
        });

        it('And object has defined _type property', () => {
            expect(block._type).toEqual('IMPORTANT');
        });

        it('And object has defined _content property', () => {
            expect(block._content).toEqual('Important paragraph');
        });
    });

    describe('When HINT block is created', () => {
        beforeEach(() => {
            block = factory.createContentBlock(contentHint, false);
        });

        it('Then content block is returned', () => {
            expect(block instanceof ContentBlock).toBe(true);
        });

        it('And object has defined _type property', () => {
            expect(block._type).toEqual('HINT');
        });

        it('And object has defined _content property', () => {
            expect(block._content).toEqual('Hint paragraph');
        });
    });

    describe('When BREAK block is created', () => {
        beforeEach(() => {
            block = factory.createContentBlock(contentBreak, false);
        });

        it('Then content block is returned', () => {
            expect(block instanceof ContentBlock).toBe(true);
        });

        it('And object has defined _type property', () => {
            expect(block._type).toEqual('BREAK');
        });
    });

    describe('When LIST block is created', () => {
        beforeEach(() => {
            block = factory.createContentBlock(contentUnoderedList, false);
        });

        it('Then content block is returned', () => {
            expect(block instanceof ContentBlock).toBe(true);
        });

        it('And object has defined _type property', () => {
            expect(block._type).toEqual('LIST');
        });

        it('And object has defined _content property', () => {
            expect(block._content).toEqual(['List item 1', 'List item 2', 'List item 3']);
        });
    });

    describe('When LIST_ORDERED block is created', () => {
        beforeEach(() => {
            block = factory.createContentBlock(contentOrderedList, false);
        });

        it('Then content block is returned', () => {
            expect(block instanceof ContentBlock).toBe(true);
        });

        it('And object has defined _type property', () => {
            expect(block._type).toEqual('LIST_ORDERED');
        });

        it('And object has defined _content property', () => {
            expect(block._content).toEqual(['Ordered list item 1', 'Ordered list item 2', 'Ordered list item 3']);
        });
    });

    describe('When TEXT_INPUT block is created', () => {
        beforeEach(() => {
            block = factory.createContentBlock(contentTextInput, false);
        });

        it('Then value block is returned', () => {
            expect(block instanceof ValueBlock).toBe(true);
        });

        it('And object has defined _type property', () => {
            expect(block._type).toEqual('TEXT_INPUT');
        });

        it('And object has defined _label property', () => {
            expect(block._label).toEqual('Input box label');
        });

        it('And object has defined _hint property', () => {
            expect(block._hint).toEqual('Input box hint');
        });

        it('And object has defined _value property', () => {
            expect(block._value).toEqual('');
        });

        it('And object has defined _id property', () => {
            expect(block._id).toEqual('qb-start-id_input-box-label_t7zvl3vu23');
        });

        it('And object has defined _readOnly property', () => {
            expect(block.readOnly).toEqual(false);
        });
    });

    describe('When TEXTAREA block is created', () => {
        beforeEach(() => {
            block = factory.createContentBlock(contentTextArea, false);
        });

        it('Then value block is returned', () => {
            expect(block instanceof ValueBlock).toBe(true);
        });

        it('And object has defined _type property', () => {
            expect(block._type).toEqual('TEXTAREA');
        });

        it('And object has defined _label property', () => {
            expect(block._label).toEqual('Textarea label');
        });

        it('And object has defined _hint property', () => {
            expect(block._hint).toEqual('Textarea hint');
        });

        it('And object has defined _value property', () => {
            expect(block._value).toEqual('');
        });

        it('And object has defined _id property', () => {
            expect(block._id).toEqual('qb-start-id_textarea-label_rolwxjc87f');
        });

        it('And object has defined _readOnly property', () => {
            expect(block.readOnly).toEqual(false);
        });
    });

    describe('When DATE block is created', () => {
        beforeEach(() => {
            block = factory.createContentBlock(contentDate, false);
        });

        it('Then value block is returned', () => {
            expect(block instanceof DateBlock).toBe(true);
        });

        it('And object has defined _type property', () => {
            expect(block._type).toEqual('DATE');
        });

        it('And object has defined _label property', () => {
            expect(block._label).toEqual('Date label');
        });

        it('And object has defined _hint property', () => {
            expect(block._hint).toEqual('For example, 31 3 2018');
        });

        it('And object has defined _DEFAULT_HINT_TEXT property', () => {
            expect(block._DEFAULT_HINT_TEXT).toEqual('For example, 31 3 2018');
        });

        it('And _value property is null', () => {
            expect(block._value).toBe(null);
        });

        it('And object have declared but assigned _day property', () => {
            expect(block._day).toBe(undefined);
        });

        it('And object have declared but assigned _month property', () => {
            expect(block._month).toBe(undefined);
        });

        it('And object have declared but assigned _year property', () => {
            expect(block._year).toBe(undefined);
        });

        it('And object has defined _id property', () => {
            expect(block._id).toEqual('qb-start-id_date-label_uh7op7uusg');
        });

        it('And object has defined _readOnly property', () => {
            expect(block.readOnly).toEqual(false);
        });
    });

    describe('When CHECKBOX block is created', () => {
        beforeEach(() => {
            block = factory.createContentBlock(contentCheckbox, false);
        });

        it('Then value block is returned', () => {
            expect(block instanceof OptionBlock).toBe(true);
        });

        it('And object has defined _type property', () => {
            expect(block._type).toEqual('CHECKBOX');
        });

        it('And object has defined _label property', () => {
            expect(block._label).toEqual('Checkbox label');
        });

        it('And object has defined _hint property', () => {
            expect(block._hint).toEqual('Checkbox hint');
        });

        it('And object has defined _options property', () => {
            expect(block._options).toEqual([{ value: 'qb-start-id_checkbox-label_0miprh7apb_option-1_0', text: 'Option 1' }, { value: 'qb-start-id_checkbox-label_0miprh7apb_option-2_1', text: 'Option 2' }]);
        });

        it('And object has defined _id property', () => {
            expect(block._id).toEqual('qb-start-id_checkbox-label_0miprh7apb');
        });

        it('And object has defined _readOnly property', () => {
            expect(block.readOnly).toEqual(false);
        });
    });

    describe('When RADIO block is created', () => {
        beforeEach(() => {
            block = factory.createContentBlock(contentRadio, false);
        });

        it('Then value block is returned', () => {
            expect(block instanceof OptionBlock).toBe(true);
        });

        it('And object has defined _type property', () => {
            expect(block._type).toEqual('RADIO');
        });

        it('And object has defined _label property', () => {
            expect(block._label).toEqual('Radio label');
        });

        it('And object has defined _hint property', () => {
            expect(block._hint).toEqual('Radio hint');
        });

        it('And object has defined _options property', () => {
            expect(block._options).toEqual([{ value: 'qb-start-id_radio-label_vvm6h04guf_option-1_0', text: 'Option 1' }, { value: 'qb-start-id_radio-label_vvm6h04guf_option-2_1', text: 'Option 2' }]);
        });

        it('And object has defined _id property', () => {
            expect(block._id).toEqual('qb-start-id_radio-label_vvm6h04guf');
        });

        it('And object has defined _readOnly property', () => {
            expect(block.readOnly).toEqual(false);
        });
    });

    describe('When CHECKBOX block is created', () => {
        beforeEach(() => {
            block = factory.createDecisionBlock(decisionCheckbox, false);
        });

        it('Then value block is returned', () => {
            expect(block instanceof OptionBlock).toBe(true);
        });

        it('And object has defined _type property', () => {
            expect(block._type).toEqual('CHECKBOX');
        });

        it('And object has defined _label property', () => {
            expect(block._label).toEqual('End');
        });

        it('And object has defined _hint property', () => {
            expect(block._hint).toEqual(null);
        });

        it('And object has defined _nextSection property', () => {
            expect(block._nextSection).toEqual('');
        });

        it('And object has defined _selectedOptionId property', () => {
            expect(block._selectedOptionId).toEqual('');
        });

        it('And object has defined _isLastQuestion property', () => {
            expect(block._isLastQuestion).toEqual(true);
        });

        it('And object has defined _options property', () => {
            expect(block._options).toEqual([{ text: 'Done', questionBlockId: 'done', optionId: 'done' }]);
        });

        it('And object has defined _id property', () => {
            expect(block._id).toEqual('qb-end_question');
        });

        it('And object has defined _readOnly property', () => {
            expect(block.readOnly).toEqual(false);
        });
    });
});