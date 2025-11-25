import { Button } from "@/components/ui/button";
import Notesidebar from "./Notesidebar";
import Header from "./Header";
import { useEffect, useState } from "react";
import NoteView from "./Note-View";
import NoteEditor from "./NoteEditor";
import EmptyState from "./EmptyState";
import { saveNotes } from "../lib/storage";
import { loadNotes } from "../lib/storage";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setNotes(loadNotes());
  }, []);

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const createNewNote = () => {
    const newNote = {
      id: Date.now().toString(),
      title: "New Note",
      content: "",
      createdAt: Date.now(),
    };
    console.log(newNote);
    setActiveNote(newNote);
    setNotes((prev) => [...prev, newNote]);
    setIsEditing(true);
  };

  const selectNote = (note) => {
    setActiveNote(note);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setIsEditing(false);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
    if (activeNote && activeNote.id === id) {
      setActiveNote(null);
      setIsEditing(false);
    }
  };

  const saveNote = (updatedNote) => {
    setNotes(
      notes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
    setActiveNote(updatedNote);
    setIsEditing(false);
  };
  const RenderNoteContent = () => {
    if (!activeNote && notes.length === 0) {
      return (
        <EmptyState
          message="Create your first note to get started"
          buttonText="New Note"
          onButtonClick={createNewNote}
        />
      );
    }

    if (activeNote && isEditing) {
      return (
        <NoteEditor note={activeNote} onSave={saveNote} onCancel={cancelEdit} />
      );
    }
    if (activeNote) {
      return (
        <NoteView
          note={activeNote}
          onEdit={() => {
            setIsEditing(true);
          }}
        />
      );
    }
    return <div>Hi there</div>;
  };
  return (
    <div className="flex flex-col min-h-screen">
      <Header onNewNote={createNewNote} />
      <main className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
        <div className="md:col-span-1">
          <Notesidebar
            onButtonClick={createNewNote}
            notes={notes}
            onSelectNote={selectNote}
            onDeleteNote={deleteNote}
            activeNoteId={activeNote?.id}
          />
        </div>
        <div className="md:col-span-2">
          <RenderNoteContent createNewNote={createNewNote} />
        </div>
      </main>
    </div>
  );
}
