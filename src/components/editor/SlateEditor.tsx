
import isHotkey from "is-hotkey";
import {
  ReactElement,
  useCallback,
  useMemo, useState,
} from "react";
import { Editable, Slate, withReact } from "slate-react";
import EditorHeader from "./EditorHeader";

import {
  createEditor,
  Descendant, Editor, Element as SlateElement, Transforms
} from "slate";
import { withHistory } from "slate-history";

import {
  CustomEditor, CustomElement, CustomText,
  EmptyText
} from "./customTypes";
import { Element, Leaf } from "./EditorElements";
import { withImages } from "./WithImages";
import { insertLink, isLinkActive, unwrapLink, withLinks } from "./WithLinks";

import { styled } from "@mui/material";
import { Box, CircularProgress, colors } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import EditorFooter from "./editor-footer";
import { colorScheme } from "../../theme";



const EditorWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : colorScheme(theme).lightGreyToSecondaryColor,
  borderRadius: 7,
  border: `1px solid`,
  borderColor: theme.palette.mode === 'light' ? colors.teal[400] : colors.teal[400],
  minHeight: 100,
  paddingBottom: 0,
}))


const ActivityIndicatorContainer = styled(Box)(() => ({
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  zIndex: 60,
  borderRadius: 5,
  backgroundColor: '#f9f9f9e0',
}))



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

const LIST_TYPES = ["numbered-list", "bulleted-list"];
interface Props {
  value?: Descendant[];
  onValueUpdate: (value: Descendant[]) => void;
  onCancel: () => void;
  onSave?: undefined | any
}



export default function SlateEditor({ value, onValueUpdate, onCancel }: Props): ReactElement {

  // slate leaves
  const renderElement = useCallback((props: any) => <Element {...props} />, []);
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);
  const dispatch = useAppDispatch()
  const initialValue: Descendant[] = [
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]

  // const isEditorUploading = useAppSelector((state) => state.ExtraDataReducer.isEditorUploading)
  const [editorValue, setEditorValue] =
    useState<Descendant[]>(value ?? initialValue);

  function setEditorUploading(bool: boolean) {
    //dispatch(extraDataActions.setEditorUploading(bool))
  }
  const [editor] = useState(
    () =>
      withLinks(
        withImages(withHistory(withReact(createEditor())), setEditorUploading)
      ),
  );
 


  const [headerState, setHeaderState] = useState({
    isBold: false,
    isItalic: false,
  });

  // get current selection for block elements
  const isBlockActive = (editor: Editor, format: string) => {
    const [match]: any = Editor.nodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
    });

    return !!match;
  };

  const handleBlock = (format: string, editor: Editor) => {
    const isActive = isBlockActive(editor, format);
    const isList = LIST_TYPES.includes(format);

    // Transforms.unwrapNodes(editor, {
    //   match: (n) =>LIST_TYPES.includes(!Editor.isEditor(n) && SlateElement.isElement(n) && n.type),
    //   split: true,
    // });

    const newProperties: any = {
      type: isActive ? "paragraph" : isList ? "list-item" : format,
    };

    Transforms.setNodes(editor, newProperties);

    if (!isActive && isList) {
      const block: any = { type: format, children: [] };
      Transforms.wrapNodes(editor, block);
    }
  };

  // function that handle mark for inline elements
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

  //get the current mark
  const isMarkActive = (editor: Editor, format: string) => {
    const marks: any = Editor.marks(editor);
    return marks ? marks[format] === true : false;
  };

  // handler for keyboard shortcuts
  function handleHotKeys(event: any) {
    for (const hotkey in HOTKEYS) {
      if (isHotkey(hotkey, event as any)) {
        event.preventDefault();
        const mark = HOTKEYS[hotkey];
        handleMark(mark, editor);
      }
    }
    // const n: any = Editor.nodes(editor, {at:(n) =>n.});
    // console.log(n);
  }

  // add url
  const [myUrl, setMyUrl] = useState<string>("");
  function addLink() {
    const isActive = isLinkActive(editor);
    if (isActive) {
      unwrapLink(editor);
    } else {
      if (!myUrl) return;
      insertLink(editor, myUrl);
    }
  }



  return (
    <>
      <EditorWrapper>
        {false && (
          <ActivityIndicatorContainer>
            <CircularProgress />
          </ActivityIndicatorContainer>
        )}
        <Slate
          editor={editor}

          //value={editorValue}
          initialValue={initialValue}
          onValueChange={(value: any) => {
            setEditorValue(value)
            console.log(value)
          }}

        >
          <EditorHeader
            handleMark={handleMark}
            isMarkActive={isMarkActive}
            handleBlock={handleBlock}
            isBlockActive={isBlockActive}
            addLink={addLink}
            isLinkActive={isLinkActive}
            myUrl={myUrl}
            setMyUrl={setMyUrl}
          />
          <Box sx={{ px: 1, lineHeight: 1.5, }}>
            <Editable
              style={{ minHeight: 80, outline: 'none' }}
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              spellCheck
              autoFocus
              onKeyDown={handleHotKeys}
            />
          </Box>
        </Slate>
      </EditorWrapper>

      <EditorFooter
        editor={editor}
        onCancel={onCancel}
        value={value ?? initialValue}
        onValueUpdate={() => {
          onValueUpdate(editorValue)
        }} />
    </>
  );
}
