



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

        console.log("handOverQnA....");
        console.log(`lastAnswer: ${this.lastAnswer}`);

        if(this.round == 0 || this.round == 1){
            let data = this.model.loadNextQnA(this.lastAnswer,this.round);
            let question = data.question;
            let answers = data.answers;
        
            this.view.showQnA(question, answers);
            this.round++; // TODO: check whether to widen scope of this

        }

        console.log(`round: ${this.round}`);

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

            {question:"HOW ARE YOU?",answers:[{value:"tired af-burned mind",text:"tired af",alternativetext:"burned mind"},{value:"awake",text:"wide awake" ,alternativetext:"awake"},{value:"restless-bored", text:"bored",alternativetext:"restless"}]},

        ];

        this.location;
    }

    loadNextQnA(lastAnswer, round){

        let qnaData;

        let nextQuestion = this.QnA[round].question;

        let nextAnswers;

        if(lastAnswer == ""){

            // let QnA = this.loadQnA(0);
            // nextAnswers = QnA.answers;

            nextAnswers = this.QnA[round].answers;

        }

        if(lastAnswer == "work"){
            this.setAsLocation(lastAnswer);
            console.log(`case: ${lastAnswer}`);
            let textModes = ["text","text","text"];
            console.table([textModes]);
            nextAnswers = this.loadStateDescriptions(textModes);
        }

        if(lastAnswer == "home"){
            this.setAsLocation(lastAnswer);
            console.log(`case: ${lastAnswer}`);
            let textModes = ["text","text","alternative"];
            console.table([textModes]);
            nextAnswers = this.loadStateDescriptions(textModes);
        }

        if(lastAnswer == "school"){
            this.setAsLocation(lastAnswer);
            console.log(`case: ${lastAnswer}`);
            let textModes = ["text","text","text"];
            console.table([textModes]);
            nextAnswers = this.loadStateDescriptions(textModes);
        }

        if(lastAnswer == "train"){
            this.setAsLocation(lastAnswer);
            console.log(`case: ${lastAnswer}`);
            let textModes = ["alternative","alternative","text"];
            console.table([textModes]);
            nextAnswers = this.loadStateDescriptions(textModes);
        }

        if(lastAnswer == "buslike"){
            this.setAsLocation(lastAnswer);
            console.log(`case: ${lastAnswer}`);
            let textModes = ["alternative","alternative","text"];
            console.table([textModes]);
            nextAnswers = this.loadStateDescriptions(textModes);
        }
        
        qnaData = {
            question:nextQuestion,
            answers:nextAnswers
        }
        console.log('qnaData:');
        console.table([qnaData]);

        return qnaData;

    }



    setAsLocation(location){
        this.location = location;
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

