import axios from 'axios';
import { NoteFormValues } from './NoteListContainer';

const apiService = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
});

export const fetchNotes = async () => {
  try {
    const response = await apiService.get('notes/');
    return response.data;
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
};

export const createNote = async (noteData: NoteFormValues) => {
  try {
    const response = await apiService.post('notes/', noteData);
    return response.data;
  } catch (error) {
    console.error('Error creating note:', error);
    throw error;
  }
};

export const updateNote = async (noteId: number, noteData: NoteFormValues) => {
  try {
    const response = await apiService.put(`/notes/${noteId}/`, noteData);
    return response.data;
  } catch (error) {
    console.error('Error updating note:', error);
    throw error;
  }
};

export const deleteNote = async (noteId: number) => {
  try {
    await apiService.delete(`/notes/${noteId}/`);
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error;
  }
};
