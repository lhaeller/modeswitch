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

            {question:"HOW ARE YOU?",answers:[{value:"tired",text:"tired af",alternativetext:"burned mind"},{value:"awake",text:"wide awake" ,alternativetext:"fired up"},{value:"restless", text:"bored",alternativetext:"restless"}, {value:"lonely", text:"lonely",alternativetext:"lonely"}]}

        ];




        this.activities = [

            {location:"work",state:"awake",options:[
                {maintext:"write or code",subtext:"",nameLinkedCards:["SpotifyElectroOutrun","YouTubeStudyMusic","YouTubeVydiaLofi","SpotifyElectroSynthwave","SpotifyElectroVaporwave"]},
                {maintext:"finish tasks",subtext:"",nameLinkedCards:["TrelloTodayBoard","TrelloOrganizedTasksBoard","TrelloJobsBoard"]}
            ]},
            {location:"work",state:"tired",options:[
                {maintext:"flex",subtext:"",nameLinkedCards:["ImgurOfficeFlexing"]},
                {maintext:"connect",subtext:"",nameLinkedCards:[]}
            ]},
            {location:"work",state:"restless",options:[ // = bored
                {maintext:"write or code",subtext:"",nameLinkedCards:["SpotifyElectroOutrun","YouTubeStudyMusic","YouTubeVydiaLofi","SpotifyElectroSynthwave","SpotifyElectroVaporwave"]},
                //{maintext:"flex",subtext:"",nameLinkedCards:["ImgurOfficeFlexing"]},
                {maintext:"learn with course",subtext:"",nameLinkedCards:["LinkFreeCodeCamp","LinkCoursera","LinkGoogleCloudTraining"]}
            ]},
            {location:"work",state:"lonely",options:[
                {maintext:"connect",subtext:"",nameLinkedCards:[]}
            ]},

            /********************************************/

            {location:"home",state:"awake",options:[
                {maintext:"write or code",subtext:"",nameLinkedCards:["SpotifyElectroOutrun","YouTubeStudyMusic","YouTubeVydiaLofi","SpotifyElectroSynthwave","SpotifyElectroVaporwave"]},
                {maintext:"homework",subtext:"",nameLinkedCards:["TrelloStudyBoard","TrelloStudyProjectsBoards"]},
                //{maintext:"flex legs",subtext:"",nameLinkedCards:[""]},
                {maintext:"finish tasks",subtext:"",nameLinkedCards:["TrelloTodayBoard","TrelloMissionBoard","TrelloOrganizedTasksBoard"]}
            ]},
            {location:"home",state:"tired",options:[
                {maintext:"Netflix or YouTube",subtext:"",nameLinkedCards:[""]},
                {maintext:"flex",subtext:"",nameLinkedCards:["ImgurOfficeFlexing"]},
                {maintext:"audionap",subtext:"",nameLinkedCards:["YouTubeDeepsleep","ListChillPodcasts","SpotifyMetalMetal","SpotifyElectroVaporwave"]}
            ]},
            {location:"home",state:"restless",options:[ // = bored
                //{maintext:"write or code",subtext:"",nameLinkedCards:["SpotifyElectroOutrun","YouTubeStudyMusic","YouTubeVydiaLofi","SpotifyElectroSynthwave","SpotifyElectroVaporwave"]},
                {maintext:"sandbox game",subtext:"",nameLinkedCards:["PSNWitcher3","PSNPersona5","PSNNieRAutomata","PSNFallout"]},
                {maintext:"read manga",subtext:"",nameLinkedCards:["LinkMAL"]},
                {maintext:"fast game",subtext:"",nameLinkedCards:["PSNMirrorsEdgeCatalyst","PSNDoom"]},
                //{maintext:"flex legs",subtext:"",nameLinkedCards:[""]},
                //{maintext:"learn with course",subtext:"",nameLinkedCards:["LinkFreeCodeCamp","LinkCoursera","LinkGoogleCloudTraining"]}
            ]},
            {location:"home",state:"lonely",options:[
                {maintext:"coop gaming",subtext:"",nameLinkedCards:["PSNApex","PCVCR"]},
                {maintext:"connect",subtext:"",nameLinkedCards:[]}
            ]},

            /********************************************/

            {location:"school",state:"awake",options:[
                {maintext:"homework",subtext:"",nameLinkedCards:["TrelloStudyBoard","TrelloStudyProjectsBoards"]},
                {maintext:"finish tasks",subtext:"",nameLinkedCards:["TrelloTodayBoard","TrelloMissionBoard","TrelloOrganizedTasksBoard","TrelloJobsBoard"]}
            ]},
            {location:"school",state:"tired",options:[
                {maintext:"flex",subtext:"",nameLinkedCards:["ImgurOfficeFlexing"]},
                {maintext:"audionap",subtext:"",nameLinkedCards:["YouTubeDeepsleep","ListChillPodcasts","SpotifyMetalMetal","SpotifyElectroVaporwave"]}
            ]},
            {location:"school",state:"restless",options:[ // = bored
                {maintext:"flex",subtext:"",nameLinkedCards:["ImgurOfficeFlexing"]},
                {maintext:"read manga",subtext:"",nameLinkedCards:["LinkMAL"]}
            ]},
            {location:"school",state:"lonely",options:[
                {maintext:"connect",subtext:"",nameLinkedCards:[]}
            ]},

            /********************************************/

            {location:"train",state:"awake",options:[
                {maintext:"read weekly book",subtext:"",nameLinkedCards:[]},
                {maintext:"finish tasks",subtext:"",nameLinkedCards:["TrelloTodayBoard","TrelloMissionBoard","TrelloOrganizedTasksBoard"]},
                {maintext:"learn Swedish",subtext:"",nameLinkedCards:["LinkMemrise"]}
            ]},
            {location:"train",state:"tired",options:[
                {maintext:"read weekly book",subtext:"",nameLinkedCards:[]},
                {maintext:"audionap",subtext:"",nameLinkedCards:["YouTubeDeepsleep","ListChillPodcasts","SpotifyMetalMetal","SpotifyElectroVaporwave"]},

            ]},
            {location:"train",state:"restless",options:[ // = bored
                {maintext:"read weekly book",subtext:"",nameLinkedCards:[]},
                {maintext:"learn Swedish",subtext:"",nameLinkedCards:["LinkMemrise"]},
                {maintext:"watch youtube",subtext:"",nameLinkedCards:["YouTubeWatchLaterList"]}
            ]},
            {location:"train",state:"lonely",options:[
                {maintext:"message someone",subtext:"",nameLinkedCards:[""]},
                {maintext:"go online",subtext:"",nameLinkedCards:["Reddit","Imgur","4chan"]}
            ]},

            /********************************************/

            {location:"buslike",state:"awake",options:[
                {maintext:"finish tasks",subtext:"",nameLinkedCards:["TrelloTodayBoard","TrelloOrganizedTasksBoard"]},
                {maintext:"learn Swedish",subtext:"",nameLinkedCards:["LinkMemrise"]}
            ]},
            {location:"buslike",state:"tired",options:[
                {maintext:"audionap",subtext:"",nameLinkedCards:["YouTubeDeepsleep","ListChillPodcasts","SpotifyMetalMetal","SpotifyElectroVaporwave"]},
                {maintext:"watch youtube",subtext:"",nameLinkedCards:["YouTubeWatchLaterList"]}
            ]},
            {location:"buslike",state:"restless",options:[ // = bored
                {maintext:"learn Swedish",subtext:"",nameLinkedCards:["LinkMemrise"]}
            ]},
            {location:"buslike",state:"lonely",options:[
                {maintext:"message someone",subtext:"",nameLinkedCards:[""]},
                {maintext:"go online",subtext:"",nameLinkedCards:["Reddit","Imgur","4chan"]}
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
            {uniqueName:"ListChillPodcasts", domain:"List", description:"Chill Podcasts",link:"https://escapemod.github.io/chillpodcasts/"},
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
            {uniqueName:"4chan", domain:"self", description:"4chan",link:"https://www.4chan.org/"},
            {uniqueName:"ListStoryGames", domain:"none", description:"Story Games",alternativeTag:'Star Wars Jedi: Fallen Order',link:"https://escapemod.github.io/storygames/"},
            {uniqueName:"ListFastGames", domain:"List", description:"Fast Games",link:"https://escapemod.github.io/fastgames/"},
            {uniqueName:"ListInformativePodcasts", domain:"List", description:"Informative Podcasts",link:"https://escapemod.github.io/informativepodcasts/"},
            {uniqueName:"YouTubeDeepsleep", domain:"YouTube", description:"deepsleep",link:"https://www.youtube.com/playlist?list=PLCFIppW1R6TJ4mhhrBCP-2dX2x7D8PBMI"},
            {uniqueName:"YouTubeSynthwave", domain:"YouTube", description:"Synthwave",link:"https://www.youtube.com/playlist?list=PLCFIppW1R6TKhOBXx-JvgtRZdjVKzujl0"},
            {uniqueName:"YouTubeHypercode", domain:"YouTube", description:"hypercode",link:"https://www.youtube.com/playlist?list=PLCFIppW1R6TIKmrT3_mX9IQu050W1BkA-"},
            {uniqueName:"YouTubeVydiaLofi", domain:"YouTube", description:"vydia lofi",link:"https://www.youtube.com/playlist?list=PLCFIppW1R6TKtcjFvWvpccJ04dU2-dt6Y"},
            {uniqueName:"ImgurLifeHackFreeCourses", domain:"Imgur", description:"free courses",link:"https://imgur.com/gallery/55Z3S"},
            {uniqueName:"LinkFreeCodeCamp", domain:"Link", description:"freeCodeCamp",link:"https://www.freecodecamp.org"},
            {uniqueName:"LinkCoursera", domain:"Link", description:"Coursera",link:"https://www.coursera.org/"},
            {uniqueName:"LinkGoogleCloudTraining", domain:"Link", description:"Google Cloud Training",link:"https://cloud.google.com/training"},
            {uniqueName:"LinkMemrise", domain:"Link", description:"Memrise",link:"https://www.memrise.com/de/"},
            
            
            {uniqueName:"TrelloStudyBoard", domain:"Trello", description:"Study Board",link:"https://trello.com/b/ekrCAlMU/school-board"},
            {uniqueName:"TrelloStudyProjectsBoards", domain:"Trello", description:"Grisons Boards",link:"https://trello.com/grisons"},
            {uniqueName:"TrelloTodayBoard", domain:"Trello", description:"drive focus",link:"https://trello.com/b/QmmVRgM8/1-todo"},
            {uniqueName:"TrelloMissionBoard", domain:"Trello", description:"work on mission",link:"https://trello.com/b/I97RmIJ9/4-ongoing-mission"},
            {uniqueName:"TrelloJobsBoard", domain:"Trello", description:"work on jobs",link:"https://trello.com/b/HgGbRFv3/5-ongoing-jobs"},
            {uniqueName:"TrelloOrganizedTasksBoard", domain:"Trello", description:"work on tasks",link:"https://trello.com/b/wk7DIPSQ/0-collect-organize"},

            {uniqueName:"LinkMAL", domain:"Link", description:"MAL",link:"https://myanimelist.net/"},
            {uniqueName:"LinkSouthPark", domain:"Link", description:"South Park",link:"https://www.southpark.de/"},
            {uniqueName:"ImgurOfficeFlexing", domain:"Imgur", description:"Office Flexing",link:"https://imgur.com/gallery/22G3MYj"},
            
            // game titles
            {uniqueName:"PSNWitcher3", domain:"PSN", description:"Witcher 3",link:""},
            {uniqueName:"PSNPersona5", domain:"PSN", description:"Persona 5",link:""},
            {uniqueName:"PSNNieRAutomata", domain:"PSN", description:"NieR: Automata",link:""},
            {uniqueName:"PSNMirrorsEdgeCatalyst", domain:"PSN", description:"Mirror's Edge Catalyst",link:""},
            {uniqueName:"PSNDoom", domain:"PSN", description:"Doom",link:""},
            {uniqueName:"PSNFallout", domain:"PSN", description:"Fallout 4",link:""},
            {uniqueName:"PSNCoD", domain:"PSN", description:"CoD",link:""},
            {uniqueName:"PSNApex", domain:"PSN", description:"Apex",link:""},
            {uniqueName:"PCVCR", domain:"PC", description:"VCR",link:""},
            {uniqueName:"PSNBattlefield", domain:"PSN", description:"Battlefield",link:""},
            {uniqueName:"PSNTitanfall", domain:"PSN", description:"Titanfall",link:""},

            // template
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
                textModes = ["text","alternative","text","text"];
                console.table([textModes]);
                nextAnswers = this.loadStateDescriptions(textModes);
                break;
            

            case "home":
                this.setAsLocation(lastAnswer);
                console.log(`case: ${lastAnswer}`);
                textModes = ["text","alternative","alternative","text"];
                console.table([textModes]);
                nextAnswers = this.loadStateDescriptions(textModes);
                break;

            case "school":
                this.setAsLocation(lastAnswer);
                console.log(`case: ${lastAnswer}`);
                textModes = ["text","alternative","text","text"];
                console.table([textModes]);
                nextAnswers = this.loadStateDescriptions(textModes);
                break;
            

            case "train":
                this.setAsLocation(lastAnswer);
                console.log(`case: ${lastAnswer}`);
                textModes = ["alternative","alternative","text","text"];
                console.table([textModes]);
                nextAnswers = this.loadStateDescriptions(textModes);
                break;

            case "buslike":
                this.setAsLocation(lastAnswer);
                console.log(`case: ${lastAnswer}`);
                textModes = ["alternative","alternative","text","text"];
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

            if(card.domain == 'none'){
                html += `<a class='linked-card' href="${card.link}" id='${card.unqiueName}'><div>${card.description}
                <br><span class="alternative-tag-field">${card.alternativeTag}</span>
                </div></a>`;

            }else{
                html += `<a class='linked-card' href="${card.link}" id='${card.unqiueName}'><div>${card.description}
                <br><span class="domain-field ${card.domain.toLowerCase()}">${card.domain}</span>
                </div></a>`;
            }

            
        });

        document.getElementById('container').innerHTML = html;


    }



}

window.onload = function(){
    var controller = new Controller();
}
