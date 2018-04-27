var fs = require('fs');
var readline = require('readline');
const chalk = require('chalk');
var rl = readline.createInterface(process.stdin, process.stdout);
var Person = require('./bot');

 var fetchWords = (question, lastWord) => {
    fs.readFile('./jsonFiles/box.json', (err, data) => {
        if (err) {
            return console.log(err);
        }
        data = JSON.parse(data);
        var answer = data[lastWord];
            if(answer)
                bot.emit('speak', answer);
            if(!answer){
                longSentence(question)
            }                      
    });          
}



function intro(){
    console.log(`\n          'Go'  To QUESTION the KNOWLEDGE BASE`);
    console.log(`\n          'Add'  to write data to KNOWLEDGE BASE`); // not used
    console.log(`\n          'help'  to see the rules.`); // Not used
    console.log(`\n          'Exit'  will 'END' the session\n`);

    rl.question("Please select:> ", function(answer){
        answer = answer.trim().toLowerCase();
        if (answer === 'go'){ 
            var clear = require('clear');clear(); // Clear the screen
            console.log(`          Your question please\n`);                     
            start(1);        
        }
            if (answer === 'add'){
                addData();
            }
            if (answer === 'exit'){     
                finish();
            }
    });
}

function start(n){
    
    for (var i=50; i > n; n++){
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
                    fetchWords(question, lastWord);
    }else{
        longSentence(question);            
    }
}

function longSentence(question){
    var longQuestion = fs.readFileSync('./jsonFiles/fullSentence.json');
    var data = JSON.parse(longQuestion);
    var answer = data[question]; 
        if(answer){
            bot.emit('speak', answer);
           start(1);
        }else{            
            addToDB(question);
        }    
}

function addToDB(question){
    var clear = require('clear'); clear();
        console.log(answer = chalk.blue `\n          BOT > Cannot give an answer to ${question}`);
        var longQuestion = fs.readFileSync('./jsonFiles/fullSentence.json');
        var data = JSON.parse(longQuestion);
        var words = data;
        var word = question.trim().toLowerCase();    
        console.log(chalk.yellow`          Please enter your answer\n`);
    rl.question(chalk.yellow`          answer > `, function(body){
        if(body ==='exit'){
            finish();
        }
            var val = body;
            words[word] = val;
            var data = JSON.stringify(words, null, 2);    
                fs.writeFile('./jsonFiles/fullSentence.json', data, fim);    

function fim(){    
    console.log(`\n          new entry in the database`);
        start(1);
    }
    });      
}

function finish(){
    var clear = require('clear');clear();
    console.log(`\n                       ------- ENDING PROGRAM -------`);
    process.exit();
}

    var bot = new Person('ChatBot');
bot.on('speak', function(answer){
    console.log(chalk.green(`          BOT > ${answer} \n`));
    start(1);
});

intro();