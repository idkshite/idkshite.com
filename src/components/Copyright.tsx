import { FONT_SIZE, VERTICAL_MARGIN } from "../../public/styles/font";
import { COLOR } from "../../public/styles/colors";

export default function Copyright() {
  return (
    <>
      <p>share what you learned 🥳</p>
      <style jsx>
        {`
          p {
            opacity: 0.6;
            margin-top: ${VERTICAL_MARGIN.DEFAULT}px;
            font-size: ${FONT_SIZE.BODY2}px;
            color: ${COLOR.DEFAULT_TITLE};
            text-align: center;
          }
        `}
      </style>
    </>
  );
}
