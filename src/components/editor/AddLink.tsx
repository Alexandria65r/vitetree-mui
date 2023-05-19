import React, { ReactElement, useState } from "react";

import { useSlate } from "slate-react";
import { Transforms } from "slate";

import classes from "./editor.module.scss";
import { LinkElement } from "./customTypes";
import { Link } from "@mui/material";
interface Props {
  setAddLink: any;
  addLink: any;
  isLinkActive: (editor: any) => boolean;
  myUrl: string;
  setMyUrl: any;
  isAddLink: Boolean;
}

export default function AddLink({
  setAddLink,
  isLinkActive,
  isAddLink,
}: Props): ReactElement {
  const editor = useSlate();
  const [url, setMyUrl] = useState<string>("");
  const [linkText, setLink] = useState<string>("");

  function handleAddLink(e: any) {
    e.preventDefault();
    if (url) {
      const link: LinkElement = {
        type: "link",
        url,
        children: [{ text: linkText }],
      };
      Transforms.insertNodes(editor, link);
      setAddLink(false);
    }
  }

  return (
    <div className={classes.add_link_wrapper}>
      <div className={classes.header}>
        <p>Insert a Link</p>
      </div>
      <div className={classes.inner_container}>
        <form onSubmit={handleAddLink}>
          {!isLinkActive(editor) ? (
            <>
              <input
                type="text"
                value={url}
                onChange={({ target }) => setMyUrl(target.value)}
                placeholder="add url eg example.com"
              />
              <input
                type="text"
                value={linkText}
                onChange={({ target }) => setLink(target.value)}
                placeholder="Text"
              />
              <div className={classes.add_link_button_wrap}>
                <button>
                  Link
                </button>
              </div>
            </>
          ) : (
            <button className={classes.remove_link}>Remove Link</button>
          )}
        </form>
      </div>
    </div>
  );
}
