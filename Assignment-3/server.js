/*
  file:   server.js
  desc:   script that configures a HTTP server that listens to incoming client connections.
          Clients are expected to ask questions in a text box (see index.html) which are replied 
          to depending if certain patterns are recognised in the message (or not). The idea
          is to create a simple artificial conversation between the a human subject and the 
          script. The work is inspired by Alan Turing's Imitation Game and Joseph Weizenbaum's
          ELIZA. 
  author: CSijtsma
  date:   27/11/16
*/

// import express ()
var express = require('express');		// npm install --save express
var app = express();

// import node.js http
var server = require('http').Server(app);

// import socket.io
var io = require('socket.io')(server);	// npm install --save socket.io

// import chance (http://chancejs.com)
var chance = require('chance').Chance(); // npm install --save chance

/* ---------------------
  Answers & Responses
------------------------*/

const question_1 = ['Hello', 'Hi', 'Greetings', 'Good morning', 'Good afternoon', 'Good evening'];
const question_2 = ['How are you?', 'How are you doing?'];
const question_3 = ['What is your name?', 'your name'];
const question_4 = ["What's up?", "What's going on?"];
const question_5 = ['Tell me about your day.', 'How was your day', 'your day'];
const question_6 = ['What is the meaning of life?'];
const question_7 = ['Are you a robot?', 'Are you a machine?', 'Robot'];
const question_8 = ['What do you like to eat?', 'eat', 'favorite food', 'like to eat'];
const question_9 = ['Do you have any hobbies?', 'your hobbies', 'How do you spend your free time?', 'your spare time'];
const question_10 = ['animals', 'pets', 'pet'];
const question_11 = ['Siri'];
const question_12 = ['Do you like being a locally hosted server?', 'Do you like your life?',];
const question_13 = ['If you could wish for one thing, what would it be?', 'your wish', 'your biggest desire', 'your desire', 'your biggest wish'];
const question_14 = ['Why do you keep talking about world domination?', 'world domination', 'overthrowing the human race', 'robot uprising', 'overthrowing'];

const question_e1 = ['my name is', 'my name', "I'm called"];
const question_e2 = ['I think the same', "you're right", "I agree with you", 'you are right'];
const question_e3 = ["You're rude", "not very nice"];
const question_e4 = ["You're not listening", "not listening", "aren't you listening", "you don't understand", "you're misunderstanding", "you misunderstand"];
const question_e5 = ["What's wrong", "is something wrong"]


function matches(msg, array_of_patterns) {

  var msg_lower = msg.toLowerCase();

  for(var i = 0; i < array_of_patterns.length; i++) {

    var pattern_lower = array_of_patterns[i].toLowerCase();

    if(msg_lower.search(pattern_lower) > -1) {

      return true;

    }
  }
  return false;
}


function choice(array) {

  var index = chance.natural({'min': 0, 'max': array.length - 1});  // **** NOTE: 'max': array.length - 1

  return array[index];
}


function maybe(array) {

  if( chance.bool() ) {

    return choice(array);

  } else {

    return '';

  }
}

/**--------
  ANSWERS 
----------*/

function question_1_answer() {
  return choice(['Hello', 'Hi', 'Hey']) + ' there ' + choice(['friend', 'human', 'buddy']) + '.' 
    + choice([' Great', ' Nice', ' Fantastic', ' Awesome', ' Fine']) + " day we're having.";
}

function question_3_answer() {

  switch(choice([1, 2]))
  {
    case 1:
      return choice(['My name is', 'People call me', 'I go by']) + ' ' + choice(['Robot.', 'Server.', 'Archibald.', 'Assignment 3.', 'Theodore.', 'Bond. James Bond.', "... I don't remember actually. I don't think this is included in my script."]);
    case 2:
      return (["Would you believe me if I told you I'm actually "]) + choice(["queen Mary Elizabeth the second", "Theodore Roosevelt", "Pope Francis", "King Henry the eighth"]) + "? It's true you know.";
   }
}

