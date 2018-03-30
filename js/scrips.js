let notes = window.localStorage.getItem('notes') || '{"data": [] } ' ;
//converte a string em um jSON
notes = JSON.parse(notes);

let updateList = function(){
    console.log('[Application] start watch');

    //Criando um observador
    Array.observe(notes.data, function(changes){
        let index = null;
        let value = '';
        let status = null;

        //verifica se add ou removeu
        if(changes[0].type === 'splice'){
            index = changes[0].index;
            value = changes[0].object[index];
            //Obtem o status, se criou ou removeu
            status = (changes[0].addedCount > 0) ? 'created':'removed';
        }

        //verifica se add ou removeu
        if(changes[0].type === 'update'){
            index = changes[0].name;
            value = changes[0].object[index];
            //Obtem o status, se criou ou removeu
            status = 'updated';
        }

        if(!value && status === 'created' && status === 'updated'){
            return;
        }

        let notesTag = document.getElementById('notes');

        if(status === 'created'){
            let newLi = document.createElement('li');

            newLi.innerHTML = value;

            notesTag.appendChild(newLi);
        }

        if(status === 'updated'){
            console.log('IMPLEMENTAR');
        }

        if(status === 'removed'){
            let listOfNotes = document.querySelectorAll('#notes li');

            notesTag.removeChild(listOfNotes[index]);
        }

        //Salva no localStorage
        window.localStorage.setItem('notes', JSON.stringify(notes));

    })
}

let createNote = function(){
    let input = document.querySelector('#form-add-note input[type="text"]');

    let value = input.value;
    
    notes.data.push(value);

    input.value = "";
}

updateList();

/** Add ouvinte de evento padrão */
document.addEventListener('DOMContentLoaded', function(event){

    let listaOfNotes = document.getElementById('notes');
    let listHtml = '';

    for(let i=0; i<notes.data.length; i++){
        listHtml += '<li>'+ notes.data[i] +'</li>';
    }

    listaOfNotes.innerHTML = listHtml;

    let formAddNotes = document.getElementById('form-add-note')

    formAddNotes.addEventListener('submit', function(e){
        /*Para os eventos padrão*/
        e.preventDefault();

        createNote();
    });
});

document.addEventListener('click', function(e){
    let notesTag = document.getElementById('notes');

    //Verificou se clicou em algum item da lista
    if(e.target.parentElement === notesTag){
        if(confirm('Remover esta nota?')){
            //console.log('ok');
            let listOfNotes = document.querySelectorAll('#notes li');
            listOfNotes.forEach(function(item, index){
                if(e.target === item){
                    notes.data.splice(index, 1);
                }
            });
        }
    }
});


if('serviceWorker' in navigator){
    navigator.serviceWorker
    .register('./service-worker.js')
    .then(function(reg){
        console.log('Service Worker Registrado');
    })
    .catch(function(err){
        console.log('Erro=>'+ err);
    })
}