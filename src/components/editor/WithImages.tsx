
import { Editor, Transforms } from "slate";
import { useFocused, useSelected } from "slate-react";
import { ImageElement, LinkElement, ParagraphElement } from "./customTypes";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";



/**
 *
 * @param editor
 * @returns
 */

export const withImages = (editor: Editor, setIsUploading: any) => {
  const { insertData, isVoid } = editor;

  editor.isVoid = (element: any) => {
    return element.type === "image" ? true : isVoid(element);
  };

  editor.insertData = (data: any) => {
    const text = data.getData("text/plain");

    const { files } = data;

    if (files && files.length > 0) {
      for (const file of files) {
        const reader = new FileReader();
        const [mime] = file.type.split("/");
        const mimeType: string = file.type;
        const filename: string = file.name;

        reader.addEventListener("load", () => {
          const base64file: any = reader.result;
          insertImage(editor, base64file, mimeType, setIsUploading, filename);
          setIsUploading(true);
        });
        reader.readAsDataURL(file);
      }
    } else if (text) {
      insertImage(editor, text, "text", setIsUploading, "");
      setIsUploading(true);
    } else {
      insertData(data);
    }
  };

  return editor;
};

//Inset the image into the editor
const insertImage = async (
  editor: Editor,
  base64file: string,
  mimeType: string,
  setIsUploading: any,
  filename: string
) => {
  // get the uploaded image's url and then insert the image into the editor nodes
  function handleUpload(base64file:string, mimeType:string) {

  }
  try {
    const response: any = await handleUpload(base64file, mimeType);
    if (response.uploadResponse.url) {
      const image: ImageElement = {
        type: "image",
        url: response.image_url,
        children: [{ text: "" }],
      };
      const Link: LinkElement = {
        type: "link",
        url: response.image_url,
        children: [{ text: filename }],
      };
      const paragraph: ParagraphElement = {
        type: "paragraph",
        children: [{ text: "", bold: false }],
      };

      // if mimeType is not image insert the link element
      if (!mimeType.includes("image")) {
        Transforms.insertNodes(editor, Link);
        setIsUploading(false);
      } else {
        Transforms.insertNodes(editor, image);
        Transforms.insertNodes(editor, paragraph);
        setIsUploading(false);
      }
    }
  } catch (err) {
    //dispatch(extraDataActions.setEditorUploading(false))
  }
};

// the image element that renders the image in the editor
export const __ImageElement = ({ attributes, children, element }: any) => {
  const dispatch = useAppDispatch()
  //const { imagePreview } = useAppSelector((state) => state.ExtraDataReducer);
  function previewImage() {
    dispatch(
      // previewPhoto({ isActive: !imagePreview.isActive, imageURL: element.url })
    );
  }
  const selected = useSelected();
  const focused = useFocused();
  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <img
          onClick={previewImage}
          src={element.url}
          alt=""
          style={{
            display: "block",
            width: '100%',
            height: '100%',
            maxHeight: "20em",
            objectFit: 'contain',
            boxShadow: selected && focused ? "0 0 0 3px #B4D5FF" : "none",
          }}
        />
      </div>
      {children}
    </div>
  );
};