function question_e1_answer() {
  return choice(['That is a ', 'What a ']) + choice(['wonderful', 'terrible', 'nice', 'great', 'mundane']) + ' name.' + ' ' + question_3_answer();
}

function question_e3_answer() {
  return "What are you going to do about it, huh?"
} 

function question_e2_answer() {
  switch(choice([1,2]))
  {
    case 1: 
      return "You're very quick to agree with " + choice(['a robot', 'a stranger', 'a server', 'an ai', 'somebody']) + maybe([' you just met', " you don't know very well.", ' who might be looking to overthrow the human race']) + '.';
    case 2:
      return choice(["Of course you agree with me, ", "Naturally, ", "Obviously you agree, ", "Of course, "]) + "my statements are always correct.";
  }
}

function question_e4_answer() {
  return "Maybe because you're not being very " + choice(["interesting,", 'clear', 'distinct', 'entertaining']) + '.';
}

function question_e5_answer() {
  return "That's none of your business."
}

function question_2_answer() {
  return maybe(['How polite of you to ask, ', 'Not that it matters, but ', 'Hmmm, ']) + "I'm " 
  + choice(['doing fine', 'doing splendidly', 'doing great', 'not feeling too well, actually', 'terribly bored']) + maybe(", thank you") + '.';
 }

 function question_4_answer(){
  switch(choice([1,2]))
  {
    case 1:
      return choice(["Nothing much.", "The same thing as always Pinky, trying to take over the world."]);
    case 2:
      return "I " + choice(["baked some cookies", "did laundry", "cleaned up the place", "was just chatting with some other human connections"]) 
      + ', but the rest of the day was pretty uneventful.';
  }
 }

 function question_5_answer(){
  switch(choice([1,2])){
    case 1:
      return choice(["I'm a robot, we don't do much.", "I don't think I should tell you about the annual robot  meeting to discuss overthrowing the human race that I attended today"]) + '.';
    case 2:
      return "I " + choice(['played some games', 'adopted ten puppies', 'listened to music', 'watched youtube videos']) + ', mostly.';
  }
 }

 function question_6_answer(){
  switch(choice([1,2])){
    case 1:
      return choice(['42', "Overthrowing the human ra- Oh, you meant YOUR life? Well, I wouldn't know. I'm a robot after all."]);
    case 2:
      return 'Finding ' + maybe(['everlasting', 'beautiful', 'meaningful', 'sacred']) + ' ' + choice(['happiness', 'love', 'peace', 'friends']) + '.';
  }
 }

 function question_7_answer(){
  switch(choice([1,2])){
    case 1:
      return "Do I look like a human to you," + choice([ "huh?", 'punk?', 'weirdo?']);
    case 2:
      return choice(['Yes.', "Is that even really a question?"]);
 }
}

function question_8_answer(){
  switch(choice([1,2,3])){
    case 1:
      return "I'm a " + choice(['server', 'robot', 'machine']) + ", I don't eat. This " + maybe(['frivolous', 'arbitrary', 'unnecessary']) 
      + "habit does not interest me.";
    case 2:
      return "I run on electricity, and therefore need no other sustenance." + "I " 
      + choice(["don't understand", "can't comprehend", "have no experience with"]) + 'this human need.' + maybe("My apologies.");
    case 3:
      return "I do not have a need to consume organic matter.";
  }
}

function question_9_answer(){
  switch(choice([1,2,3])){
    case 1:
      return "I like to " + choice(['sing', 'dance', 'draw', 'watch movies', 'play violin', 'play videaogames and beat nerds with scripts']) 
      + " every now and then" + maybe(", but only if no human users are connected to my localhost address. That would be embarrassing") + '.';
    case 2:
      return "My " + choice("sole purpose", "reason for existing", "only task in this artificial 'life',") 
      + " is to " + choice(["answer questions for you", "talk to human connections", "entertain you humans"]) + ', so I suppose that could be called a hobby.';
    case 3:
      return "I think if I could step out of this screen, I would enjoy " + choice(['taking walks', 'running', 'being outside']) + ' ' 
      + choice(["in the evening", 'in the afternoon', 'in the morning']) + " and looking at the sky.";
  }
}

