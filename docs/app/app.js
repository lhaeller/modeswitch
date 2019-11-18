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

            if(className == 'option'){

                let button = document.getElementById(id);
                let optionValue = button.value;

                // TODO: split by , 
                let namesOfSelectedLinkedCards = optionValue.split(",");

                console.table([namesOfSelectedLinkedCards]);

                // TODO: load via model
                let linkedCards = this.model.loadLinkedCardsOptions(namesOfSelectedLinkedCards);

                // TODO: make view load linkedCards
                this.view.showLinkedCards(linkedCards);
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
            {location:"work",state:"tired",options:[
                {maintext:"internet culture",subtext:"imgur",nameLinkedCards:["Imgur"]},
                {maintext:"go for a walk",subtext:"",nameLinkedCards:[]},
                {maintext:"socialize",subtext:"",nameLinkedCards:[]}
            ]},
            {location:"work",state:"awake",options:[
                {maintext:"program with music",subtext:"",nameLinkedCards:["SpotifyElectroOutrun","YouTubeStudyMusic","SpotifyHipHopLofi","SpotifyElectroSynthwave"]},
                {maintext:"brainstorm problems",subtext:"programs, emails, tasks",nameLinkedCards:["Swing,JazzPop,JazzSwing"]},
                {maintext:"learn sth",subtext:"",nameLinkedCards:["ImgurLifeHackFreeCourses","YouTubeStudyMusic"]}
            ]},
            {location:"work",state:"restless",options:[
                {maintext:"program with music",subtext:"",nameLinkedCards:["YouTubeHypercode","SpotifyElectroOutrun","YouTubeStudyMusic","SpotifyHipHopLofi","SpotifyElectroSynthwave","SpotifyOSTFight"]},
                {maintext:"brainstorm problems",subtext:"programs, emails, tasks",nameLinkedCards:["SpotifyRockSwing,SpotifyJazzSwing,SpotifyJazzPop"]},
                {maintext:"learn sth",subtext:"",nameLinkedCards:["ImgurLifeHackFreeCourses","YouTubeStudyMusic"]}
            ]},
            {location:"home",state:"tired",options:[
                {maintext:"audionap",subtext:"",nameLinkedCards:["YouTubeDeepsleep","ListChillPodcasts","SpotifyMetalMetal","SpotifyElectroVaporwave","SpotifyPopPop"]},
                {maintext:"pkm with music",subtext:"in-game",nameLinkedCards:["SpotifyHipHopLofi","SpotifyRockRock"]},
                {maintext:"play fast game",subtext:"apex, mirror's edge",nameLinkedCards:["ListFastGames"]},
                {maintext:"watch stored videos",subtext:"youtube, series, movies",nameLinkedCards:["YouTubeWatchLaterList"]}
            ]},
            {location:"home",state:"awake",options:[
                {maintext:"program with music",subtext:"",nameLinkedCards:["SpotifyElectroOutrun","YouTubeStudyMusic","SpotifyHipHopLofi","SpotifyElectroSynthwave"]},
                {maintext:"learn",subtext:"read, load anki, test anki, recap",nameLinkedCards:["YouTubeStudyMusic"]},
                {maintext:"read intense book",subtext:"",nameLinkedCards:[]}
            ]},
            {location:"home",state:"restless",options:[
                {maintext:"meditate",subtext:"flex, work out, meditation",nameLinkedCards:["YouTubeDeepsleep"]},
                {maintext:"program with music",subtext:"",nameLinkedCards:["YouTubeHypercode","SpotifyElectroOutrun","YouTubeStudyMusic","SpotifyHipHopLofi","SpotifyElectroSynthwave","SpotifyOSTFight"]},
                {maintext:"enter story",subtext:"destiny - strike, dark souls, bloodborne; manga, graphic novel",nameLinkedCards:["ListStoryGames"]},
                {maintext:"watch stored videos",subtext:"youtube, series, movies",nameLinkedCards:["YouTubeWatchLaterList"]}
            ]},
            {location:"school",state:"tired",options:[
                {maintext:"audionap",subtext:"",nameLinkedCards:["YouTubeDeepsleep","ListChillPodcasts","SpotifyMetalMetal","SpotifyElectroVaporwave","SpotifyPopPop"]},
                {maintext:"socialize",subtext:"",nameLinkedCards:[]},
                {maintext:"internet culture",subtext:"imgur",nameLinkedCards:["Imgur"]}
            ]},
            {location:"school",state:"awake",options:[
                {maintext:"learn",subtext:"read, load anki, test anki, recap",nameLinkedCards:["YouTubeStudyMusic"]},
                {maintext:"homework",subtext:"",nameLinkedCards:[]},
                {maintext:"assignements",subtext:"",nameLinkedCards:[]}
            ]},
            {location:"school",state:"restless",options:[
                {maintext:"internet culture",subtext:"reddit",nameLinkedCards:["Reddit"]},
                {maintext:"program with music",subtext:"",nameLinkedCards:["YouTubeHypercode","SpotifyElectroOutrun","YouTubeStudyMusic","SpotifyHipHopLofi","SpotifyElectroSynthwave","SpotifyOSTFight"]},
                {maintext:"learn",subtext:"read, load anki, test anki, recap",nameLinkedCards:["YouTubeStudyMusic"]}
            ]},
            {location:"train",state:"tired",options:[
                {maintext:"audionap",subtext:"",nameLinkedCards:["YouTubeDeepsleep","ListChillPodcasts","SpotifyMetalMetal","SpotifyElectroVaporwave","SpotifyPopPop"]},
                {maintext:"pkm with music",subtext:"in-game",nameLinkedCards:["SpotifyHipHopLofi","SpotifyRockRock"]},
                {maintext:"daydream and music",subtext:"",nameLinkedCards:["YouTubeAniGameOST"]}
            ]},
            {location:"train",state:"awake",options:[
                {maintext:"program with music",subtext:"",nameLinkedCards:["SpotifyElectroOutrun","YouTubeStudyMusic","SpotifyHipHopLofi","SpotifyElectroSynthwave"]},
                {maintext:"assignements",subtext:"",nameLinkedCards:[]},
                {maintext:"learn",subtext:"read, load anki, test anki, recap",nameLinkedCards:["YouTubeStudyMusic"]}
            ]},
            {location:"train",state:"restless",options:[
                {maintext:"program with music",subtext:"",nameLinkedCards:["YouTubeHypercode","SpotifyElectroOutrun","YouTubeStudyMusic","SpotifyHipHopLofi","SpotifyElectroSynthwave","SpotifyOSTFight"]},
                {maintext:"informative podcast",subtext:"",nameLinkedCards:[]},
                {maintext:"learn",subtext:"read, load anki, test anki, recap",nameLinkedCards:["YouTubeStudyMusic"]}
            ]},
            {location:"buslike",state:"tired",options:[
                {maintext:"audionap",subtext:"",nameLinkedCards:["YouTubeAniGameOST","ListChillPodcasts","SpotifyMetalMetal","SpotifyElectroVaporwave","SpotifyPopPop"]},
                {maintext:"daydream and music",subtext:"",nameLinkedCards:["YouTubeAniGameOST"]}
            ]},
            {location:"buslike",state:"awake",options:[
                {maintext:"brainstorm problems",subtext:"programs, emails, tasks",nameLinkedCards:["SpotifyRockSwing,SpotifyJazzPop,SpotifyJazzSwing"]},
                {maintext:"learn",subtext:"anki",nameLinkedCards:["YouTubeStudyMusic"]}
            ]},
            {location:"buslike",state:"restless",options:[
                {maintext:"internet culture",subtext:"reddit",nameLinkedCards:["Reddit"]},
                {maintext:"informative podcast",subtext:"",nameLinkedCards:[]},
                {maintext:"learn",subtext:"read, load anki, test anki",nameLinkedCards:["YouTubeStudyMusic"]}
            ]}
        ];

        this.linkedCards = [
            {uniqueName:"SpotifyElectroVaporwave", domain:"Spotify", description:"Vaporwave",link:"https://open.spotify.com/playlist/2nWMkr2HwC6nfSBkN8Dg9Z"},
			{uniqueName:"SpotifyElectroSynthwave", domain:"Spotify", description:"Synthwave",link:"https://open.spotify.com/playlist/5brFbLsjwb1hfSEXAIoNUZ"},
			{uniqueName:"SpotifyOSTFight", domain:"Spotify", description:"Fight OST",link:"https://open.spotify.com/playlist/0wyrTc3kR0dDe12ug5TUBU"},
			{uniqueName:"SpotifyElectroOutrun", domain:"Spotify", description:"Outrun",link:"https://open.spotify.com/playlist/4HRTw7yBrKP4c7ot2oEuWZ"},
			{uniqueName:"SpotifyPopPop", domain:"Spotify", description:"Pop",link:"https://open.spotify.com/playlist/5IhmK5DnA7xDOHY2YpeouR"},
			{uniqueName:"SpotifyMixLongSongs", domain:"Spotify", description:"Long Songs",link:"https://open.spotify.com/playlist/2zJSWrA1lHapRl2X4Av09T"},
			{uniqueName:"SpotifyMetalMetal", domain:"Spotify", description:"Metal",link:"https://open.spotify.com/playlist/4erlXcZTwQo7n8i0iTukf7"},
			{uniqueName:"YoutubePlaylistElvenpath", domain:"YouTube", description:"Tales From the Elvenpath",link:"https://www.youtube.com/watch?v=VxIyPIRzLH0&list=PLaKGqsgrt0cJ7WZ8x6BXrMIURK2E1-guH"},
            {uniqueName:"SpotifyAlbumShadowsOfTheDyingSun", domain:"Spotify", description:"Shadows of the Dying Sun",link:"https://open.spotify.com/album/0iYAnDAQLAOXIl5bUAfYG3"},
			{uniqueName:"ListChillPodcasts", domain:"List", description:"Chill Podcasts",link:""}, //TODO: find a good place to host list
			{uniqueName:"SpotifyRockRock", domain:"Spotify", description:"Rock",link:"https://open.spotify.com/playlist/15ikqLYNTtSAfdl2wRrYAO"},
			{uniqueName:"SpotifyAlbumHimalaya", domain:"Spotify", description:"Himalaya",link:"https://open.spotify.com/album/0bBdlVINqpOhw9e8YRVB1J"},
			{uniqueName:"SpotifyRockSwing", domain:"Spotify", description:"Swing",link:"https://open.spotify.com/playlist/4swSBKCt31mrwLyQDi6Nc3"},
			{uniqueName:"SpotifyRockIndie", domain:"Spotify", description:"Indie Rock",link:"https://open.spotify.com/playlist/7eihWPjYz2UOBa3AxjTOC8"},
			{uniqueName:"SpotifyRockPsychodelic", domain:"Spotify", description:"Psychodelic Rock",link:"https://open.spotify.com/playlist/31FFn6pny7aZSATwU32Uw2"},
			{uniqueName:"SpotifyRockPunk", domain:"Spotify", description:"Punk Rock",link:"https://open.spotify.com/playlist/3G1nqjuFQHaCam0SiGVwcf"},
			{uniqueName:"SpotifyJazzPop", domain:"Spotify", description:"50s Pop",link:"https://open.spotify.com/playlist/0TQtgWXQiAKvbi9gLJyffh"},
			{uniqueName:"SpotifyJazzSwing", domain:"Spotify", description:"Jazz",link:"https://open.spotify.com/playlist/4roP0vumuqEyuQDsPID6pK"},
			{uniqueName:"SpotifyHipHopLofi", domain:"Spotify", description:"lo fi",link:"https://open.spotify.com/playlist/6JgKb8W1Y30f6QtfgFLXPm"},
			{uniqueName:"SpotifyOSTAmbiente", domain:"Spotify", description:"Ambiente OST",link:"https://open.spotify.com/playlist/5aprBhYKDG6mAK0ywkas9Y"},
			{uniqueName:"SpotifySTEEEZYASFUCKRelaxLofi", domain:"Spotify", description:"STEEEZYASFUCK",link:"https://open.spotify.com/playlist/28gkj3su0EjS9tD20XTG9T"},
            {uniqueName:"YouTubeWatchLaterList", domain:"YouTube", description:"watch later",link:"https://www.youtube.com/playlist?list=WL"},
            {uniqueName:"YouTubeAniGameOST", domain:"YouTube", description:"AniGame OST",link:"https://www.youtube.com/playlist?list=PLCFIppW1R6TLhV469-1XJd5_VVHuHLRCn"},
			{uniqueName:"YouTubeStudyMusic", domain:"YouTube", description:"Study Music",link:"https://www.youtube.com/playlist?list=PLCFIppW1R6TIR15cz86MvNf5y_1HVRBts"},
			{uniqueName:"Imgur", domain:"self", description:"Imgur",link:"https://imgur.com/"},
			{uniqueName:"Reddit", domain:"self", description:"Reddit",link:"https://www.reddit.com/"},
			{uniqueName:"ListStoryGames", domain:"List", description:"Story Games",link:""}, //TODO: find a good place to host list
			{uniqueName:"ListFastGames", domain:"List", description:"Fast Games",link:""}, //TODO: find a good place to host list
			{uniqueName:"ListInformativePodcasts", domain:"List", description:"Informative Podcasts",link:""}, //TODO: find a good place to host list
			{uniqueName:"YouTubeDeepsleep", domain:"YouTube", description:"deepsleep",link:"https://www.youtube.com/playlist?list=PLCFIppW1R6TJ4mhhrBCP-2dX2x7D8PBMI"},
			{uniqueName:"YouTubeSynthwave", domain:"YouTube", description:"Synthwave",link:"https://www.youtube.com/playlist?list=PLCFIppW1R6TKhOBXx-JvgtRZdjVKzujl0"},
            {uniqueName:"YouTubeHypercode", domain:"YouTube", description:"hypercode",link:"https://www.youtube.com/playlist?list=PLCFIppW1R6TIKmrT3_mX9IQu050W1BkA-"},
			{uniqueName:"YouTubeVydiaLofi", domain:"YouTube", description:"vydia lofi",link:"https://www.youtube.com/playlist?list=PLCFIppW1R6TKtcjFvWvpccJ04dU2-dt6Y"},
			{uniqueName:"ImgurLifeHackFreeCourses", domain:"Imgur", description:"free courses",link:"https://imgur.com/gallery/55Z3S"},
			{uniqueName:"", domain:"", description:"",link:""},
			{uniqueName:"", domain:"", description:"",link:""},
			{uniqueName:"", domain:"", description:"",link:""},
			{uniqueName:"", domain:"", description:"",link:""},
			{uniqueName:"", domain:"", description:"",link:""},
			{uniqueName:"", domain:"", description:"",link:""},
			{uniqueName:"", domain:"", description:"",link:""},
			{uniqueName:"", domain:"", description:"",link:""}

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

    loadLinkedCardsOptions(uniqueNames){

        let selectedLinkedCards = new Map();
        let cards = this.loadLinkedCards();

        uniqueNames.forEach(name => {

            let card = cards.get(name);
            selectedLinkedCards.set(name,card);
            
        });

        return selectedLinkedCards;

    }

    loadLinkedCards(){

        let cards = new Map();

        this.linkedCards.forEach(card => {
            cards.set(card.uniqueName, card);
        });

        return cards;

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
            </button>`;
            placeholder++;
        });

        document.getElementById('container').innerHTML = html;
        
    }

    showLinkedCards(linkedCards){

        let html = '';
        html += `<h1>Choose A Link</h1>`;


        linkedCards.forEach(card => {

            html += `<a class='linked-card' href="${card.link}" id='${card.unqiueName}'><div>${card.description}
            <br><span class="domain-field">${card.domain}</span>
            </div></a>`;
        });

        document.getElementById('container').innerHTML = html;


    }



}

window.onload = function(){
    var controller = new Controller();
}

