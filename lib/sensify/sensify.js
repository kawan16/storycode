
/**
 * Author: Karl DEVOOGHT
 * Date: 03/11/2014
 */

module.exports = function( ) {

    var Parser = require("jison").Parser;
    var Lexer = require("jison-lex");

    // Constructor
    function Sensify() {
        this.$lex = { rules: [] ,option: 'yylineno'};
        this.$grammar = {
            operators: [],
            bnf: {}
        };


        return this;
    }

    Sensify.prototype.term = function(  regex , name ) {
        if( ! name ) { this.$lex.rules.push( [ regex , "/* Skip */" ] );}
        else { this.$lex.rules.push( [ regex ,  "return '" + name + "';" ] )};
    };

    Sensify.prototype.operator = function(  direction , name ) {
        this.$grammar.operators.push( [ direction , name ] );
    };

    Sensify.prototype.rule = function( antecedent , consequent , fnString , isStartRule ) {
        this.$grammar.bnf[ antecedent ] = this.$grammar.bnf[ antecedent ] || [];
        this.$grammar.bnf[ antecedent ]
            .push(
                ( consequent === "" ? [ '' , fnString ] : [ consequent , fnString ] )
            );
        if( isStartRule ) { this.$grammar.start = antecedent; }
    };

    Sensify.prototype.learn = function( ) {
        if( this.$grammar.operators.length == 0 ) { delete this.$grammar.operators; }
        this.$parser = new Parser( this.$grammar );
        this.$parser.lexer = new Lexer(this.$lex);


    };

    Sensify.prototype.process = function( expression ) {
        return this.$parser.parse( expression );
    };

    return new Sensify();
}
