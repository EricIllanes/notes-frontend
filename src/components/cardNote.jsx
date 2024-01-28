import { useDispatch } from "react-redux";
import {
  EditIcon,
  IconArchive,
  IconTag,
  IconTrash,
  IconUnarchived,
} from "../assets/icons";
import "../styles/cardNote.css";
import { noteUpdate, noteDelete, noteFiltered } from "../redux/reducerSlice";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function CardNotes({ title, content, tags, id, archived }) {
  useEffect(() => {
    truncatedText();
  });
  const dispatch = useDispatch();
  function handleClick(action) {
    if (action === "delete") {
      dispatch(noteDelete(id));
    } else if (action === "archive") {
      const infoNote = {
        title,
        content,
        id,
        tags,
        archived: !archived,
      };
      dispatch(noteUpdate(infoNote));
    }
  }
  const coloresPasteles = [
    '#FFD1DC', // Rosa pálido
    '#FFECB3', // Amarillo pastel
    '#B2DFDB', // Verde menta
    '#FFC0CB', // Rosa claro
    '#D8BFD8', // Lila pálido
    '#FFDAB9', // Melocotón claro
    '#C1E1A3', // Verde claro
    '#FFD700', // Amarillo claro
    '#98FB98', // Verde almendra
    '#87CEEB'  // Azul cielo
  ];
  

  function truncatedText() {
    const titleCard = document.querySelector(".cardnote-title");

    if (titleCard && titleCard.textContent.length > 10) {
      const truncatedTitle = titleCard.textContent.substring(0, 9) + "...";
      titleCard.textContent = truncatedTitle;
    }
  }

  function handleFilter(tag) {
    dispatch(noteFiltered(tag));
  }

  return (
    <main className="cardnote-container" style={{backgroundColor: coloresPasteles[(Math.floor(Math.random()*10))] }}>
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
            <a
              className="cardnote-tags"
              onClick={() => {
                handleFilter(tag);
              }}
            >
              {tag.toLowerCase()}
            </a>
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
            <div className="tooltip">Archive</div>
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
            <div className="tooltip">Unarchive</div>
          </div>
        )}
      </section>
    </main>
  );
}
