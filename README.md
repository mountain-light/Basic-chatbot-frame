var fs = require('fs');
    var readline = require('readline');
    const chalk = require('chalk');
    var rl = readline.createInterface(process.stdin, process.stdout);

// read box.json
    var fetchWords = (lastWord) => {
        fs.readFile('./jsonFiles/box.json', function(err, data) {
            if (err) {
                return console.log(err);
            }
            data = JSON.parse(data);
            var answer = data[lastWord];
                if(answer)
                    receivedReply(answer);
                if(!answer || answer === undefined){
                    console.log(answer = `\n          HAL > Cannot give an answer! - +
                        Please Add Question/Reply to database`);
                    addToDB();
                }                      
        });                
    }

// Introduction
function intro(){

    console.log(`\n          'Go'  To QUESTION the KNOWLEDGE BASE`);
    console.log(`\n          'Add'  to write data to KNOWLEDGE BASE`); // not used
    console.log(`\n          'help'  to see the rules.`); // Not used
    console.log(`\n          'Exit'  will 'END' the session\n`);

rl.question("Please select:> ", function(answer){
    answer = answer.trim().toLowerCase();
        if (answer === 'go'){                      
            start(1);        
        }
            if (answer === 'add'){
                addData();
            }
        if (answer === 'exit'){     
            finish();S
        }
});
}

function start(n){
    for (var i=100; i > n; n++){
        rl.question(chalk.blue`\n          HUMAN > `, function(quest){
            var question = quest.trim().toLowerCase();
            if (question == 'exit'){
                finish();
            }else{
                siftQuestion(question);
            }
        });
    }
}

function siftQuestion(question){
    if(question ==='undefined') {
        console.log('Word not known - Add it to database');
        start(1);
    }
        var str = question.toLowerCase();
        var arr = str.split(' '); // array made
        val1 = arr.shift(); // first word from the front
        val2 = arr.shift(); // second word from the front
        var val = val1 + ' ' + val2;
        var lastWord = arr.pop(); // last word from array
        var sentence = val + lastWord;

    if(val == 'who is' || val == 'what is' || val == 'why is' || val == 'when is' || val == 'where is' || val == 'how is' ||
        val == 'who are' || val == 'what are' || val == 'why are' || val == 'when are' || val == 'where are' || val == 'how are' ||
            val == 'are you' || val == 'am i' || val == 'i am' || val == 'he is' || val == 'she is' || val == 'they are' || val == 'are they' ||
                val == 'we are' || val == 'are we' || val == 'is it' || val == 'it is' || val=='do you') {
        fetchWords(lastWord);
   


    }else{ // when the 'lastWord' does not qualify as above
        longSentence(question);            
        }
}
// Next job connect it to box.json
function longSentence(question){
    var longQuestion = fs.readFileSync('./jsonFiles/fullSentence.json');
    var data = JSON.parse(longQuestion);
    var words = data;
    var answer = data[question]; 
        if(answer){
            receivedReply(answer);
        }else if(!answer){
            console.log(answer = `\n          BOT > Cannot give an answer!`);
            addToDB();
        }
    
}
// It is working but it is disjointed
function addToDB(){
    var clear = require('clear');
    clear();
    console.log('Enter Question then add the Reply - <exit to END>');
    var longQuestion = fs.readFileSync('./jsonFiles/fullSentence.json');
    var data = JSON.parse(longQuestion);
    var words = data;
    rl.question(chalk.yellow`          Please insert the question > `, function(title){
        if(title =='exit'){
            finish();
        }
        var word = title.trim().toLowerCase();    
        console.log(chalk.yellow`          Please supply the answer?\n`);
    rl.question(chalk.yellow`          answer > `, function(body){
        if(body =='exit'){
            finish();
        }
        var val = body;
        words[word] = val;
        var data = JSON.stringify(words, null, 2);    
        fs.writeFile('./jsonFiles/fullSentence.json', data, fim);

    function fim(){    
        console.log(`          new entry in the database`);
        start(1);
    }    
    });   
    });    
}

function receivedReply( answer) {  
            console.log(chalk.green(`          BOT > ${answer} \n`));
            start(1);
            if (answer === 'exit'){
                finish();
            }
}

function finish(){
    var clear = require('clear');
    clear();
    console.log(`\n                       ------- ENDING PROGRAM -------`);
    process.exit();
}

intro();

