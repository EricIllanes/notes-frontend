import { useSelector, useDispatch } from "react-redux";
import "../styles/filterComponent.css";
import { noteFiltered } from "../redux/reducerSlice";
export default function FilteredOptions() {
  const { notes } = useSelector((state) => state.notes);
  const tags = [
    ...new Set(
      notes
        ?.map((notes) => {
          return notes.tags;
        })
        .flat()
        .filter((elements) => elements !== "")
    ),
  ];
  const dispatch = useDispatch();

  return (
    <section className="filter-container">
      <button
        onClick={() => dispatch(noteFiltered("all"))}
        className="filter-button"
      >
        All
      </button>
      {tags?.map((tags) => (
        <button
          onClick={() => dispatch(noteFiltered(tags))}
          className="filter-button"
          value={tags}
          key={tags}
        >
          {tags}
        </button>
      ))}
    </section>
  );
}
