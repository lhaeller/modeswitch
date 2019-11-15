



class Controller{
 
    constructor(){

        this.view = new View();
        this.model = new Model();
        
        this.round = 0;
        //this.lastAnswer = "work"; // for testing
        this.lastAnswer = "";  


        this.initialize();
    }

    initialize(){

        console.log("initialize...")
        
        // let answers = this.handOverQnA();
        //let answers = data.answers; // foreach
        // this.view.showQnA(question, answers);
        this.handOverQnA();
        this.addEventListenerToWebsite();
    }

    handOverQnA(){

        console.log("determineAnswerText....");
        console.log(`lastAnswer: ${this.lastAnswer}`);

        let data = this.model.loadQnA(this.round);
        let question = data.question;

        // return this.model.loadNextAnswer(this.lastAnswer);
        let answers = this.model.loadNextAnswers(this.lastAnswer);

        this.view.showQnA(question, answers);

    }

    addEventListenerToWebsite(){
        document.addEventListener('click', (event) => {
    
            this.interpretEvent(event,'click');
        
        });

    }

    interpretEvent(event, eventDescription){


        if(eventDescription == 'click'){

            let className = event.srcElement.className;
            let id = event.srcElement.id;        

            if(className == 'answer-button'){

                let button = document.getElementById(id);
                let buttonValue = button.value;
                this.lastAnswer = buttonValue;

                // hand over QnA to view
                this.handOverQnA();

            }


        }

    }
    
}

class Model{

    constructor(){
        // TODO: externalize data
        this.QnA = [
            {question:"WHERE ARE YOU?",answers:[{value:"train",text:"on the train"},{value:"buslike",text:"bus / tram"},{value:"home",text:"at home"},{value:"school",text:"at school"},{value:"work",text:"at work"}]},

            {question:"HOW ARE YOU?",answers:[{value:"tired af-burned mind",text:"tired af",alternativetext:"tired"},{value:"awake",text:"wide awake"   ,alternativetext:"chill"},{value:"restless-bored", text:"bored",alternativetext:"restless"}]}
        ];
    }

    loadQnA(round){
        console.log("loadQnA...");
        return this.QnA[round];

    }

    loadNextAnswers(lastAnswer){

        let nextAnswers;

        if(lastAnswer == ""){

            let QnA = this.loadQnA(0);
            nextAnswers = QnA.answers;

        }


        //TODO: add other options
        if(lastAnswer == "work"){

            console.log(`case: ${lastAnswer}`);
            let textModes = ["text","text","text"];
            console.table([textModes]);
            nextAnswers = this.loadStateDescriptions(textModes);
        }

        return nextAnswers;

    }

    loadStateDescriptions(modeOfStates){

        console.log("loadStateDescriptions...");

        let descriptions = [];
        let answerData = this.QnA[1].answers;
        // console.log("answerData:");
        // console.table([answerData]);

        let i = 0;

        modeOfStates.forEach(element => {
            
            if(element == "text"){
                console.log(` value: ${answerData[i].value}, text: ${answerData[i].text}`);
                let answer = {value:answerData[i].value,text:answerData[i].text};
                descriptions.push(answer);
            }

            if(element == "alternative"){
                console.log(` value: ${answerData[i].value}, text: ${answerData[i].alternativetext}`);
                let answer = {value:answerData[i].value,text:answerData[i].alternativetext};
                descriptions.push(answer);
            }

            console.log("descriptions....");
            console.table([descriptions]);

            i++;
        });

        return descriptions;
    }

}

class View{

    constructor(){}

    showQnA(question, answers){

        let html = '';

        html += `<h1>${question}</h1>`;
        
        answers.forEach(answer => {
            html += `<button value='${answer.value}' class='answer-button' id='${answer.value}-answer'>${answer.text}</button>`
        });

        document.getElementById('container').innerHTML = html;
        
    }

}

window.onload = function(){
    var controller = new Controller();
}

