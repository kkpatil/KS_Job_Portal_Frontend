import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichTextEditor = ({ value, onChange }) => {
  return (
    <ReactQuill
      theme="snow"
     value={typeof value === "string" ? value : ""}
      onChange={onChange}
      className="h-40 mb-4"
    />
  );
};

export default RichTextEditor;
