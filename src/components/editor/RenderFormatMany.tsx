import React, { ReactElement, useContext } from "react";
import classes from "./editor.module.scss";
import { useSlate } from "slate-react";
import { Editor } from "slate";

interface FormatMayProps {
  setFormatMany: any;
  handleBlock: (format: string, editor: Editor) => void;
  handleMark: (format: string, editor: Editor) => void;
}

export default function RenderFormatMany({
  setFormatMany,
  handleBlock,
  handleMark,
}: FormatMayProps): ReactElement {
  const editor = useSlate();

  return (
    <div className={classes.format_many_wrap}>
      <ul>
        <button
          onClick={() => {
            setFormatMany(false);
            handleBlock("normal-text", editor);
          }}
        >
          Normal Text
        </button>
        <button
          onClick={() => {
            setFormatMany(false);
            handleBlock("block-quote", editor);
          }}
        >
          Quote
        </button>

        <button
          onClick={() => {
            handleMark("code", editor);
            setFormatMany(false);
          }}
        >
          code
        </button>
        <button
          onClick={() => {
            setFormatMany(false);
            handleBlock("heading-four", editor);
          }}
        >
          Heading 4
        </button>
      </ul>
    </div>
  );
}
