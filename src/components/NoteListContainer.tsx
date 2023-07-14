import { fetchNotes, createNote } from "./apiService";
import { useState, useEffect } from "react";
import { NoteForm } from "./NoteForm";
import { NoteList } from "./NoteList";

export interface NoteFormValues {
  title: string;
  content: string;
}

export interface Note {
  id: number;
  title: string;
  content: string;
  date: string;
}

interface NoteListContainerProps {}

const NoteListContainer: React.FC<NoteListContainerProps> = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    fetchNotesData();
  }, []);

  const fetchNotesData = async () => {
    try {
      const fetchedNotes = await fetchNotes();
      setNotes(fetchedNotes);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleNoteCreate = async (noteData: NoteFormValues) => {
    try {
      const createdNote = await createNote(noteData);
      setNotes([...notes, createdNote]);
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const handleNoteUpdate = (updatedNote: Note) => {
    const updatedNotes = notes.map((note) =>
      note.id === updatedNote.id ? updatedNote : note
    );
    setNotes(updatedNotes);
  };

  const handleNoteDelete = (noteId: number) => {
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    setNotes(updatedNotes);
  };

  return (
    <div>
      <h2>Notes</h2>
      <NoteForm onSubmit={handleNoteCreate} />
      <NoteList
        notes={notes}
        onDelete={handleNoteDelete}
        onUpdate={handleNoteUpdate}
      />
    </div>
  );
};

export default NoteListContainer;
