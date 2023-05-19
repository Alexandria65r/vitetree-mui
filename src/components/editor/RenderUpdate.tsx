import { ReactElement, useCallback, useMemo, useState } from "react";
import classes from "./editor.module.scss";

import { Editable, withReact, Slate } from "slate-react";
import isHotkey from "is-hotkey";

//import { serialize } from "./editor/editorSerializer";

import {
  Editor,
  createEditor,
  Descendant,
} from "slate";
import { withHistory } from "slate-history";

import {
  CustomElement,
  CustomEditor,
  CustomText,
  EmptyText,
} from "./customTypes";
import { withImages } from "./WithImages";
import { withLinks } from "./WithLinks";
import { Element, Leaf } from "./EditorElements";
const HOTKEYS: any = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText | EmptyText;
  }
}
interface Props {
  update: Descendant[];
}

export default function ReaderUpdate({ update }: Props): ReactElement {
  // editor state

  // slate leaves
  const renderElement = useCallback((props:any) => <Element {...props} />, []);
  const renderLeaf = useCallback((props:any) => <Leaf {...props} />, []);

  const editor = useMemo(
    () =>
      withLinks(
        withImages(withHistory(withReact(createEditor())), {})
      ),
    []
  );

  console.log(update)

  const [headerState, setHeaderState] = useState({
    isBold: false,
    isItalic: false,
  });

  // console.log(serialize(editor));


  const handleMark = (format: string, editor: Editor) => {
    const isActive = isMarkActive(editor, format);

    if (isActive) {
      setHeaderState({ ...headerState, isBold: !isActive });
      Editor.removeMark(editor, format);
    } else {
      setHeaderState({ ...headerState, isBold: !isActive });
      Editor.addMark(editor, format, true);
    }
  };
  const isMarkActive = (editor: Editor, format: string) => {
    const marks: any = Editor.marks(editor);
    return marks ? marks[format] === true : false;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handleHotKeys(event: any) {
    for (const hotkey in HOTKEYS) {
      if (isHotkey(hotkey, event as any)) {
        event.preventDefault();
        const mark = HOTKEYS[hotkey];
        handleMark(mark, editor);
      }
    }
  }


  const RenderUpdate = useCallback(() => (
    <Slate editor={editor} value={update} onChange={(value) => value}>
      <Editable
        readOnly={true}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        spellCheck
        autoFocus
        onKeyDown={handleHotKeys}
      />
    </Slate>
  
  ), [editor, update, renderElement, renderLeaf, handleHotKeys])


  return (
    <div className={classes.readOnly_wrapper}>
      <RenderUpdate />
    </div>
  );
}
