



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
        console.log(`%c round: ${this.round}`,"color:red;");

        if(this.round == 0 || this.round == 1){
            let data = this.model.loadNextQnA(this.lastAnswer,this.round);
            let question = data.question;
            let answers = data.answers;
        
            this.view.showQnA(question, answers);

        }

        if(this.round == 2){
            let data = this.model.loadActivityOptions(this.lastAnswer);
            this.view.showOptions(data);
        }
        
        this.round++;

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

            {question:"HOW ARE YOU?",answers:[{value:"tired",text:"tired af",alternativetext:"burned mind"},{value:"awake",text:"wide awake" ,alternativetext:"awake"},{value:"restless", text:"bored",alternativetext:"restless"}]},

        ];

        this.activities = [
            // TODO: create an object for each location-state setup
            // TODO: fill in options
            {location:"work",state:"tired",options:[
                {maintext:"internet culture",subtext:"imgur",nameLinkedCards:["imgur"]},
                {maintext:"go for a walk",subtext:"",nameLinkedCards:[]},
                {maintext:"socialize",subtext:"",nameLinkedCards:[]}
            ]},
            {location:"work",state:"awake",options:[
                {maintext:"program with music",subtext:"",nameLinkedCards:["outrun","best for studies selection","lofi","synthwave"]},
                {maintext:"brainstorm problems",subtext:"programs, emails, tasks",nameLinkedCards:[]}
            ]},
            {location:"work",state:"restless",options:[
                {maintext:"program with music",subtext:"",nameLinkedCards:["outrun","best for studies selection","lofi","synthwave"]},
                {maintext:"brainstorm problems",subtext:"programs, emails, tasks",nameLinkedCards:[]}
            ]},
            {location:"home",state:"tired",options:[
                {maintext:"play the guitar",subtext:"",nameLinkedCards:[]},
                {maintext:"pkm with music",subtext:"in-game",nameLinkedCards:["lofi","rock"]},
                {maintext:"play fast game",subtext:"apex, mirror's edge",nameLinkedCards:[]},
                {maintext:"watch stored videos",subtext:"youtube, series, movies",nameLinkedCards:[]}
            ]},
            {location:"home",state:"awake",options:[
                {maintext:"program with music",subtext:"",nameLinkedCards:["outrun","best for studies selection","lofi","synthwave"]},
                {maintext:"learn",subtext:"read, load anki, test anki, recap",nameLinkedCards:["best for studies selection"]},
                {maintext:"read intense book",subtext:"",nameLinkedCards:[]}
            ]},
            {location:"home",state:"restless",options:[
                {maintext:"enter reality",subtext:"flex, work out, meditation",nameLinkedCards:[]},
                {maintext:"enter story",subtext:"destiny - strike, dark souls, bloodborne; manga, graphic novel",nameLinkedCards:[]},
                {maintext:"watch stored videos",subtext:"youtube, series, movies",nameLinkedCards:[]}
            ]},
            {location:"school",state:"tired",options:[
                {maintext:"audionap",subtext:"",nameLinkedCards:["ambiente ani-game","chill podcasts","metal","long songs","vaporwave"]},
                {maintext:"socialize",subtext:"",nameLinkedCards:[]},
                {maintext:"internet culture",subtext:"imgur",nameLinkedCards:["imgur"]}
            ]},
            {location:"school",state:"awake",options:[
                {maintext:"learn",subtext:"read, load anki, test anki, recap",nameLinkedCards:["best for studies selection"]},
                {maintext:"homework",subtext:"",nameLinkedCards:[]},
                {maintext:"assignements",subtext:"",nameLinkedCards:[]}
            ]},
            {location:"school",state:"restless",options:[
                {maintext:"internet culture",subtext:"reddit",nameLinkedCards:["reddit"]},
                {maintext:"program with music",subtext:"",nameLinkedCards:["outrun","best for studies selection","lofi","synthwave"]},
                {maintext:"learn",subtext:"read, load anki, test anki, recap",nameLinkedCards:["best for studies selection"]}
            ]},
            {location:"train",state:"tired",options:[
                {maintext:"audionap",subtext:"",nameLinkedCards:["ambiente ani-game","chill podcasts","metal","long songs","vaporwave"]},
                {maintext:"pkm with music",subtext:"in-game",nameLinkedCards:["lofi","rock"]},
                {maintext:"daydream and music",subtext:"",nameLinkedCards:["ambiente ani-game"]}
            ]},
            {location:"train",state:"awake",options:[
                {maintext:"program with music",subtext:"",nameLinkedCards:["outrun","best for studies selection","lofi","synthwave"]},
                {maintext:"assignements",subtext:"",nameLinkedCards:[]},
                {maintext:"learn",subtext:"read, load anki, test anki, recap",nameLinkedCards:["best for studies selection"]}
            ]},
            {location:"train",state:"restless",options:[
                {maintext:"internet culture",subtext:"reddit",nameLinkedCards:["reddit"]},
                {maintext:"informative podcast",subtext:"",nameLinkedCards:[]},
                {maintext:"learn",subtext:"read, load anki, test anki, recap",nameLinkedCards:["best for studies selection"]}
            ]},
            {location:"buslike",state:"tired",options:[
                {maintext:"audionap",subtext:"",nameLinkedCards:["ambiente ani-game","chill podcasts","metal","long songs","vaporwave"]},
                {maintext:"daydream and music",subtext:"",nameLinkedCards:["ambiente ani-game"]}
            ]},
            {location:"buslike",state:"awake",options:[
                {maintext:"brainstorm problems",subtext:"programs, emails, tasks",nameLinkedCards:[]}
            ]},
            {location:"buslike",state:"restless",options:[
                {maintext:"internet culture",subtext:"reddit",nameLinkedCards:["reddit"]},
                {maintext:"informative podcast",subtext:"",nameLinkedCards:[]},
                {maintext:"learn",subtext:"read, load anki, test anki",nameLinkedCards:["best for studies selection"]}
            ]}
        ];

        this.locationOfUser;
        this.stateOfUser;
        this.optionsForUser;
    }

    loadNextQnA(lastAnswer, round){

        let qnaData;

        let nextQuestion = this.QnA[round].question;

        let nextAnswers;
        let textModes;

        switch(lastAnswer){

            case "work":
                this.setAsLocation(lastAnswer);
                console.log(`case: ${lastAnswer}`);
                textModes = ["text","text","text"];
                console.table([textModes]);
                nextAnswers = this.loadStateDescriptions(textModes);
                break;
            

            case "home":
                this.setAsLocation(lastAnswer);
                console.log(`case: ${lastAnswer}`);
                textModes = ["text","text","alternative"];
                console.table([textModes]);
                nextAnswers = this.loadStateDescriptions(textModes);
                break;

            case "school":
                this.setAsLocation(lastAnswer);
                console.log(`case: ${lastAnswer}`);
                textModes = ["text","text","text"];
                console.table([textModes]);
                nextAnswers = this.loadStateDescriptions(textModes);
                break;
            

            case "train":
                this.setAsLocation(lastAnswer);
                console.log(`case: ${lastAnswer}`);
                textModes = ["alternative","alternative","text"];
                console.table([textModes]);
                nextAnswers = this.loadStateDescriptions(textModes);
                break;

            case "buslike":
                this.setAsLocation(lastAnswer);
                console.log(`case: ${lastAnswer}`);
                textModes = ["alternative","alternative","text"];
                console.table([textModes]);
                nextAnswers = this.loadStateDescriptions(textModes);
                break;
            
            default:
                nextAnswers = this.QnA[round].answers;
                break;

        }
        
        qnaData = {
            question:nextQuestion,
            answers:nextAnswers
        }
        console.log('qnaData:');
        console.table([qnaData]);

        return qnaData;

    }

    loadActivityOptions(state){

        this.stateOfUser = state;

        let selection = `${this.locationOfUser}-${this.stateOfUser}`;
        let activityOptions = this.loadActivities();
        let matchingActivities = activityOptions.get(selection);
        console.log(`these are the matching activities for the selection "${selection}"`);
        console.table([matchingActivities]);

        this.optionsForUser = matchingActivities;

        return matchingActivities;
    }

    loadActivities(){

        // {location:"buslike",state:"restless",options:[
        //     {maintext:"internet culture",subtext:"reddit",nameLinkedCards:["reddit"]},
        //     {maintext:"informative podcast",subtext:"",nameLinkedCards:[]},
        //     {maintext:"learn",subtext:"read, load anki, test anki",nameLinkedCards:["best for studies selection"]}
        // ]}

        let combinations = new Map();

        this.activities.forEach(element => {
            let combo = `${element.location}-${element.state}`;
            console.log(`loading combo: ${combo}`);
            combinations.set(combo,element.options);
            console.log('setting these activity options...');
            console.table([element.options]);
            console.log("...........................");
            console.log("");
        });

        return combinations;
    }


    setAsLocation(location){
        console.log(`%c setting this location:${location}`,'color:green');
        this.locationOfUser = location;
    }

    loadStateDescriptions(modeOfStates){

        console.log("loadStateDescriptions...");

        let descriptions = [];
        let answerData = this.QnA[1].answers;

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

    showOptions(options){

        let html = '';
        let placeholder = 0;
        html += `<h1>Do One</h1>`;


        options.forEach(option => {

            html += `<button value='${option.nameLinkedCards}' class='option' id='option-${placeholder}'>${option.maintext}
            <br><i><span class="subtext">${option.subtext}</span></i>
            </button>`;
            placeholder++;
        });

        document.getElementById('container').innerHTML = html;
        
    }


}

window.onload = function(){
    var controller = new Controller();
}

