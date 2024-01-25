import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "./navBar";
import "../styles/homepage.css";
import FormNotes from "./formNotes";
import CardNotes from "./cardNote";
import { IconArchive, IconUnarchived } from "../assets/icons";
import { getNotesAsync } from "../redux/reducerSlice";

export default function HomePage() {
  const { notes } = useSelector((state) => state.notes);
  const [showArchived, setShowArchived] = useState(false);
  const dispatch = useDispatch();
  const nonArchived =
    notes?.length > 0 ? notes?.filter((note) => !note.archived) : [];
  const archivedOnes =
    notes?.length > 0 ? notes?.filter((note) => note.archived) : [];
  const handleToggleView = () => {
    setShowArchived(!showArchived);
  };

  return (
    <main className="homepage-container">
      <NavBar />
      <FormNotes />
      {showArchived ? (
        <button onClick={handleToggleView} className="homepage-buttonarchived">
          Show non-archived notes <IconUnarchived />
        </button>
      ) : (
        <button onClick={handleToggleView} className="homepage-buttonarchived">
          {" "}
          Show archived notes <IconArchive />
        </button>
      )}
      <div className="homepage-grid-notes">
        {showArchived
          ? archivedOnes?.map((note) => (
              <div key={note.id}>
                <CardNotes
                  id={note.id}
                  title={note.title}
                  content={note.content}
                  tags={note.tags}
                  archived={note.archived}
                />
              </div>
            ))
          : nonArchived?.map((note) => (
              <div key={note.id}>
                <CardNotes
                  id={note.id}
                  title={note.title}
                  content={note.content}
                  tags={note.tags}
                  archived={note.archived}
                />
              </div>
            ))}
      </div>
    </main>
  );
}
