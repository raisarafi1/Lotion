import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";


function App() {


  const [note, setNewNote] = useState([]);
  const [showEditor, setShowEditor] = useState(false);
  const [showDiv, setShowDiv] = useState([]);
  const[items, setItems] = useState([]);




  function handleAddInput() {
    setItems([...items, { title: 'Untitled', datetime: new Date(), content: ''}]);
  }


  function handleTitleChange(index, event) {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], title: event.target.value };
    setItems(newItems);
    localStorage.setItem(`title-${index}`, event.target.value);
  }


  function handleDatetimeChange(index, event) {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], datetime: new Date(event.target.value) };
    setItems(newItems);
  }


  function getLocalDatetime(datetime) {
    const offset = datetime.getTimezoneOffset() * 60000; // offset in milliseconds
    const localTime = new Date(datetime.getTime() - offset);
    return localTime.toISOString().slice(0, 16);
  }


  function handleSaveContent(index) {
    const newItems = [...items];
    const content = localStorage.getItem(`content-${index}`);
    newItems[index] = { ...newItems[index], content };
    setItems(newItems);
    setShowEditor(false);
  }


  function createSidebarNote(index) {
    const newNote = [...note];
    newNote.push(<div class="new-note">Untitled</div>);
    setNewNote(newNote);
  }


  function createEditor() {
    setShowEditor(true);
  }


  function toggleSidebar() {
    var containerDiv = document.getElementById("left-column");
    console.log(containerDiv.classList);
    containerDiv.classList.toggle("invisible");
  }




  return (
    <>
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
                handleAddInput();
                createEditor();
              }}>+</span>
            </div>
            <div>{note}</div>
          </div>
        </div>
       
        <div id="right-column">
          {items.map((item, index) => (
          <div key={index}>
            <div>
            <input
              type="text"
              id="untitled-top"
              value={item.title}
              onChange={(event) => handleTitleChange(index, event)}
            />
            </div>
            <div>
              <input
                type="datetime-local"
                value={getLocalDatetime(item.datetime)}
                onChange={(event) => handleDatetimeChange(index, event)}
              />              
            </div>
            <div class="button-positioning"><button class="save-edit" onClick={() => handleSaveContent(index)}>Save</button></div>
            {item.content && !showEditor ? (
              <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
            ) : null}
          </div>
        ))}




        {showEditor ? (
          <ReactQuill
            className="quill"
            theme="snow"
            id="editor-box"
            defaultValue={showDiv}
            onChange={(value) => {
              setShowDiv(value);
              localStorage.setItem(`content-${items.length - 1}`, value);
            }}
          />
          ) : (
            <div id="create-note-message">Select a note, or create a new one</div>
          )}
        </div>
      </div>
    </>
  );
}




export default App;







