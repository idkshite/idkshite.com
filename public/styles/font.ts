import { COLOR } from "./colors";

export const FONT_SIZE = {
  TITLE2: 35.2,
  TITLE1: 28.1,
  SMALL_TITLE1: 22,
  SMALL_TITLE2: 18,
  SMALL_TITLE3: 14,
  BODY4: 22.5,
};

export const FONT_WEIGHT = {
  REGULAR: 400,
  MEDIUM: 500,
  SEMIBOLD: 600,
  BOLD: 700,
};

export const LINE_HEIGHT = {
  BODY: 40,
  TITLE: 40,
};

export const VERTICAL_MARGIN = {
  DEFAULT: LINE_HEIGHT.BODY,
  DOUBLE: LINE_HEIGHT.BODY * 2,
  HALF: LINE_HEIGHT.BODY / 2,
};

export const FONT_STYLE = {
  TITLE2: `
    font-size: ${FONT_SIZE.TITLE2}px;
    font-weight: ${FONT_WEIGHT.BOLD};
    margin-bottom: ${VERTICAL_MARGIN.HALF}px;
    line-height: ${LINE_HEIGHT.TITLE}px;
    color: ${COLOR.DEFAULT_TITLE};
`,
  TITLE1: `
    font-size: ${FONT_SIZE.TITLE1}px;
    font-weight: ${FONT_WEIGHT.BOLD};
    margin-bottom: ${VERTICAL_MARGIN.HALF}px;
    line-height: ${LINE_HEIGHT.TITLE}px;
    color: ${COLOR.DEFAULT_TITLE};
`,
  SMALL_TITLE1: `
    font-size: ${FONT_SIZE.SMALL_TITLE1}px;
    font-weight: ${FONT_WEIGHT.SEMIBOLD};
    margin-bottom: ${VERTICAL_MARGIN.HALF}px;
    line-height: ${LINE_HEIGHT.TITLE}px;
    color: ${COLOR.DEFAULT_TITLE};`,
  SMALL_TITLE2: `
    font-size: ${FONT_SIZE.SMALL_TITLE2}px;
    font-weight: ${FONT_WEIGHT.SEMIBOLD};
    margin-bottom: ${VERTICAL_MARGIN.HALF}px;
    line-height: ${LINE_HEIGHT.TITLE}px;
    color: ${COLOR.DEFAULT_TITLE};`,
  SMALL_TITLE3: `
    font-size: ${FONT_SIZE.SMALL_TITLE3}px;
    font-weight: ${FONT_WEIGHT.MEDIUM};
    margin-bottom: ${VERTICAL_MARGIN.HALF}px;
    line-height: ${LINE_HEIGHT.TITLE}px;
    color: ${COLOR.DEFAULT_TITLE};`,
  BODY4: `
    font-size: ${FONT_SIZE.BODY4}px;
    line-height: ${LINE_HEIGHT.BODY}px;
    margin-bottom: ${VERTICAL_MARGIN.DEFAULT}px;
    font-weight: ${FONT_WEIGHT.REGULAR};`,
};
