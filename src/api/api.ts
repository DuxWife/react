import { NotesModel } from '../models/notes';
import axios from 'axios';

const baseURL = 'http://homestead.test/api';

export function getAllNotes() {
  return axios.get("http://homestead.test/api/notes", 
    {
    withCredentials: true,
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'}
    }
  )
}

export function addNote(note) {
  return axios.post("http://homestead.test/api/notes", 
    {
      note: note,
    }, 
    {
      withCredentials: true,
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'}
    }
  )
}

export function editNote(id, note) {
  return axios.put("http://homestead.test/api/notes/" + id,
    {
      update_note: note,
    },
    {
      withCredentials: true,
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'}
    }
  )
}

export function deleteNote(id) {
  return axios.delete("http://homestead.test/api/notes/" + id,
    {
      withCredentials: true,
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'}
    }
  )
}

export function loginAPI(email, password) {
  return axios.post("http://homestead.test/api/login",
    {
      email: email,
      password: password,
    },
    {
      withCredentials: true,
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'}
    }
  )
} 

export function registerAPI(name, email, password, password_confirmation) {
  return axios.post("http://homestead.test/api/register",
    {
      name: name,
      email: email,
      password: password,
      password_confirmation: password_confirmation,
    },
    {
      withCredentials: true,
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'}
    }
  )
}

export function logoutAPI() {
  return axios.post("http://homestead.test/api/logout",
    {

    },
    {
      withCredentials: true,
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'}
    }
  )
}