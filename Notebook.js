let notesCount=0;
let allNotes = [];
const counter=document.querySelector("#counter");



function postNotes(event){
    event.preventDefault();

const notesSearch=document.querySelector("#notes-search");
const notesTitle=document.querySelector("#notes-title");
const notesDescription=document.querySelector("#notes-description");


let notes = {
    
    title:notesTitle.value,
    description:notesDescription.value

}

axios.post("https://crudcrud.com/api/fda60e555a134ed6b2368cdaef5d7331/note",notes)
.then(response => {
    console.log("Notes data created:", response.data);
    getNotes();
    notesCount++;
    counter.innerHTML=notesCount;
  })
.catch(error => {
    console.error("Error creating Notes data:", error);

  });

 
 notesSearch.addEventListener('keyup', function (event) {
    const filterText = event.target.value.toLowerCase();
    const filteredNotes = allNotes.filter(note => note.title.toLowerCase().includes(filterText));
    const ul = document.querySelector("ul");
    ul.innerHTML = "";
    filteredNotes.forEach(showNotes);
});
}

window.addEventListener("DOMContentLoaded",()=>{

    getNotes()
  })


  function getNotes(){
    axios.get("https://crudcrud.com/api/fda60e555a134ed6b2368cdaef5d7331/note")
    .then(response => {
      const ul=document.querySelector("ul");
      ul.innerHTML="";
      allNotes = response.data; 
      notesCount = allNotes.length; 
      counter.innerHTML = notesCount;
      console.log("note data created:", allNotes);
      allNotes.forEach(showNotes);
    }
      
      )
    .catch(error => {
        console.error("Error creating note data:", error);
      
      });
    }
  function showNotes(notes)
  {
      const li=`<li class='impnotes'>${notes.title}-${notes.description}
      <button type='button' class='del-btn' onclick="delNote('${notes._id}')">Delete</button></li>`;
      const ul=document.querySelector("ul");
      ul.innerHTML+=li;
  }
  
  
  function delNote(deleteId){
      const ul=document.querySelector("ul");
      console.log("dele",deleteId);
      const li_to_del=event.target.parentElement;
      ul.removeChild(li_to_del); 
      axios.delete(`https://crudcrud.com/api/fda60e555a134ed6b2368cdaef5d7331/note/${deleteId}`)
      .then((response) => {
          console.log("Deleted data :", response.data);
          notesCount--;
          counter.innerHTML=notesCount;
        })
      .catch((error) => {
          console.error("Error creating note data:", error);
        
        });
      }