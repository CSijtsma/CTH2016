// letter.js

var chance = require('chance').Chance();

var wrap = require('word-wrap');

const first = ['Knights', 'peasants', 'nobles', 'generals', 'officers', 'countrymen', 'compatriots', 'mercenaries', 'gentlemen', 'companions', 'allies', 'paladins', 'priests', 'farmhands', 'servants'];

const adjectives = ['great', 'tremendous', 'wonderous', 'beautiful', 'awe-inspiring', 'fantastic', 'grand', 'main', 'amazing'];

const adverbs = ['greatly', 'horribly', 'tremendously', 'terribly', 'awfully', 'dreadfuly', 'clumsily', 'disgracefully', 'disreputably', 'unforgivably', 'shoddily', 'poorly', 'unpleasantly', 'wretchedly'];

const adjectives3 = ['terrible', 'annoying', 'aggravating', 'bothersome', 'irritating', 'disturbing', 'troublesome', 'rash', 'foolhardy', 'ill-advised', 'hasty', 'thoughtless', 'irrational', 'reckless', 'immature', 'imprudent', 'brash', 'hotheaded', 'headstrong', 'overly confident'];

const nouns = ['castle', 'princess', 'family', 'horse', 'city', 'land', 'dog', 'army', 'prestige', 'status', 'dignity', 'power', 'reputation', 'authority', 'mansion', 'toupé', 'treasure', 'wealth', 'darling', 'riches', 'government', 'esteem', 'Gods', 'command', 'rule', 'reign', 'strength', 'libido'];

const nouns2 = ['Duke of Wellington', 'President', 'King of the neighboring country', 'Queen of Narnia', 'wizards of Winterhold', 'witches of the West', 'Dragon', 'rebel force', 'deserters', 'order of clowns', 'templars', 'trolls', 'goblin king', 'Rohirrim of Rohan', 'white wizard of Isengard']

const nouns3 = ['assistance', 'help', 'aid', 'backing', 'support', 'service', 'reinforcement', 'helping hands', 'cooperation'];

const verbs = ['ridiculed', 'mocked', 'attacked', 'besieged', 'invaded', 'stormed upon','scoffed at', 'parodied', 'insulted', 'sneered at', 'japed at', 'the butt of jokes', 'caricatured'];

const verbs2 = ['need', 'request', 'wish for', 'could use', 'demand', 'long for', 'must have'];

const verbs3 = ['heed', 'listen to', 'notice', 'answer', 'respond to'];

function choice(array) {
	var index = chance.natural({'min': 0, 'max': array.length - 1})
	return array[index];
} 

function maybe(array) {
	if(chance.bool()) {
		return choice(array);
	} else {
		return '';
	}
}

function ending(array) {
	if(chance.bool()) {
		return ending1();
	} else {
		return ending2();
	}
}

function long(){
	return 'My '  + maybe(adjectives) + ' ' + choice(nouns) + ' is being ' + maybe(adverbs) + ' ' + choice(verbs) + ' by the ' + maybe(adjectives3)
	 + ' ' + choice(nouns2) + '. '
}

function opening(){
	return 'Dear' + ' ' + choice(first) + ','
}

function ending1(){
	return 'I ' + choice(verbs2) + ' your ' + maybe(adjectives) + ' ' + choice(nouns3) + '. '
}

function ending2(){
	return 'Please ' + choice(verbs3) + ' my call for ' + choice(nouns3) + '. '
}

console.log(opening())
console.log("\n");

for (var i = 0; i < 5; i++) {
	console.log(long());
}
console.log("\n")
console.log(ending())
console.log("\n");
console.log("Sincerely,");
console.log("\n" + "Your King");
