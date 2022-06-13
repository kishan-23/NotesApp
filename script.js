console.log("Hello world! This is notes taking app, and javscript file is loaded properly.");

displayAllNotes();

//add event listener to add Notes class
function addNoteListener(e){
    
    //get previous notes from local storage
    let notes = localStorage.getItem('notes');

    //parse to get array
    let notesObj;
    if(notes == null) notesObj = [];
    else notesObj = JSON.parse(notes);

    let currNote = {
        'title' : document.getElementById('titleInput').value,
        'content' : document.getElementById('notesTextarea').value
    }

    //reset the input fields
    document.getElementById('titleInput').value = "";
    document.getElementById('notesTextarea').value = "";

    //push curr note to array
    notesObj.push(currNote);

    //update in localstorage
    localStorage.setItem('notes',JSON.stringify(notesObj));

    //display the current note
    displayNote(currNote,notesObj.length-1);
}

//display all notes on the card
function displayAllNotes(){
    document.getElementById('notesPanel').innerHTML = '';
    let notes = localStorage.getItem('notes');
    let notesObj;
    if(notes == null) notesObj = [];
    else notesObj = JSON.parse(notes);
    let i = 0;
    notesObj.forEach(element => {
        displayNote(element,i++);
    });
}

//display notes with search query
function displaySearchNotes(query){
    
    if(query.length==0){
        displayAllNotes();
        return;
    }
    document.getElementById('notesPanel').innerHTML = '';
    let notes = localStorage.getItem('notes');
    let notesObj;
    if(notes == null) notesObj = [];
    else notesObj = JSON.parse(notes);
    let i = 0;
    let noresult = true;
    notesObj.forEach(element => {
        
        if(element.title.includes(query) || element.content.includes(query)){
            displayNote(element,i++);
            noresult = false;
        }
    });

    if(noresult) alert("No reults were found for the given search query.");
}

//function to display one node
function displayNote(note,index){
    let noteCard = document.createElement('div');
    let nid = 'removeNoteBtn'+index;
    noteCard.className = 'col-sm-6';
    noteCard.innerHTML = `<div class="card m-1">
                            <div class="card-body">
                                <h5 class="card-title">${note.title}</h5>
                                <p class="card-text">${note.content}</p>
                                <button class="btn btn-danger" id="${nid}" onClick="removeNote(${index})">Remove</button>
                            </div>
                        </div>`;
    document.getElementById('notesPanel').appendChild(noteCard);
}

//function to remove a note
function removeNote(index){
    
    let notes = localStorage.getItem('notes');
    let notesObj;
    if(notes == null) notesObj = [];
    else notesObj = JSON.parse(notes);
    notesObj.splice(index,1);
    localStorage.setItem('notes',JSON.stringify(notesObj));
    displayAllNotes();
}

//search listener
function searchListener(){
    let query = document.getElementById('searchBox').value;
    displaySearchNotes(query);
}