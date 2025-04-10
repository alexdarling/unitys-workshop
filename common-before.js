/*
============================================================================
Static global variables
============================================================================
*/
// Card forms. This should be declared in the page's script configurations as CARD_FORM.
const DECK = "deck";
const CHARACTER = "character";
// Orientations. This should be declared in the page's script configurations as ORIENTATION.
const VERTICAL = "vertical";
const HORIZONTAL = "horizontal";
// Faces. This should be declared in the page's script configurations as FACE.
const FRONT = "front";
const BACK = "back";
// Card preview sizes. These should match the text content of buttons on the page.
const SMALL = "Small";
const MEDIUM = "Medium";
const LARGE = "Large";
const CARD_PREVIEW_SIZES = [SMALL, MEDIUM, LARGE];
// Maps canvas container widths based on user-provided sizes (small, med, large) and card orientation. Used in {@link setCanvasWidth()}.
const canvasSizes = new Map([
    [VERTICAL, new Map([
        [SMALL,   250],
        [MEDIUM,  350],
        [LARGE,   450],
    ])],
    [HORIZONTAL, new Map([
        [SMALL,   400],
        [MEDIUM,  550],
        [LARGE,   700],
    ])],
]);
// Block types when parsing card text
const SPACE_BLOCK = "space";
const PHASE_BLOCK = "phase";
const INDENT_BLOCK = "indent";
const SIMPLE_BLOCK = "simple";
const BLOCK_TYPES = [PHASE_BLOCK, INDENT_BLOCK, SIMPLE_BLOCK];
// Phase names
const START_PHASE = "start";
const PLAY_PHASE = "play";
const POWER_PHASE = "power";
const DRAW_PHASE = "draw";
const END_PHASE = "end";
const PHASE_LABELS = [START_PHASE, PLAY_PHASE, POWER_PHASE, DRAW_PHASE, END_PHASE];
// Phase color contrasts
const HIGH_CONTRAST = "high";
const ORIGINAL_CONTRAST = "original"
// Gross RegeEx for identifying phase blocks
const _phaseSymbols = "[.,!;:<>[\\](){}\\-|]"; // "\" and "]" need to be escaped inside regex brackets
const PHASE_REGEX = new RegExp(`^${_phaseSymbols}* ?(${PHASE_LABELS.join("|")}) phase ?${_phaseSymbols}? *`);
const PHASE_INDEX = 1; // the position of the phase word that is identified in PHASE_REGEX

