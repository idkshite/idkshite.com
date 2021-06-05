import { FONT_SIZE, VERTICAL_MARGIN } from "../../public/styles/font";
import { COLOR } from "../../public/styles/colors";

export default function Copyright() {
  return (
    <>
      <div>
        <p>
          You found a mistake? Feel free to{" "}
          <a
            href={"https://github.com/idkshite/idkshite.com/pulls"}
            target={"_blank"}
          >
            open a PR
          </a>
        </p>
        <p className={"deemphasize"}>share what you learned 🥳</p>
      </div>

      <style jsx>
        {`
          div {
            margin-top: ${VERTICAL_MARGIN.DEFAULT}px;
            margin-bottom: ${VERTICAL_MARGIN.DEFAULT}px;
          }
          p {
            margin: 0;
            font-size: ${FONT_SIZE.BODY2}px;
            color: ${COLOR.DEFAULT_TITLE};
            text-align: center;
          }
          .deemphasize {
            opacity: 0.6;
          }
        `}
      </style>
    </>
  );
}
