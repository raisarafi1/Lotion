import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";




function App() {


  const [note, setNewNote] = useState([]);
  const [showEditor, setShowEditor] = useState(false);
  const [showDiv, setShowDiv] = useState([]);
  const[title, setTitle] = useState("Untitled");
  const[content, setContent] = useState("");


  function createSidebarNote() {
    const newNote = [...note];
    newNote.push(<div class="new-note">Untitled</div>);
    setNewNote(newNote);
  }
 
  function createDiv() {
    const newDiv = [showDiv];
    newDiv.push(<div><input type="text" value={title} onChange={handleTitleChange}></input></div>)
    newDiv.push(<input type="datetime-local"/>)
    newDiv.push(<button onClick={handleSave}>Save</button>)
    newDiv.push(<button>Edit</button>)
    setShowDiv(newDiv);
  }


  function createEditor() {
    setShowEditor(true);
  }


  function handleNoteChange(event) {
    setShowDiv(event.target.value);
  }


  function toggleSidebar() {
    var containerDiv = document.getElementById("left-column");
    console.log(containerDiv.classList);
    containerDiv.classList.toggle("invisible");
  }


  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (value) => {
    setContent(value);
  }


  const handleSave = () => {
    // Save the note to localStorage
    const note = { title, content };
    localStorage.setItem(Date.now(), JSON.stringify(note));
  };




  <>
  </>


  return (
    <>
    {/* <BrowserRouter>
      <Routes>
        <Route path="/" element={<About />}></Route>
        <Route path="/skills" element={<Skills />}></Route>
      </Routes>
    </BrowserRouter> */}
      <nav>
        <div class="title">
          Lotion
        </div>
        <div class="subtitle">
          Like Notion, but worse.
        </div>
        <span id="menu-icon" onClick={toggleSidebar}>&#9776;</span>
      </nav>




      <div id="container" class="invisible">
        <div id="left-column">
          <div>
            <div class="notes-plus">
              <span id="notes">Notes</span>
              <span id="plus-icon" onClick={() => {
                createSidebarNote();
                createDiv();
                createEditor();
              }}>+</span>
            </div>
            <p>{note}</p>
          </div>
        </div>
       
        <div id="right-column">
          <div>{showDiv}</div>
          {/* <input type="text" value={title} onChange={handleTitleChange} /> */}
          {/* <div id="untitled-top">{showDiv}</div> */}
          {showEditor ? (
            <>
              <ReactQuill
                className="quill"
                theme="snow"
                onChange={handleNoteChange}
              />
            </>
          ) : (
            <div id="create-note-message">Select a note, or create a new one</div>
          )}
        </div>
      </div>
    </>
  );
}


export default App;