// Map of phases to various rendering strings
const PHASE_TEXT_MAP = new Map([
    [START_PHASE, "Start Phase"],
    [PLAY_PHASE, "Play Phase"],
    [POWER_PHASE, "Power Phase"],
    [DRAW_PHASE, "Draw Phase"],
    [END_PHASE, "End Phase"],
]);
const PHASE_ICON_MAP = new Map([
    [START_PHASE, "Start Phase Icon"],
    [PLAY_PHASE, "Play Phase Icon"],
    [POWER_PHASE, "Power Phase Icon"],
    [DRAW_PHASE, "Draw Phase Icon"],
    [END_PHASE, "End Phase Icon"],
]);
// Labels for indented effects (power, reaction, bullets):
const POWER_LABEL = "power:";
const REACTION_LABEL = "reaction:";
const BULLET_LABEL = "»";
const INDENT_LABEL_MAP = new Map([
    [POWER_LABEL, POWER_LABEL],
    [REACTION_LABEL, REACTION_LABEL],
    // Unlike power and reaction labels, bullet labels aren't necessarily specified in the way they are printed.
    ["- ", BULLET_LABEL],
    ["> ", BULLET_LABEL],
    ["* ", BULLET_LABEL],
    ["» ", BULLET_LABEL],
]);
const INDENT_LABELS = [POWER_LABEL, REACTION_LABEL, BULLET_LABEL];
const INDENT_LABEL_SPECIFIERS = Array.from(INDENT_LABEL_MAP.keys());
const INDENT_INDEX = 1;
// Colors for card effects
const colorBlack = '#231f20';
const colorYellow = '#fcb024';
const PHASE_COLOR_MAP = new Map([
    [ORIGINAL_CONTRAST, new Map([
        [START_PHASE, "#3fae49"],
        [PLAY_PHASE, "#fff200"],
        [POWER_PHASE, "#79509e"],
        [DRAW_PHASE, "#00aeef"],
        [END_PHASE, "#ee2d35"],
    ])],
    [HIGH_CONTRAST, new Map([
        [START_PHASE, "#4bc244"],
        [PLAY_PHASE, "#fff72f"],
        [POWER_PHASE, "#a76fb9"],
        [DRAW_PHASE, "#3db7e2"],
        [END_PHASE, "#f34747"],
    ])],
]);
// PHASE_FONT_SIZE_MAP is declared at the bottom of the page because it depends on canvas size
const PHASE_FONT_FAMILY = 'Avengeance Mightiest Avenger';
const PHASE_SIZE_FACTOR = 1;
// Map of indented label properties
const INDENT_LABEL_FONT_FAMILY = "Work Sans";
const INDENT_LABEL_SIZE_FACTOR = 1.08;
// Line joins (we only use miter)
const MITER = "miter";
// Body text properties
const EFFECT_FONT_WEIGHT = 400;
const EFFECT_FONT_FAMILY = "NotoSentinels";
// Backup font for bold effects
const BACKUP_FONT_FAMILY = 'Noto Sans';
// Font-weight-normalized space between words
const SPACE_WIDTH_FACTOR = 0.26;
// A multiplicative factor used to determine the distance of 2 blocks
const BLOCK_SPACING_FACTOR = 1.3;
// A multiplicative factor used to determine where to begin drawing a phase block
const PRE_PHASE_LINE_HEIGHT_FACTOR = 0.2;
// A multiplicative factor used to determine where to draw blocks after a phase block
const POST_PHASE_LINE_HEIGHT_FACTOR = 1.05;
// The terms that should be bolded by default
const DEFAULT_BOLD_LIST = new Set(["START PHASE", "PLAY PHASE", "POWER PHASE", "DRAW PHASE", "END PHASE", "PERFORM", "ACCOMPANY"]);
// The terms that should be italicized by default
const DEFAULT_ITALICS_LIST = new Set(["PERFORM", "ACCOMPANY"]);

// Common Image Key Names
const BACKGROUND_ART = "backgroundArt";
const FOREGROUND_ART = "foregroundArt";
const NEMESIS_ICON = "nemesisIcon";
const BACK_TOP_ART = "topArt";
const BACK_LEFT_ART = "leftArt";
const BACK_RIGHT_ART = "rightArt";
const BACK_BOTTOM_ART = "bottomArt";
const NAME_LOGO = "nameLogo";

// Common Image Sets
const CC_FRONT_IMAGES = new Set([BACKGROUND_ART, FOREGROUND_ART, NEMESIS_ICON, NAME_LOGO]);
const CC_BACK_IMAGES = new Set([BACKGROUND_ART]);
const VCC_IMAGES = new Set([BACKGROUND_ART, FOREGROUND_ART, NEMESIS_ICON, NAME_LOGO]);
const HERO_DECK_BACK_IMAGES = new Set([BACK_LEFT_ART, BACK_RIGHT_ART, BACK_BOTTOM_ART, NAME_LOGO]);
const VILLAIN_DECK_BACK_IMAGES = new Set([BACK_TOP_ART, BACK_LEFT_ART, BACK_RIGHT_ART, NAME_LOGO]);

// Common image style classes
const IMAGE_X = "inputImageOffsetX"
const IMAGE_Y = "inputImageOffsetY"
const IMAGE_ZOOM = "inputImageScale"


/*
============================================================================
Global functions
============================================================================
*/
/** Gets the pixel count that corresponds to a given percentage width. */
function pw(percentageWidth) {
    return percentageWidth * canvas.width / 100;
}

/** Gets the pixel count that corresponds to a given percentage height. */
function ph(percentageHeight) {
    return percentageHeight * canvas.height / 100;
}

/**
 * Gets the pixel count that corresponds to a given percentage of the card's smallest dimension, which is
 * height for horizontal cards and width for vertical cards.
 */
function ps(percentageSmall) {
    if (ORIENTATION === HORIZONTAL) {
        return ph(percentageSmall);
    }
    // else ORIENTATION === VERTICAL
    return pw(percentageSmall);
}

