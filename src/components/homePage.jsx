import { useState } from "react";
import { useSelector } from "react-redux";
import NavBar from "./navBar";
import "../styles/homepage.css";
import FormNotes from "./formNotes";
import CardNotes from "./cardNote";
import { IconArchive, IconUnarchived } from "../assets/icons";
import FilteredOptions from "./filterComponent";

export default function HomePage() {
  const { notes } = useSelector((state) => state.notes);
  const [showArchived, setShowArchived] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const nonArchived =
    notes?.length > 0 ? notes?.filter((note) => !note.archived) : [];
  const archivedOnes =
    notes?.length > 0 ? notes?.filter((note) => note.archived) : [];
  const handleToggleView = () => {
    setShowArchived(!showArchived);
  };
  console.log(notes)
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
      
      {notes?.length !== 0 ? <FilteredOptions /> : <></> }
      <div className="homepage-grid-notes">
        {showArchived === false &&
          showFilter === false &&
          nonArchived?.map((note) => (
            <div key={note.id}>
              <CardNotes
                setShowFilter={setShowFilter}
                showFilter={showFilter}
                id={note.id}
                title={note.title}
                content={note.content}
                tags={note.tags}
                archived={note.archived}
              />
            </div>
          ))}

        {showArchived == true &&
          showFilter == false &&
          archivedOnes?.map((note) => (
            <div key={note.id}>
              <CardNotes
                setShowFilter={setShowFilter}
                showFilter={showFilter}
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

