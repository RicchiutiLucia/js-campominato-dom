/*Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. 
htmlAttenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
In seguito l’utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. 
Altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba. */

const containerDom = document.querySelector('.container');

const playDom = document.getElementById('play');

const titleDom = document.getElementById('title');
const selectedDom = document.getElementById('difficult');
let pointCounterDom = document.getElementById('point-counter');


let playerScoreDom = 0;
let numberInteraction;
let classSquare;
let gridGeneral;
let fullGrid;
let bombeArray=[];
let bombeCounter = 16;
let allBombe;


playDom.addEventListener('click', function(){
    titleDom.classList.add('d-none');

        containerDom.innerHTML="";
        bombeArray=[];

        fullGrid = createFullGrid();

        allBombe = bombeGenerator(numberInteraction,bombeCounter);
        //console.log(`Elenco delle bombe: ${bombeArray}`);     
}
);


//funzione per creare un nuovo quadrato
function createNewSquare(){
    const currentElement = document.createElement('div');
    currentElement.classList.add('square');
    return currentElement;
}

function createFullGrid(){
    if(selectedDom.value == "easy"){
        numberInteraction=100;
        classSquare="square-1";
    
    }else if(selectedDom.value == "medium"){
        numberInteraction=81;
        classSquare="square-2";
    
        
    }else if(selectedDom.value == "hard"){
        numberInteraction=49;
        classSquare="square-3";
    }

    gridGeneral = general(numberInteraction,classSquare);
    
}

function general(numberInteraction,classSquare){
    for( let i = 1; i <= numberInteraction; i++){

        const currentSquare = createNewSquare();
    
        currentSquare.classList.add(classSquare);
    
        currentSquare.append(i);
    
        currentSquare.addEventListener('click', function() {

            if(bombeArray.includes(i)){
                this.classList.add('bg-color-bombe');
                pointCounterDom.innerHTML=`Hai colpito una bomba!! La parita è conclusa con un punteggio di ${playerScoreDom} punti!`;

            }else{
                this.classList.add('bg-color');
                playerScoreDom++;

                if(playerScoreDom == (numberInteraction - bombeCounter)){
                    pointCounterDom.innerHTML=`Complimenti! Hai vinto selezionando tutte le caselle evitando le bombe!! ${playerScoreDom} punti!`;
                }else{
                    pointCounterDom.innerHTML=`Il tuo Punteggio è: ${playerScoreDom}`;
                }
            
            }

            console.log(`Hai scelto la casella: ${i}`)
        })
        containerDom.append(currentSquare);
    }
}
//funzione genera bombe
function bombeGenerator(max , bombeCounter){

    for(let i = 1; i <= bombeCounter; i++ ){

        let bombe = Math.floor(Math.random() * max) + 1;
        if(bombeArray[i] != bombe){
            bombeArray.push(bombe);
        }
    }
}
