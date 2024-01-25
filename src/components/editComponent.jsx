import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getNoteByIdAsync, getNotesAsync, noteUpdate, noteUpdateAsync } from "../redux/reducerSlice";

import "../styles/editComponent.css";
import NavBar from "./navBar";

export default function EditNote() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [note, setNote] = useState({
    title: "",
    archived: "",
    content: "",
  });
  const [tags, setTags] = useState([]);
  const {notes} = useSelector(state=>state.notes)

useEffect(()=>{
  if(notes.length != 0){
    const noteFind = notes.find((note)=> note.id == id)
    if(noteFind){
      note.content = noteFind.content,
      note.title=noteFind.title,
      note.archived=noteFind.archived,
      setTags(noteFind.tags)
    }
  }
}, [])

  function handleChange(event) {
    event.preventDefault();
    if (event.target.name === "tags") {
      const selectedTags = event.target.value.split(" ");
      setTags(selectedTags);
    } else {
      setNote({
        ...note,
        [event.target.name]: event.target.value,
      });
    }
  }
  function handleSubmit(event) {
    event.preventDefault();
    dispatch(noteUpdate({
              id,
        archived: false,
        tags: tags,
        ...note,
    }))
    navigate("/");
  }
  function handleCancel() {
    navigate("/");
  }
  if (note?.title) {
    return (

      <div className="editcomponent-container">
              {/* <NavBar /> */}
        <form
          className="formnote-form"
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <input
            className="formnote-title"
            name="title"
            value={note.title}
            onChange={handleChange}
            placeholder="Add a title..."
          />
          <textarea
            name="content"
            type="text"
            value={note.content}
            placeholder="Write your note here..."
            onChange={handleChange}
          />
          <input
            name="tags"
            value={tags?.join(" ")}
            onChange={handleChange}
            placeholder="#general #study"
          />
          <section className="editcomponent-section-button">
            <button
              className="button-edit"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button className="button-edit" type="submit">
              Save
            </button>
          </section>
        </form>
      </div>
    );
  }
}
