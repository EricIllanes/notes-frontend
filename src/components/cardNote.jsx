import { useDispatch } from "react-redux";
import {
  EditIcon,
  IconArchive,
  IconTag,
  IconTrash,
  IconUnarchived,
} from "../assets/icons";
import "../styles/cardNote.css";
import {
  getNotesAsync,
  noteUpdate,
  noteDelete,
  noteDeleteAsync,
  noteUpdateAsync,
} from "../redux/reducerSlice";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function CardNotes({ title, content, tags, id, archived }) {
  useEffect(() => {
    truncatedText();
  });
  const dispatch = useDispatch();

  function handleClick(action) {
    if (action === "delete") {
      dispatch(noteDelete(id))
      // dispatch(noteDeleteAsync(id));
    } else if (action === "archive") {
      const infoNote = {
        title,
        content,
        id,
        tags,
        archived: !archived,
      };
      dispatch(noteUpdate(infoNote))
      // dispatch(noteUpdateAsync(infoNote));
    }
  }

  function truncatedText() {
    const titleCard = document.querySelector(".cardnote-title");

    if (titleCard && titleCard.textContent.length > 20) {
      const truncatedTitle = titleCard.textContent.substring(0, 23) + "...";
      titleCard.textContent = truncatedTitle;
    }
  }

  return (
    <main className="cardnote-container">
      <section className="cardnote-header">
        <h3 className="cardnote-title">{title}</h3>
        <div className="archive-icon-delete">
          <a
            onClick={() => {
              handleClick("delete");
            }}
          >
            <IconTrash />
          </a>
          <div className="tooltip">Borrar</div>
        </div>
        <div className="archive-icon-delete">
          <Link className="cardnote-link-to-edit" to={`/${id}`}>
            <EditIcon />
          </Link>

          <div className="tooltip">Edit</div>
        </div>
      </section>

      <article className="cardnote-body">{content}</article>
      <section className="cardnote-footer">
        <IconTag width={24} height={24} />
        {tags?.map((tag, index) => (
          <span key={index}>
            <a className="cardnote-tags">{tag.toLowerCase()}</a>
          </span>
        ))}
        {archived === false ? (
          <div className="archive-icon-container">
            <a
              value="archive"
              onClick={() => {
                handleClick("archive");
              }}
            >
              <IconArchive />
            </a>
            <div className="tooltip">Archivar</div>
          </div>
        ) : (
          <div className="archive-icon-container">
            <a
              value="archive"
              onClick={() => {
                handleClick("archive");
              }}
            >
              <IconUnarchived />
            </a>
            <div className="tooltip">Desarchivar</div>
          </div>
        )}
      </section>
    </main>
  );
}
