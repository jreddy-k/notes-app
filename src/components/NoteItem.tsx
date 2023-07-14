import { deleteNote, updateNote } from "./apiService";
import { useState } from "react";
import { NoteForm } from "./NoteForm";
import { Note } from "./NoteListContainer";
import edit from "../images/icons/edit.svg";
import trash from "../images/icons/trash-2.svg";

interface NoteItemProps {
  note: Note;
  onDelete: (id: number) => void;
  onUpdate: (note: Note) => void;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const handleUpdate = async () => {
    try {
      const updatedNote = await updateNote(note.id, { title, content });
      onUpdate(updatedNote);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteNote(note.id);
      onDelete(note.id);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <>
      {isEditing ? (
        <NoteForm
          initialValues={{ title, content }}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div className="card fluid">
          <div className="section dark">
            <div className="row">
              <div className="col-sm-10 doc">{note.title}</div>
              <img
                className="col-sm-1"
                src={edit}
                onClick={() => setIsEditing(true)}
              ></img>
              <img
                className="col-sm-1"
                src={trash}
                onClick={handleDelete}
              ></img>
            </div>
          </div>
          <div className="section">{note.content}</div>
        </div>
      )}
    </>
  );
};

export default NoteItem;
