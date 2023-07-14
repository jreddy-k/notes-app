import NoteItem from "./NoteItem";
import { Note } from "./NoteListContainer";

interface NoteListProps {
  notes: Note[];
  onDelete: (id: number) => void;
  onUpdate: (note: Note) => void;
}

export const NoteList: React.FC<NoteListProps> = ({
  notes,
  onDelete,
  onUpdate,
}) => {
  return (
    <div>
      <h2>Notes</h2>
      <div className="row">
        {notes.map((note) => (
          <div className="col-md-3">
            <NoteItem
              key={note.id}
              note={note}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
