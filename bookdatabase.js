var program = require('commander');

// database of books
var book1_title = "Juliana";
var book1_author = "Jolande Withuis";
var book1_price = "€39,99";
var book1_kind = "gekartonneerd";

var book2_title = "De Greppel";
var book2_author = "Herman Koch";
var book2_price = "€21,99";
var book2_kind = "gekartonneerd";

var book3_title = "Judas";
var book3_author = "Astrid Holleerder";
var book3_price = "€22,50";
var book3_kind = "paperback";

var book4_title = "De Levensvan Jan Six";
var book4_author = "Geert Mak";
var book4_price = "€24,99";
var book4_kind = "paperback";

var book5_title = "Nutshell";
var book5_author = "Ian McEwan";
var book5_price = "€19,95";
var book5_kind = "gekartonneerd hardback";

// initialise program (aka commander) 
program
  .version('0.1')
  .option('-t, --title [string]', 'Title of the book to match', 'empty') // add option --name with default value "empty"
  .parse(process.argv);

// check what the value of title is regardless of if it matches or not
console.log(program.title); // this line can be commented out

// match value of input's "title" argument
switch(program.title)
{
    case book1_title:
        // input match book1
        console.log(book1_title);  // print title
        console.log(book1_author);   // print author
        console.log(book1_price);   // print price
        console.log(book1_kind);   // print kind
        break;
    case book2_title:
        // input match book2
        console.log(book2_title);  // print title
        console.log(book2_author);   // print author
        console.log(book2_price);   // print price
        console.log(book2_kind);   // print kind
        break;
    case book3_title:
        // input match book3
        console.log(book3_title);  // print title
        console.log(book3_author);   // print author
        console.log(book3_price);   // print price
        console.log(book3_kind);   // print kind
        break;
    case book4_title:
        // input match book4
        console.log(book4_title);  // print title
        console.log(book4_author);   // print author
        console.log(book4_price);   // print price
        console.log(book4_kind);   // print kind
        break;
    case book5_title:
        // input match book5
        console.log(book5_title);  // print title
        console.log(book5_author);   // print author
        console.log(book5_price);   // print price
        console.log(book5_kind);   // print kind
        break;   
    default:
        // default message if no match
        console.log('...');
        break;
}