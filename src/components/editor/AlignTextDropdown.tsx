import React, { ReactElement } from "react";
import classes from "./editor.module.scss";
import { useSlate } from "slate-react";
import { Editor } from "slate";

interface FormatMayProps {
  setIsAlign: any;
  handleBlock: (format: string, editor: Editor) => void;
  setActiveAlign: any;
}

export default function AlignTextDropdown({
  setIsAlign,
  handleBlock,
  setActiveAlign,
}: FormatMayProps): ReactElement {
  const editor = useSlate();

  return (
    <div className={classes.align_many}>
      <ul>
        <button
          onClick={() => {
            setIsAlign(false);
            handleBlock("align-left", editor);
            setActiveAlign("left_is_default");
          }}
        >
          Align Left
        </button>
        <button
          onClick={() => {
            setIsAlign(false);
            handleBlock("align-center", editor);
            setActiveAlign("align-center");
          }}
        >
          Align Center
        </button>

        <button
          onClick={() => {
            handleBlock("align-right", editor);
            setActiveAlign("align-right");
            setIsAlign(false);
          }}
        >
          Align Right
        </button>
      </ul>
    </div>
  );
}
