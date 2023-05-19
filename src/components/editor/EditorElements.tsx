import React from "react";
import { Element as SlateElement, Transforms } from "slate";
import { ReactEditor, useReadOnly, useSlateStatic } from "slate-react";
import { __ImageElement } from "./WithImages";

export const Element = (props: any) => {
  const { attributes, children, element } = props;
  switch (element.type) {
    case "block-quote":
      return (
        <blockquote {...attributes} style={{ margin: "10px 5px", color: 'var(--text-color)', }}>
          <span
            style={{ borderLeft: "3px solid #ddd", marginRight: "10px", color: 'var(--text-color)', }}
          ></span>
          {children}
        </blockquote>
      );
    case "bulleted-list":
      return (
        <ul style={{ margin: "10px 5px", color: 'var(--text-color)', }} {...attributes}>
          {children}
        </ul>
      );
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>;
    case "align-left":
      return (
        <p style={{ textAlign: "left", color: 'var(--text-color)', }} {...attributes}>
          {children}
        </p>
      );
    case "align-center":
      return (
        <p style={{ textAlign: "center", color: 'var(--text-color)', }} {...attributes}>
          {children}
        </p>
      );
    case "align-right":
      return (
        <p style={{ textAlign: "right", color: 'var(--text-color)', }} {...attributes}>
          {children}
        </p>
      );
    case "heading-four":
      return <h3 {...attributes}>{children}</h3>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>;
    case "link":
      return (
        <a {...attributes} target="_blank" href={element.url}>
          {children}
        </a>
      );
    case "check-list":
      return <CheckListItemElement {...props} />;
    case "image":
      return <__ImageElement {...props} />;
    default:
      return (
        <p
          style={{
            margin: 0,
            color: 'var(--primary)',
            fontSize: 14,
            backgroundColor: "var(--thread-bg-color)",
          }}
          {...attributes}
        >
          {children}
        </p>
      );
  }
};

// This is a function that makes the checklist
//to work
export const CheckListItemElement = ({
  attributes,
  children,
  element,
}: any) => {
  const editor = useSlateStatic();
  const readOnly = useReadOnly();
  const { checked } = element;

  return (
    <div
      {...attributes}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
        marginBottom: 5,
      }}
    >
      <span
        contentEditable={false}
        style={{
          marginRight: "0.35em",
        }}
      >
        <input
          type="checkbox"
          style={{ height: 16, width: 16, borderRadius: "50%" }}
          checked={checked}
          disabled={readOnly}
          onChange={(event) => {
            const path = ReactEditor.findPath(editor, element);
            const newProperties: Partial<SlateElement> = {
              checked: event.target.checked,
            };
            Transforms.setNodes(editor, newProperties, { at: path });
          }}
        />
      </span>
      <span
        contentEditable={!readOnly}
        suppressContentEditableWarning
        style={{
          flex: 1,
          fontSize: 14,
          opacity: checked ? 0.666 : 1,
          textDecoration: !checked ? "none" : "line-through",
        }}
      >
        {children}
      </span>
    </div>
  );
};

//Leaf element
export const Leaf = ({ attributes, children, leaf }: any) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    return <code {...attributes}>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};
