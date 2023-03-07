import React, { useState } from "react";

function App() {

  const [note, setNewNote] = useState([]);


  function toggleSidebar() {
    var containerDiv = document.getElementById("left-column");
    console.log(containerDiv.classList);
    containerDiv.classList.toggle("invisible");
  }

  function createNewNote() {
    const newNote = [...note];
    newNote.push(<div class="new-note" key={new Date().getTime()}>Untitled</div>);
    setNewNote(newNote);    
  }

  return (
    <>
      <nav>
        <span id="menu-icon" onClick={toggleSidebar}>&#9776;</span>
        <div class="stacked">
          <h1 class="title">
            Lotion
          </h1>
          <div class="subtitle">
            <strong>Like Notion, but worse.</strong>
          </div>
        </div>
      </nav>

      <div id="container" class="invisible">
        <div id="left-column">
          <div>
            <div id="notes">Notes
              <span>
                <button onClick={createNewNote}>+</button>
              </span>
            </div>
            <p>{note}</p>
          </div>
        </div>
        
        <div id="right-column">
          <div id="create-note-message">Select a note, or create a new one</div>
        </div>
      </div>

    </>
  );
  
}

export default App