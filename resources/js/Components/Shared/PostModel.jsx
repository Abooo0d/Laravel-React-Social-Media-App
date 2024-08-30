import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./index.css";
const PostModel = () => {
  return <CKEditor editor={ClassicEditor} style={{ backgroundColor: "red" }} />;
};

export default PostModel;
