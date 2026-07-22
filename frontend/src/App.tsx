import { useEffect, useState, type FormEvent } from "react";
import "./App.css";

type Song = {
  id: number;
  title: string;
  artist: string;
  genre: string;
  durationInSeconds: number;
  year: number;
  isFavorite: boolean;
};

type SongFormState = Omit<Song, "id"> & { id: number };

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000";
const API_URL = `${API_BASE_URL}/api/Songs`;

const createEmptyForm = (): SongFormState => ({
  id: 0,
  title: "",
  artist: "",
  genre: "",
  durationInSeconds: 180,
  year: new Date().getFullYear(),
  isFavorite: false,
});

function App() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [form, setForm] = useState<SongFormState>(() => createEmptyForm());
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSongs = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Unable to load songs from the API.");
      }

      const data = (await response.json()) as Song[];
      setSongs(data);
      if (data.length > 0 && !selectedSong) {
        setSelectedSong(data[0]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  const loadSongDetails = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) {
        throw new Error("Unable to load song details.");
      }

      const data = (await response.json()) as Song;
      setSelectedSong(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    }
  };

  useEffect(() => {
    void loadSongs();
  }, []);

  const resetForm = () => {
    setForm(createEmptyForm());
    setIsEditing(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const payload = {
      ...form,
      durationInSeconds: Number(form.durationInSeconds),
      year: Number(form.year),
      isFavorite: Boolean(form.isFavorite),
    };

    try {
      const response = await fetch(
        isEditing ? `${API_URL}/${form.id}` : API_URL,
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        throw new Error("The song could not be saved.");
      }

      await loadSongs();
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this song?")) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Unable to delete the song.");
      }

      if (selectedSong?.id === id) {
        setSelectedSong(null);
      }

      await loadSongs();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    }
  };

  const handleEdit = (song: Song) => {
    setForm(song);
    setIsEditing(true);
    setError(null);
  };

  return (
    <main className="app-shell">
      <header className="hero-panel">
        <div>
          <p className="eyebrow">Music Inventory</p>
          <h1>Manage your songs from one place</h1>
          <p className="subtitle">
            Create, edit, and remove tracks while viewing a selected song detail
            at a glance.
          </p>
        </div>
        <button type="button" className="secondary-button" onClick={resetForm}>
          Clear form
        </button>
      </header>

      {error ? <p className="error-banner">{error}</p> : null}

      <section className="content-grid">
        <div className="panel">
          <h2>{isEditing ? "Edit song" : "Add a song"}</h2>
          <form className="song-form" onSubmit={handleSubmit}>
            <label>
              Title
              <input
                value={form.title}
                onChange={(event) =>
                  setForm({ ...form, title: event.target.value })
                }
                required
              />
            </label>
            <label>
              Artist
              <input
                value={form.artist}
                onChange={(event) =>
                  setForm({ ...form, artist: event.target.value })
                }
                required
              />
            </label>
            <label>
              Genre
              <input
                value={form.genre}
                onChange={(event) =>
                  setForm({ ...form, genre: event.target.value })
                }
                required
              />
            </label>
            <label>
              Duration (seconds)
              <input
                type="number"
                min="1"
                value={form.durationInSeconds}
                onChange={(event) =>
                  setForm({
                    ...form,
                    durationInSeconds: Number(event.target.value),
                  })
                }
                required
              />
            </label>
            <label>
              Year
              <input
                type="number"
                min="1900"
                value={form.year}
                onChange={(event) =>
                  setForm({ ...form, year: Number(event.target.value) })
                }
                required
              />
            </label>
            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={form.isFavorite}
                onChange={(event) =>
                  setForm({ ...form, isFavorite: event.target.checked })
                }
              />
              Favorite
            </label>
            <button type="submit" className="primary-button">
              {isEditing ? "Save changes" : "Add song"}
            </button>
          </form>
        </div>

        <div className="panel">
          <h2>Songs</h2>
          {loading ? <p>Loading songs…</p> : null}
          {!loading && songs.length === 0 ? (
            <p>No songs yet. Add one to get started.</p>
          ) : null}
          <ul className="song-list">
            {songs.map((song) => (
              <li key={song.id} className="song-item">
                <button
                  type="button"
                  className="song-summary"
                  onClick={() => void loadSongDetails(song.id)}
                >
                  <span>{song.title}</span>
                  <small>{song.artist}</small>
                </button>
                <div className="song-actions">
                  <button type="button" onClick={() => handleEdit(song)}>
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => void handleDelete(song.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="panel">
          <h2>Song detail</h2>
          {selectedSong ? (
            <div className="detail-card">
              <h3>{selectedSong.title}</h3>
              <p>
                <strong>Artist:</strong> {selectedSong.artist}
              </p>
              <p>
                <strong>Genre:</strong> {selectedSong.genre}
              </p>
              <p>
                <strong>Duration:</strong> {selectedSong.durationInSeconds}s
              </p>
              <p>
                <strong>Year:</strong> {selectedSong.year}
              </p>
              <p>
                <strong>Favorite:</strong>{" "}
                {selectedSong.isFavorite ? "Yes" : "No"}
              </p>
            </div>
          ) : (
            <p>Select a song to see more details.</p>
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