/** Loads a a list of custom terms to bold and italicize alongside the default list. */
function loadEffectList() {
    // Get the list of user-specified terms. If it doesn't exist, return an empty array.
    const customEffectList = $('#inputBoldWords').prop('value') ?
        $('#inputBoldWords').prop('value')
            .toUpperCase()
            .split(",")
            .map(x => x.trim())
            .filter(x => x != "") :
        [];
    // Union that list with the list of default bold & default italicized terms
    effectBoldList = Array.from(new Set([...DEFAULT_BOLD_LIST, ...customEffectList]));
    effectItalicsList = Array.from(new Set([...DEFAULT_ITALICS_LIST, ...customEffectList]));
}

// Sets canvas width given a card preview size, using the page's pre-configured orientation
function setCanvasWidth(cardPreviewSize) {
    $('#canvasContainer').css({ width: canvasSizes.get(ORIENTATION).get(cardPreviewSize) });
}

/** Resets the settings for a given data image input with the specified purpose (e.g. "mainArt", "backgroundArt") */
function resetDataImageSettings(imagePurpose) {
    $(`.contentInput[data-image-purpose="${imagePurpose}"]`).each(function () {
        if (this.dataset.default) {
            this.value = this.dataset.default;
        }
    });
}

/*
============================================================================
Initialization Logic
============================================================================
*/
// Establish canvas
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.save();
setCanvasWidth(MEDIUM);

// Make invisible second canvas for running calculations
const clonedCanvas = $(canvas).clone().appendTo("#canvasContainer");
$(clonedCanvas).attr({
    'id': 'calculationCanvas',
    'style': 'display: none;'
});
var calculationCanvas = document.getElementById("calculationCanvas");

/*
============================================================================
Initialization-Dependent Global Variables
============================================================================
*/
// TODO: HORIZONTAL CHARACTERS - UW hasn't set up horizontal character cards yet, so many mapped results for CHARACTER + VERTICAL cards
//       are null. If you're reading this comment because you hit a null error, figure this value out and update the maps!

// Font size for phase labels
const _phaseFontSizeMap = new Map([
    [DECK, new Map([
        [VERTICAL, pw(4.1)],
        [HORIZONTAL, ph(4.1)],
    ])],
    [CHARACTER, new Map([
        [VERTICAL, pw(4)],
        [HORIZONTAL, ph(3.2)],
    ])],
]);
const EFFECT_PHASE_FONT_SIZE = _phaseFontSizeMap.get(CARD_FORM)?.get(ORIENTATION);

// X position of the icons next to phase labels
const _phaseIconXMap = new Map([
    [DECK, new Map([
        [VERTICAL, pw(8.9)],
        [HORIZONTAL, pw(54)],
    ])],
    [CHARACTER, new Map([
        [VERTICAL, pw(9.2)],
        [HORIZONTAL, pw(58.5)],
    ])],
]);
const PHASE_ICON_X = _phaseIconXMap.get(CARD_FORM)?.get(ORIENTATION);

// Size of the icons next to phase labels
const _phaseIconSizeMap = new Map([
    [DECK, new Map([
        [VERTICAL, ps(5)],
        [HORIZONTAL, ps(5)],
    ])],
    [CHARACTER, new Map([
        [VERTICAL, ps(5)],
        [HORIZONTAL, ps(3.8)],
    ])],
]);
const PHASE_ICON_SIZE = _phaseIconSizeMap.get(CARD_FORM)?.get(ORIENTATION);

// Font size for most effect text
const _baseFontSizeMap = new Map([
    [DECK, new Map([
        [VERTICAL, pw(4.05)],
        [HORIZONTAL, ph(4.05)],
    ])],
    [CHARACTER, new Map([
        [VERTICAL, pw(3.95)],
        [HORIZONTAL, ph(2.9)],
    ])],
]);
const EFFECT_BASE_FONT_SIZE = _baseFontSizeMap.get(CARD_FORM)?.get(ORIENTATION);

// The X position to begin drawing effect text
const _effectStartXMap = new Map([
    [DECK, new Map([
        [VERTICAL, new Map([
            [FRONT, pw(12.5)],
            // Deck backs don't have effect text
            [BACK, null],
        ])],
        [HORIZONTAL, new Map([
            [FRONT, pw(57)],
            // Deck backs don't have effect text
            [BACK, null],
        ])],
    ])],
    [CHARACTER, new Map([
        [VERTICAL, new Map([
            [FRONT, pw(12.5)],
            [BACK, pw(14.5)]
        ])],
        [HORIZONTAL, new Map([
            [FRONT, pw(60.25)],
            [BACK, null],
        ])],
    ])],
]);
const EFFECT_START_X = _effectStartXMap.get(CARD_FORM)?.get(ORIENTATION)?.get(FACE);

