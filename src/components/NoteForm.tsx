import { useState } from "react";
import { NoteFormValues } from "./NoteListContainer";

interface NoteFormProps {
  initialValues?: NoteFormValues;
  onSubmit: (note: NoteFormValues) => void;
  onCancel?: () => void;
}

export const NoteForm: React.FC<NoteFormProps> = ({
  initialValues = { title: "", content: "" },
  onSubmit,
  onCancel,
}) => {
  const [title, setTitle] = useState(initialValues.title);
  const [content, setContent] = useState(initialValues.content);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, content });
    setTitle("");
    setContent("");
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <button type="submit" className="button primary">
            Add
          </button>
        </div>
        {onCancel && <button onClick={handleCancel}>Cancel</button>}
      </form>
    </div>
  );
};
