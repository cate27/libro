//Recupero degli elementi dalla pagina
const button = document.querySelector('button');
const inputField = document.querySelector('input');
const todoList = document.querySelector('.todo-list');
const emptyListMessage = document.querySelector('.empty-list-message');
const btnDelete = document.querySelector('.delete');

//Creo una chiave per il local storage
const STORAGE_KEY = '__bool_todo__';

//Preparo una lista di attività
let activities = [];

const storage = localStorage.getItem(STORAGE_KEY);

if (storage) {
    activities = JSON.parse(storage);
}

//Chiedo a js cosa mostrare
showContent();

//Reagisco al click del bottone
button.addEventListener('click', function() {
    //Chiedo di aggiungere le attività
    addActivity();
});

btnDelete.addEventListener('click', function () {
    deleteActivity();
})

//Funzione che decide cosa mostrare nella pagina
function showContent() {
    //Pulisco tutto
    todoList.innerText = '';
    emptyListMessage.innerText = '';

    if (activities.length > 0) {
        //Se c'è almeno un'attività...
        //mostra l'attività
        activities.forEach(function (activity) {
            //Creo template HTML
            const template = createActivityTemplate(activity)

            //Inseriscilo nella pagina
            todoList.innerHTML += template;
        });
        //rendi cliccabili i check
        makeCheckClickable();
    } else {
        //ALTRIMENTI
        //mostra il messaggio della lista vuota
        emptyListMessage.innerText = 'Sembra che non sia stato inserito nessun libro';
    }
}

// Funzione per rendere i check cliccabili
function makeCheckClickable() {
    // Cerca tutti i check e fa' sì che siano cliccabili
    const checks = document.querySelectorAll('.todo-check');
    // Per ognuno dei check...
    // Per ognuno dei check
    checks.forEach(function (check, index) {
    // Aggiungi una reazione al click
    check.addEventListener('click', function () {
         // Mostrare una finestra di conferma
         const confirms = window.confirm('Vuoi rimuovere questa attività?');

         if (confirms) {
             // Rimuovi elemento dalla lista 
             activities.splice(index, 1);
             // Aggiorna storage
             localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
             // Aggiorna la lista in pagina
             showContent();
            }
        });
    });
}

// Funzione per aggiungere un'attività
function addActivity() {
    // Recupero il testo nel campo
    const newActivity = inputField.value.trim();
  
    // Se il campo non è vuoto... 
    if (newActivity.length > 0) {
  
      // Aggiungo l'attività alla lista
      activities.push(newActivity);
  
      // Aggiorna lo storage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
  
      // Ora, ridecidi cosa mostrare
      showContent();
  
      // svuoto il campo
      inputField.value = '';
    }
  }

//Funzione che crea un template HTML per un'attività
function createActivityTemplate(activity) {
    // Restituisci questo pezzo di HTML
    return `
     <li class="todo-item">
       <div class="todo-check">
         <img src="img/check.svg" alt="Check Icon">
       </div>
       <p class="todo-text">${activity}</p>
     </li>
     `;
}

//Eliminazione del localStorage
function deleteActivity() {
    if (activities.length > 0) {
        if (confirm("Vuoi cancellare tutte le attività?") == true) {
            localStorage.clear(STORAGE_KEY, JSON.stringify(activities))
            activities = []
            showContent()
        }
    } else {
        alert("Non ci sono attività da cancellare")
    }
}