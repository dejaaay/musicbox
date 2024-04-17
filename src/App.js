import "./App.css";
import { useState } from "react";
const tempMusicData = [
  { id: 1, title: "The Scientist", artist: "Coldplay", genre: "Emo", userRating: 4 },
  { id: 2, title: "Viva La Vida", artist: "Coldplay", genre: "Alternative", userRating: 5 },
  { id: 3, title: "Believer", artist: "Imagine Dragons", genre: "Rock", userRating: 4 },
  { id: 4, title: "Shape of You", artist: "Ed Sheeran", genre: "Pop", userRating: 3 },
  { id: 5, title: "Lose Yourself", artist: "Eminem", genre: "Hip-Hop", userRating: 5 },
  { id: 6, title: "Thunderstruck", artist: "AC/DC", genre: "Rock", userRating: 4 },
  { id: 7, title: "Someone Like You", artist: "Adele", genre: "Soul", userRating: 5 },
  { id: 8, title: "Firework", artist: "Katy Perry", genre: "Pop", userRating: 4 },
  { id: 9, title: "Bad Romance", artist: "Lady Gaga", genre: "Pop", userRating: 4 },
  { id: 10, title: "Smells Like Teen Spirit", artist: "Nirvana", genre: "Grunge", userRating: 5 },
  { id: 11, title: "Sweet Child o' Mine", artist: "Guns N' Roses", genre: "Rock", userRating: 5 },
  { id: 12, title: "Roar", artist: "Katy Perry", genre: "Pop", userRating: 4 },
  { id: 13, title: "Hello", artist: "Adele", genre: "Soul", userRating: 4 },
  { id: 14, title: "Wonderwall", artist: "Oasis", genre: "Rock", userRating: 3 },
  { id: 15, title: "Radioactive", artist: "Imagine Dragons", genre: "Alternative", userRating: 4 },
  { id: 16, title: "Bohemian Rhapsody", artist: "Queen", genre: "Rock", userRating: 5 },
  { id: 17, title: "Thriller", artist: "Michael Jackson", genre: "Pop", userRating: 5 },
  { id: 18, title: "Can't Help Falling in Love", artist: "Elvis Presley", genre: "Classic Pop", userRating: 5 },
  { id: 19, title: "Hallelujah", artist: "Leonard Cohen", genre: "Folk", userRating: 4 },
  { id: 20, title: "Rolling in the Deep", artist: "Adele", genre: "Soul", userRating: 5 }
];
const tempPlaylist = [

  { id: 1, title: "The Scientist", artist: "Coldplay", genre: "Emo", userRating: 4 },
  { id: 2, title: "Viva La Vida", artist: "Coldplay", genre: "Alternative", userRating: 5 },
  { id: 3, title: "Believer", artist: "Imagine Dragons", genre: "Rock", userRating: 4 },
  { id: 4, title: "Shape of You", artist: "Ed Sheeran", genre: "Pop", userRating: 3 },
  { id: 5, title: "Lose Yourself", artist: "Eminem", genre: "Hip-Hop", userRating: 5 },
  { id: 6, title: "Thunderstruck", artist: "AC/DC", genre: "Rock", userRating: 4 },


];

function SortOptionsDropdown({ setMusic, music }) {
  function sortMusic(sortType) {
    let sortedMusic = [...music];
    if (sortType === "artist") {
      sortedMusic.sort((a, b) => a.artist.localeCompare(b.artist));
    } else if (sortType === "genre") {
      sortedMusic.sort((a, b) => a.genre.localeCompare(b.genre));
    } else if (sortType === "rating") {
      sortedMusic.sort((a, b) => b.userRating - a.userRating);
    }
    setMusic(sortedMusic);
  }

  return (
    <div>
      <select onChange={(e) => sortMusic(e.target.value)} defaultValue="">
        <option value="" disabled>Sort by...</option>
        <option value="artist">Artist</option>
        <option value="genre">Genre</option>
        <option value="rating">Rating</option>
      </select>
    </div>
  );
}

function App() {
  const [music, setMusic] = useState(tempMusicData);
  const [playlist, setPlaylist] = useState(tempPlaylist);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMusic = music.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Navbar>
        <NumResult music={filteredMusic} />
        <Search query={searchQuery} setQuery={setSearchQuery} />
        <Logo />
      </Navbar>
      <div className="main-layout">
        <Main>
          <Box>
            <h2>Music Library</h2>
            <SortOptionsDropdown setMusic={setMusic} music={music} />
            <Music music={filteredMusic} />
          </Box>
          <Box>
            <h2>Your Playlist</h2>
            <Playlist playlist={playlist} />
          </Box>
        </Main>

      </div>
    </div>
  );
}

export default App;



function Navbar({children}) {
  return (
    <nav className="container">
      <Logo />
      {children}
    </nav>
  );
}

function Logo() {
  return <h1 style={{ textAlign: "center" }}>Music App</h1>;
}

function Search({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search music..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function NumResult({ music }) {
  return (
    <p>
      Found <strong>{music.length}</strong> results
    </p>
  );
}

function Box({title ,children}){
  return(
    <div className="container">
      <h2>{title}</h2>
      {children}</div>
  )
}



function Music({ music, setPlaylist, playlist }) {
  const addToPlaylist = (musicItem) => {
    if (!playlist.find(item => item.id === musicItem.id)) {
      setPlaylist([...playlist, musicItem]);
    }
  };

  return (
    <ul>
      {music.map((musicItem) => (
        <li className="music-item" key={musicItem.id}>
          {musicItem.title} by {musicItem.artist} ({musicItem.genre})
          <button className="heart-button" onClick={() => addToPlaylist(musicItem)}>♥️</button>
        </li>
      ))}
    </ul>
  );
}

function Playlist({ playlist }) {
  return (
    <ul>
      {playlist.map((musicItem) => (
        <li key={musicItem.id}>
          {musicItem.title} by {musicItem.artist}
          <p>
            <span>⭐</span>
            <span>{musicItem.userRating}</span>
          </p>
        </li>
      ))}
    </ul>
  );
}

function Main({ children }) {
  return (
    <div className="container">{children}</div>
    
  );
}

