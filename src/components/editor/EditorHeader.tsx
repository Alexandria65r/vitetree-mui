import React, { ReactElement, useState } from "react";
import classes from "./editor.module.scss";
import { useSlate } from "slate-react";

import RenderFormatMany from "./RenderFormatMany";
import AddLink from "./AddLink";
import { Editor } from "slate";
import AlignTextDropdown from "./AlignTextDropdown";
import { FormatPaint, FormatBold, FormatItalic, FormatUnderlined, FormatAlignLeft, FormatListBulleted, FormatListNumbered, CheckCircle, Link } from "@mui/icons-material";
import { Box, colors } from "@mui/material";
interface Props {
  handleMark: (format: string, editor: Editor) => void;
  isMarkActive: (editor: Editor, format: string) => boolean;
  handleBlock: (format: string, editor: Editor) => void;
  isBlockActive: (editor: Editor, format: string) => boolean;
  addLink: any;
  isLinkActive: (editor: Editor) => boolean;
  myUrl: string;
  setMyUrl: any;
}

export default function EditorHeader({
  handleMark,
  isMarkActive,
  handleBlock,
  isBlockActive,
  addLink,
  isLinkActive,
  myUrl,
  setMyUrl,
}: Props): ReactElement {
  const editor = useSlate();
  const [isFormatMany, setFormatMany] = useState<Boolean>(false);
  const [isAddLink, setAddLink] = useState<Boolean>(false);
  const [isAlign, setIsAlign] = useState<Boolean>(false);
  const [ActiveAlign, setActiveAlign] = useState<string>("");

  // healper function to highlight active elements
  function isActive(format: string, bool: boolean) {
    const active_style = {
      backgroundColor: bool ? "var(--active-format-color)" : "",
    };
    switch (format) {
      case "bold":
        return active_style;
      case "italic":
        return active_style;
      case "underline":
        return active_style;
      case "align":
        return active_style;
      case "bulleted-list":
        return active_style;
      case "numbered-list":
        return active_style;
      case "check-list":
        return active_style;
    }
  }

  return (
    <Box className={classes.editorHeader}
      sx={{ borderBottom: `1px solid ${colors.teal[400]}`,
        borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
      <div className={classes.format_btn_wrapper}>
        <button
          className={`${classes.toggle_format_many} ${classes.format_button}`}
          onClick={(e) => {
            e.preventDefault();
            setFormatMany(!isFormatMany);
          }}
          onFocus={(e) => {
            e.preventDefault();
            setFormatMany(false);
          }}
        >
          <FormatPaint fontSize="small" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            handleMark("bold", editor);
          }}
          className={classes.format_button}
          style={isActive("bold", isMarkActive(editor, "bold"))}
        >
          <FormatBold fontSize="small" />
        </button>{" "}
        <button
          onClick={() => handleMark("italic", editor)}
          className={classes.format_button}
          style={isActive("italic", isMarkActive(editor, "italic"))}
        >
          <FormatItalic fontSize="small" />
        </button>{" "}
        <button
          onClick={() => handleMark("underline", editor)}
          className={classes.format_button}
          style={isActive("underline", isMarkActive(editor, "underline"))}
        >
          <FormatUnderlined fontSize="small" />
        </button>{" "}
        <button
          onClick={() => setAddLink(!isAddLink)}
          className={classes.format_button}
        >
          <Link fontSize="small" />
        </button>
        <button
          onClick={() => setIsAlign(!isAlign)}
          className={classes.format_button}
          style={isActive("align", isBlockActive(editor, ActiveAlign))}
        >
          <FormatAlignLeft fontSize="small" />
        </button>
        <button
          onClick={() => handleBlock("bulleted-list", editor)}
          className={classes.format_button}
          style={isActive(
            "bulleted-list",
            isBlockActive(editor, "bulleted-list")
          )}
        >
          <FormatListBulleted fontSize="small" />
        </button>
        <button
          onClick={() => handleBlock("numbered-list", editor)}
          className={classes.format_button}
          style={isActive(
            "numbered-list",
            isBlockActive(editor, "numbered-list")
          )}
        >
          <FormatListNumbered fontSize="small" />
        </button>
        <button
          onClick={() => handleBlock("check-list", editor)}
          className={classes.format_button}
          style={isActive("check-list", isBlockActive(editor, "check-list"))}
        >
          <CheckCircle fontSize="small" />
        </button>
      </div>

      {isFormatMany && (
        <RenderFormatMany
          handleBlock={handleBlock}
          handleMark={handleMark}
          setFormatMany={setFormatMany}
        />
      )}
      {isAddLink && (
        <AddLink
          isLinkActive={isLinkActive}
          myUrl={myUrl}
          setMyUrl={setMyUrl}
          isAddLink={isAddLink}
          addLink={addLink}
          setAddLink={setAddLink}
        />
      )}

      {isAlign && (
        <AlignTextDropdown
          handleBlock={handleBlock}
          setIsAlign={setIsAlign}
          setActiveAlign={setActiveAlign}
        />
      )}
    </Box>
  );
}