// The X position to stop drawing effect text
const _effectEndXMap = new Map([
    [DECK, new Map([
        [VERTICAL, pw(88.5)],
        [HORIZONTAL, pw(94)],
    ])],
    [CHARACTER, new Map([
        [VERTICAL, pw(86.5)],
        [HORIZONTAL, pw(96.75)],
    ])],
]);
const EFFECT_END_X =  _effectEndXMap.get(CARD_FORM)?.get(ORIENTATION);

// The Y position to begin drawing effect text
const _effectStartYMap = new Map([
    [DECK, new Map([
        [VERTICAL, new Map([
            [FRONT, ph(61.5)],
            // Deck backs don't have effect text
            [BACK, null],
        ])],
        [HORIZONTAL, new Map([
            [FRONT, ph(28)],
            // Deck backs don't have effect text
            [BACK, null],
        ])],
    ])],
    [CHARACTER, new Map([
        [VERTICAL, new Map([
            [FRONT, ph(85.5)],
            [BACK, ph(86)],
        ])],
        [HORIZONTAL, new Map([
            [FRONT, ph(86.1)],
            [BACK, null],
        ])],
    ])],
]);
const EFFECT_START_Y = _effectStartYMap.get(CARD_FORM)?.get(ORIENTATION)?.get(FACE);

// The base line height. Used to set the line height for body text.
const BODY_BASE_LINE_HEIGHT = EFFECT_BASE_FONT_SIZE * 1.2345;


// Default coordinates for character card game text box
// NOTE: Deck values have intentionally been left null, since this does not apply to deck cards
const _characterBodyBoxMap = new Map([
    [DECK, new Map([
        [VERTICAL, null],
        [HORIZONTAL, null],
    ])],
    [CHARACTER, new Map([
        // Hero character cards
        [VERTICAL, {
            topLeft: {x: pw(10), y: ph(79)},
            topRight: {x: pw(90), y: ph(79)},
            bottomRight: {x: pw(90), y: ph(93.3)},
            bottomLeft: {x: pw(10), y: ph(94)},
            bgColor: '#ffffffcc',  // Last two digits are transparency
            borderThickness: pw(0.5),
            shadowThickness: pw(1),
        }],
        // Villain character cards
        [HORIZONTAL, {
            topLeft: {x: pw(58), y: ph(81.5)},
            topRight: {x: pw(98), y: ph(81.5)},
            bottomRight: {x: pw(98), y: ph(97)},
            bottomLeft: {x: pw(58), y: ph(97)},
            bgColor: '#ffffffff',  // Last two digits are transparency,
            borderThickness: pw(0.25),
            shadowThickness: pw(0.5),
        }],
    ])],
]);
const CHARACTER_BODY_BOX = _characterBodyBoxMap.get(CARD_FORM)?.get(ORIENTATION);


// Values for quotes:
// NOTE: All quote values have been left null for characters, given that no character card currently
// has quote text.
// Font size for quote text
const _quoteFontSizeMap = new Map([
    [DECK, new Map([
        [VERTICAL, pw(3.5)],
        [HORIZONTAL, ph(3.4)],
    ])],
    [CHARACTER, new Map([
        [VERTICAL, null],
        [HORIZONTAL, null],
    ])],
]);
const QUOTE_FONT_SIZE = _quoteFontSizeMap.get(CARD_FORM)?.get(ORIENTATION);

// These values assume quotes are centered horizontally.
const _quoteStartXMap = new Map([
    [DECK, new Map([
        [VERTICAL, new Map([
            [FRONT, pw(50)],
            // Deck backs don't have quotes
            [BACK, null],
        ])],
        [HORIZONTAL, new Map([
            [FRONT, pw(72)],
            // Deck backs don't have quotes
            [BACK, null],
        ])],
    ])],
    [CHARACTER, new Map([
        [VERTICAL, null],
        [HORIZONTAL, null],
    ])],
]);
const QUOTE_START_X = _quoteStartXMap.get(CARD_FORM)?.get(ORIENTATION)?.get(FACE);

