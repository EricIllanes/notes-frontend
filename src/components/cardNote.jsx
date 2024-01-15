import { useDispatch } from "react-redux";
import { IconArchive, IconTag, IconTrash, IconUnarchived } from "../assets/icons";
import "../styles/cardNote.css";
import { getNotesAsync, noteArchive, noteDelete, noteDeleteAsync, noteUpdateAsync } from "../redux/reducerSlice";

export default function CardNotes({ title, content, tags, id, archived}) {
  const dispatch = useDispatch();

  function handleClick(action) {
    if(action=== "delete"){
      dispatch(noteDeleteAsync(id))
    } else if(action === "archive"){
      const infoNote={
        title,
        content,
        id,
        tags,
        archived: !archived,
      }
      dispatch(noteUpdateAsync(infoNote))
    }
  }

  return (
    <main className="cardnote-container">
      <section className="cardnote-header">
        <h3>{title}</h3>
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
      </section>

      <article className="cardnote-body">{content}</article>
      <section className="cardnote-footer">
        <IconTag width={24} height={24} />
        {tags?.map((tag, index) => (
          <span key={index}>
            <a className="cardnote-tags">#{tag.toLowerCase()}</a>
          </span>
        ))}
{archived === false ?
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
      :

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
}
      </section>
    </main>
  );
}
