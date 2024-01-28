import { useDispatch, useSelector } from "react-redux";
import { noteAdd } from "../redux/reducerSlice";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import "../styles/formNotes.css";
import "react-toastify/dist/ReactToastify.css";
export default function FormNotes() {
  const dispatch = useDispatch();
  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  const [tags, setTags] = useState([]);

  const notify = () => {
    const notifications = {
      success: () =>
        toast.success("Note created", {
          position: "top-right",
          autoClose: 1000,
        }),
      error: () =>
        toast.error("Error Notification !", { position: "top-left" }),
      warn: (element) =>
        toast.warn(`${element} is required`, {
          position: "top-right",
          autoClose: 1000,
        }),
      info: () =>
        toast.info("Info Notification !", { position: "bottom-center" }),
      custom: () =>
        toast("Custom Style Notification with css class!", {
          position: "bottom-right",
          className: "foo-bar",
        }),
    };

    return notifications;
  };

  function handleSubmit(event) {
    event.preventDefault();
    const notifications = notify();
    if (note.title === "") {
      return notifications.warn("Title");
    }
    if (note.content === "") {
      return notifications.warn("Content");
    }

    if (tags.length == 0) {
      return notifications.warn("At least one tag");
    }
    dispatch(
      noteAdd({
        archived: false,
        id: Date.now(),
        tags,
        ...note,
      })
    );

    notifications.success();
    setNote({
      title: "",
      content: "",
    });

    setTags([]);
  }

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

  return (
    <div>
      <ToastContainer stacked />
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
    </div>
  );
}
