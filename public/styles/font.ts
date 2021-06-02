import { COLOR } from "./colors";

export const FONT_SIZE = {
  TITLE2: 35.2,
  TITLE1: 28.1,
  SMALL_TITLE1: 22,
  SMALL_TITLE2: 18,
  SMALL_TITLE3: 14.4,
  BODY4: 22.5,
  BODY3: 18,
  BODY2: 14.4,
  BODY1: 11.52,
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
  SMALL_TITLE: 30,
  DENSE: 20,
};

export const VERTICAL_MARGIN = {
  DEFAULT: LINE_HEIGHT.BODY,
  DOUBLE: LINE_HEIGHT.BODY * 2,
  HALF: LINE_HEIGHT.BODY / 2,
  QUARTER: LINE_HEIGHT.BODY / 4,
};

export const FONT_STYLE = {
  TITLE2: `
    font-size: ${FONT_SIZE.TITLE2}px;
    font-weight: ${FONT_WEIGHT.BOLD};
    margin: 0 0 ${VERTICAL_MARGIN.HALF}px 0;
    line-height: ${LINE_HEIGHT.TITLE}px;
    color: ${COLOR.DEFAULT_TITLE};
`,
  TITLE1: `
    font-size: ${FONT_SIZE.TITLE1}px;
    font-weight: ${FONT_WEIGHT.BOLD};
    margin: 0 0 ${VERTICAL_MARGIN.QUARTER}px 0;
    line-height: ${LINE_HEIGHT.TITLE}px;
    color: ${COLOR.DEFAULT_TITLE};
`,
  SMALL_TITLE1: `
    font-size: ${FONT_SIZE.SMALL_TITLE1}px;
    font-weight: ${FONT_WEIGHT.SEMIBOLD};
    margin: 0 0 ${VERTICAL_MARGIN.QUARTER}px 0;
    line-height: ${LINE_HEIGHT.SMALL_TITLE}px;
    color: ${COLOR.DEFAULT_TITLE};`,
  SMALL_TITLE2: `
    font-size: ${FONT_SIZE.SMALL_TITLE2}px;
    font-weight: ${FONT_WEIGHT.SEMIBOLD};
    margin: 0 0 ${VERTICAL_MARGIN.QUARTER}px 0;
    line-height: ${LINE_HEIGHT.SMALL_TITLE}px;
    color: ${COLOR.DEFAULT_TITLE};`,
  SMALL_TITLE3: `
    font-size: ${FONT_SIZE.SMALL_TITLE3}px;
    font-weight: ${FONT_WEIGHT.MEDIUM};
    margin: 0 0 ${VERTICAL_MARGIN.QUARTER}px 0;
    line-height: ${LINE_HEIGHT.SMALL_TITLE}px;
    color: ${COLOR.DEFAULT_TITLE};`,
  BODY4: `
    font-size: ${FONT_SIZE.BODY4}px;
    line-height: ${LINE_HEIGHT.BODY}px;
    margin: 0 0 ${VERTICAL_MARGIN.DEFAULT}px 0;
    font-weight: ${FONT_WEIGHT.REGULAR};`,
};