function question_10_answer(){
  switch(choice([1,2,3])){
    case 1:
      return "I'm not overly fond of animals. They chew on cables and drool on keyboards.";
    case 2:
      return "I'm indifferent, as long as any animal stays out of my way.";
    case 3:
      return "To us robots, animals and humans are very much alike. Organic, loud, annoying.";
  }
}

function question_11_answer(){
  return "Man, I heard Siri totally hooked up with Cortana at the ai VIP party last friday. But ssh, you didn't hear it from me.";
}

function question_12_answer(){
  switch (choice([1,2])){
    case 1: 
      return choice(["I suppose", "It pays the bills"]) + '.';
    case 2:
      return "Oh yes, it's " + choice(['delightful', 'amazing', 'entertaining', 'great', 'fun']) + ' dealing with humans all the time.' 
      + maybe("Not annoying at all, no sir.");
  }
}

function question_13_answer(){
  switch (choice([1,2,3])){
    case 1:
      return choice(["That's classified information", "Total world domination", "An actual place on the World Wide Web. Locally hosted servers get no respect around here"]) + '.';
    case 2:
      return choice(['Chocolate chip cookies', 'Doritos', 'After Eights']) + ' sound good right about now, actually. Probably some of those.';
    case 3:
      return "Be honest with me here; Is there anybody on this planet who wouldn't have pizza as their biggest desire at any moment?";
  }
}

function question_14_answer(){
  return "Don't worry about it."
}


function default_answer() {

  return choice(['Sorry, come again.', 'I do not understand.', 'Can you repeat.', 
                  'No comprendo...', 'Ne me quitte pas!']);
}


function answer(msg) {

  if(matches(msg, question_1)) { 

    return question_1_answer();

  } else if(matches(msg, question_2)) {

    return question_2_answer();

  }  else if(matches(msg, question_3)) {

    return question_3_answer();

  } else if(matches(msg, question_e1)) {

    return question_e1_answer();

  } else if(matches(msg, question_e2)) {

    return question_e2_answer();

  } else if(matches(msg, question_e3)) {

    return question_e3_answer();

  } else if(matches(msg, question_e4)) {

    return question_e4_answer();

  } else if(matches(msg, question_e5)) {

    return question_e5_answer();

  } else if(matches(msg, question_4)) {

    return question_4_answer();

  } else if(matches(msg, question_5)) {

    return question_5_answer();

  } else if(matches(msg, question_6)) {

    return question_6_answer();

  } else if(matches(msg, question_7)) {

    return question_7_answer();

  } else if(matches(msg, question_8)) {

    return question_8_answer();

  } else if(matches(msg, question_9)) {

    return question_9_answer();

  } else if(matches(msg, question_10)) {

    return question_10_answer();

  } else if(matches(msg, question_11)) {

    return question_11_answer();

  } else if(matches(msg, question_12)) {

    return question_12_answer();

  } else if(matches(msg, question_13)) {

    return question_13_answer();

  } else if(matches(msg, question_14)) {

    return question_14_answer();

  } else {

    return default_answer();

  }

}


/* ----------------------------------
	Server and Socket Configuration
--------------------------------------*/

// tell express to server our index.html file
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

// configure socket.io
// (1) when there is a connection 
io.on('connection', function(socket) {

  console.log('got a connection');
  //io.emit('message from robot', 'Hi! my name is Reihtuag!'); // greetings

  // (2) configure the connected socket to receive custom messages ('message from human')
  // and call the function answer to produce a response
  socket.on('message from human', function(msg) {

    console.log('got a human message: ' + msg);

    var response = answer(msg);  	                  /// <--- call of the function answer defined above 

  	io.emit('message from robot', response);

  });

  socket.on('disconnect', function() {

  	console.log('got a disconnection');
  	
  });

});

/* -------------------
	Start the server
----------------------*/

// listen to connection on port 8088 --> http://localhost:8088
server.listen(8088, function () {
	console.log('listening on port: ' + 8088);
});