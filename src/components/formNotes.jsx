import { useDispatch, useSelector } from "react-redux";
import { noteAdd, noteAddAsync } from "../redux/reducerSlice";
import { useState } from "react";
import "../styles/formNotes.css";

export default function FormNotes() {
  const dispatch = useDispatch();
  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  const [tags, setTags] = useState([]);

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
    dispatch(noteAdd({
      archived: false,
      id: Date.now(),
      tags,
      ...note,
    }))

    // dispatch for async action 
    // dispatch(
    //   noteAddAsync({
    //     archived: false,
    //     tags: tags,
    //     ...note,
    //   })
    // );

    setNote({
      title: "",
      content: "",
    });

    setTags([])
  }
  return (
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

      <button type="submit">Create Note</button>
    </form>
  );
}