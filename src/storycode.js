

var Sensify = require('../../sensify');

function InlineCommentExtractor() {
    this.sensify = Sensify();
    this.sensify.term( "\\s+" , "");
    this.sensify.term( "\\/\\/\\s+UC[0-9]+[^\\/\\n\\r]*" , "uc" );
    this.sensify.term( "[^\\/\\/]+" , "noise");
    this.sensify.term( "\\n" , "new_line" );

    this.sensify.rule( "Expression" , "E" , "return $E;" , true );
    this.sensify.rule( "E" , "USE_CASE END_USE_CASE E" , "$E.push( $USE_CASE ); $$ =  $E;"  );
    this.sensify.rule( "E" , "noise E" , "$$= $2" );
    this.sensify.rule( "E" , "" , "$$ = [];" );
    this.sensify.rule( "USE_CASE" , "uc" , "$$ = $1;" );
    this.sensify.rule( "END_USE_CASE" , "new_line" , "" );
    this.sensify.rule( "END_USE_CASE" , "" , "" );

    this.sensify.learn();
}

InlineCommentExtractor.prototype.process = function( expression ) { return this.sensify.process( expression ); };

function UseCaseExtractor() {
    this.sensify = Sensify();
    this.sensify.term( "\\/\\/\\s*" , "comment" );
    this.sensify.term( "[u|U][c|C]" , "uc" );
    this.sensify.term( "\\s*[s|S]" , "s" );
    this.sensify.term( "[0-9]+" , "number" );
    this.sensify.term( "[^\\/\\n\\r]*" , "description");
    this.sensify.rule( "E" , "comment uc number s number description" ,
                             "return { id: Number($3) , step: Number($5) , description: $6 };");

    this.sensify.learn();
}

UseCaseExtractor.prototype.process = function( expression ) { return this.sensify.process( expression ); };

var inlineCommentExtractor = new InlineCommentExtractor();
var useCaseExtractor = new UseCaseExtractor();


var fs = require("fs");
var content = fs.readFileSync("sample", "utf8");

var use_cases = inlineCommentExtractor.process( content );
var sorted_use_cases = [];
var output = '';

use_cases.forEach( function( use_case ) { sorted_use_cases.push(  useCaseExtractor.process( use_case ) ); });
sorted_use_cases.sort( function( uc1 , uc2 ) { return uc1.id == uc2.id ? uc1.step - uc2.step : uc1.id - uc2.id;});

fs.writeFile('story.json', JSON.stringify( sorted_use_cases ) , function (err) {
    if (err) throw err;
    console.log('It\'s saved!');
});


