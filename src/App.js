function App() {
  return (
    <nav>
      <span class="icon" onclick="toggleSidebar()">&#9776;</span>
      <div class="stacked">
        <h1 class="title">
          Lotion
        </h1>
        <div class="subtitle">
          <strong>Like Notion, but worse.</strong>
        </div>
      </div>
    </nav>
  );

  // function toggleSidebar() {
  //   var containerDiv = document.getElementById("right-column");
  //   console.log(containerDiv.classList);
  //   containerDiv.classList.toggle("invisible");
  // }
}

export default App;
