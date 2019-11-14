/**
 * 
 * MVC Setup:
 * 
 * Models contain or represent the data that users work with. These can be simple view models, 
 * which just represent data being transferred between views and controllers;
 * or they can be domain models, which contain the data in a business domain as well as the operations,
 * transformations, and rules for manipulating that data.
 * 
 * Views are used to render some part of the model as a UI.
 * 
 * Controllers process incoming requests, perform operations on the model, 
 * and select views to render to the user.
 * 
 */

$(document).ready(function () {
	var controller = new Controller();
	
	//buildHTML

});

document.addEventListener('click', (event) => {
    
    controller.interpretEvent(event,'click');

});

class Controller{

    constructor(){
        this.model = new Model();
        this.view = new View();

        this.numberOfQuestionsAsked = 0;

        this.options = model.loadActivities();
    }

    interpretEvent(event,type){

        if(type == "click"){
            let className = event.srcElement.className;
            let id = event.srcElement.id;
            let value = event.srcElement.value;

            this.triggerButtonActions(id,className,value);
        }


    }

    triggerButtonActions(buttonId,buttonClassName,buttonValue){
    // TODO: rename this method 

        // trigger matching method like updateOptions, getQuestions etc.
        if(buttonClassName == 'answer'){
            this.updateOptions(buttonValue);

            let actionData = getQuestions();
            if(actionData == undefined){
                // showActivities
            }else{
                // TODO: 'actionData' prepared for a generic 'buildHTML' method (so that 'buildHTML' doesn't need to know the data structure)
                this.view.buildHTML('questionAndAnswers',actionData);
            }
        }

        if(buttonClassName == 'activity'){
        // showLinkedCards
            let activities = this.getActivities();
            let targetActivity;

            for(let i = 0; i < activities.length; i++){
                if(buttonValue == activities[i].uniqueName){
                    targetActivity = activities[i];
                    continue;
                }
            }

            let namesOfLinkedCards = targetActivity.nameLinkedCards;

            let actionData = [];
            for(let i = 0; i < namesOfLinkedCards.length; i++){
                actionData.push( this.getLinkedData(namesOfLinkedCards[i]) );
            }    
            // TODO: 'actionData' prepared for a generic 'buildHTML' method (so that 'buildHTML' doesn't need to know the data structure)

        }
        
    }

    increaseNumberOfQuestions(){
        this.numberOfQuestionsAsked++;
    }

    updateOptions(tag){

        this.model.filterOptions(tag);
    }

    getQuestions(){
        let index = this.numberOfQuestionsAsked;

        let questionAndAnswers = this.model.loadQuestions(index);

        if(questionAndAnswers == undefined){
            // 
            return undefined;
        }

        if(questionAndAnswers != undefined){
            // build HTML with this question and it's answers
        }

       

        // view.buildHTML
        // view.updateView

        this.increaseNumberOfQuestions();
    }

    getActivities(){

        // model.loadActivities();
        // view.buildHTML
        // view.updateView

    }

    getLinkedData(uniqueName){

        // model.loadLinkedCards();
        // return data

    }
}

class View{

    constructor(){}

    buildHTML(type, data){
    // TODO: add more parameters to this method so that 'data' is split up into more view-specific variables
        // data [title, subtitle, link, value]
        let html = '';


        for(let i = 0; i < data.length; i++){
            
            let maintext, subtext, link = "";

            if(type == 'linkedCards'){
                maintext = data.description;
                subtext = data.domain;
                link = data.link;
                value = '';
            }

            if(type == 'questionAndAnswers'){
                // fill in
            }
            
            if(type == 'activity'){
                // fill in
            }

            html += this.buildHTMLForOneButton(type, maintext, subtext, link, value);
        }
    }

    buildHTMLForOneButton(type, maintext, subtext, link, value){

        // maintext, subtext, link
            // linkedcards: subtext=domain, maintext=description, link as <a>

        let html = '';

        if(type == 'linkedCards'){
            html += `<a href="${link}">`;
            html += `<button class="" value="${value}">${maintext}<br><i><span class="subtext">${subtext}</span></i></button></a>`;
        }else{
            html += `<button class="" value="${value}">${maintext}<br><i><span class="subtext">${subtext}</span></i></button>`;
        }


        return html;




    }
    

    updateView(newHTML){

    }
}

class Model{

    constructor(){

        this.options = this.loadActivities();

    }

    loadActivities(){

        // TODO: fill up with real data
        // TODO: export this to .json file

        let activities = [
            {"maintext": "program with music","tags": ["awake","work"],"subtext":"","nameLinkedCards":["SpotifyElectroVaporwave","SpotifyElectroSynthwave"],"uniqueName":"programwithmusic"}
            
        ];

        return activities;
    }

    loadLinkedCards(){

        // TODO: fill up with real data
        // TODO: export this to .json file
		let linkedCards = [
            {"uniqueName":"SpotifyElectroVaporwave", "domain":"Spotify", "description":"Electro - Vaporwave","link":"https://open.spotify.com/playlist/2nWMkr2HwC6nfSBkN8Dg9Z"},
            {"uniqueName":"SpotifyElectroSynthwave", "domain":"Spotify", "description":"Electro - Synthwave","link":"https://open.spotify.com/playlist/5brFbLsjwb1hfSEXAIoNUZ"},
            {"uniqueName":"SpotifyFalloutNewVegas", "domain":"Spotify", "description":"Fallout New Vegas - The Unofficial Soundtrack","link":"https://open.spotify.com/album/2xBl7O1jFtgvpTjGmaCWrl"},
            {"uniqueName":"Redditcom", "domain":"Reddit", "description":"The Front Page of the Internet","link":"https://www.reddit.com/"},
            {"uniqueName":"Imgurcom", "domain":"Imgur", "description":"The magic of the Internet","link":"https://imgur.com/"}
        ];  
        
        return linkedCards;
    }

    loadQuestions(index){

        let questionAndAnswers = [
			{"question":"HOW ARE YOU?","answers":[{"value":"tired","text":"tired af"},{"value":"awake","text":"wide awake"},{"value":"bored", "text":"bored"}]},
			{"question":"WHERE ARE YOU?","answers":[{"value":"train","text":"on the train"},{"value":"buslike","text":"bus / tram"},{"value":"home","text":"at home"},{"value":"school","text":"at school"},{"value":"work","text":"at work"}]}
        ];

        if(index < questionAndAnswers.length){
            return questionAndAnswers[index];
        }else{
            return undefined;
        }

    }

    filterOptions(tag){

        let filteredOptions = [];

        // do filtering based on tag

        this.options = filteredOptions;
    }


}