// These values assume quotes are centered vertically.
const _quoteStartYMap = new Map([
    [DECK, new Map([
        [VERTICAL, new Map([
            [FRONT, ph(92.3)],
            // Deck backs don't have quotes
            [BACK, null],
        ])],
        [HORIZONTAL, new Map([
            [FRONT, ph(87)],
            // Deck backs don't have quotes
            [BACK, null],
        ])],
    ])],
    [CHARACTER, new Map([
        [VERTICAL, null],
        [HORIZONTAL, null],
    ])],
]);
const QUOTE_START_Y = _quoteStartYMap.get(CARD_FORM)?.get(ORIENTATION)?.get(FACE);

const _quoteWidthMap = new Map([
    [DECK, new Map([
        [VERTICAL, new Map([
            [FRONT, pw(75)],
            // Deck backs don't have quotes
            [BACK, null],
        ])],
        [HORIZONTAL, new Map([
            [FRONT, ph(68)],
            // Deck backs don't have quotes
            [BACK, null],
        ])],
    ])],
    [CHARACTER, new Map([
        [VERTICAL, null],
        [HORIZONTAL, null],
    ])],
]);
const QUOTE_WIDTH = _quoteWidthMap.get(CARD_FORM)?.get(ORIENTATION)?.get(FACE);

// This object is where user input images (specifically Image objects) are stored
// currently unused for deck fronts, but needs to exist for JSON parsing to function correctly
const loadedUserImages = {
};


/*
============================================================================
Modifiable Global Variables
============================================================================
*/
// The offset to apply to the height at which the body of a card is drawn.
let boxHeightOffset = 0;

// Whether to use high contrast phase labels
let useHighContrastPhaseLabels = $('#inputUseHighConstrast').length > 0 ? $('#inputUseHighConstrast')[0].checked : false;

// Whether a card has the Suddenly! keyword
let suddenly = $('#suddenly').length > 0 ? $('#suddenly')[0].checked : false;

// The scale of the body text and line height for a card. This is a value between 0 and 1, set by the user.
let effectFontScale = 1;

// The size of body text for a card. This is a convenience variable, derived from effectFontScale * EFFECT_BASE_FONT_SIZE
let effectFontSize = effectFontScale * EFFECT_BASE_FONT_SIZE;

// The size of the space between words. This is a convenience variable, derived from effectFontSize * SPACE_WIDTH_FACTOR
let spaceWidth = effectFontSize * SPACE_WIDTH_FACTOR;

// The line height for body text. This is a convenience variable, derived from effectFontScale * BODY_BASE_LINE_HEIGHT
let lineHeight = effectFontScale * BODY_BASE_LINE_HEIGHT;

// These phrases will be automatically bolded. This list is updated based on user input.
let effectBoldList = Array.from(DEFAULT_BOLD_LIST);

// These phrases will be automatically italicized. This list is updated based on user input.
let effectItalicsList = Array.from(DEFAULT_ITALICS_LIST);

// The indentation of the X-position cursor when drawing indented blocks (such as Power, Reaction, and Bullet point blocks).
var currentIndentX = EFFECT_START_X;
/*
Using "var" instead of "let" above to fix a bug that started happening within drawSimpleBlock(),
where executing [currentOffsetX = currentIndentX;] caused both variables to then return as NaN,
even though both logged as valid numbers immediately before.
This bug randomly started occuring around 3/19/2025, in Google Chrome but not Firefox.
*/

// The X position for draw commands.
let currentOffsetX = 0;

// The Y position for draw commands.
let currentOffsetY = 0;

// Whether to display the card border for character cards
let showBorder = $('#inputDisplayBorder').length > 0 ? $('#inputDisplayBorder')[0].checked : true;

// Whether to display the variant tag for Hero character cards
let isVariant = $('#inputVariantToggle').length > 0 ? $('#inputVariantToggle')[0].checked : false;

// Simple color toggle for variant text (if we ever decide to do more advanced variant stuff, this should be deleted)
let variantTextColor = $('#inputVariantColor').length > 0 ? $('#inputVariantColor')[0].checked : false;

// Whether an Advanced game text box is being drawn
let drawingAdvanced = false;

// Variable for adjusting the normal game text Y values based on the advanced game text Y values
let advancedBoxYAdjustment = 0;
let advancedTextYAdjustment = 0;

// Variable to hold vertical alignment for HP, keywords, and description
let inputBelowNameLogoAlignment = 1;

// How much the border in a Villain character card should adjust to fit the setup text
let setupBorderOffset = 0;
