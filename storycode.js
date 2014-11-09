/**
 * Author : Karl Devooght
 * Date : 03/11/2014
 */



module.exports = function( ) {

    var Sensify = require("sensify/sensify.js");
    var fs = require("fs");
    var path = require("path");

    function InlineCommentExtractor() {
        this.sensify = Sensify();
        this.sensify.term("\\s+", "");
        this.sensify.term("\\/\\/.*", "inline_uc");
        this.sensify.term("\\/[*](.|\\n|\\r)+?[*]\\/", "block_uc");
        this.sensify.term("[^\\/\\/]+", "noise");
        this.sensify.term("\\n", "new_line");
        this.sensify.rule("Expression", "E", "return $E;", true);
        this.sensify.rule("E", "USE_CASE END_USE_CASE E", "$E.push( $USE_CASE ); $$ =  $E;");
        this.sensify.rule("E", "noise E", "$$ = $2");
        this.sensify.rule("E", "", "$$ = [];");
        this.sensify.rule("USE_CASE", "inline_uc", "$$ = { line: @1.first_line , content: $1 };");
        this.sensify.rule("USE_CASE", "block_uc", "$$ = { line: @1.first_line , content: $1 };");
        this.sensify.rule("END_USE_CASE", "new_line", "");
        this.sensify.rule("END_USE_CASE", "", "");
        this.sensify.learn();
    }

    InlineCommentExtractor.prototype.process = function (expression) {
        return this.sensify.process(expression);
    };

    function UseCaseExtractor() {
        this.sensify = Sensify();

        this.sensify.term("\\/\\/\\s*", "inline_comment");
        this.sensify.term("\\/\\*\\s*", "block_comment");
        this.sensify.term("\\*\\/", "");
        this.sensify.term("[u|U][c|C]", "uc");
        this.sensify.term("\\s*\\@[s|S]", "s");
        this.sensify.term("\\s*\\@[t|T]", "t");
        this.sensify.term("\\s*\\@[a|A]", "a");
        this.sensify.term("[0-9]+\\s*", "number");
        this.sensify.term(".*", "description");

        this.sensify.rule("E", "inline_comment uc number s number description",
            "return { id: Number($3) , step: Number($5) , description: $6 };"  , true );
        this.sensify.rule("E", "inline_comment uc number t description",
            "return { id: Number($3) , title: $5 };"  );
        this.sensify.rule("E", "inline_comment uc number a description",
            "return { id: Number($3) , abstract: $5 };"  );
        this.sensify.rule("E", "inline_comment description","return '';" );
        this.sensify.rule("E", "block_comment uc number s number description",
            "return { id: Number($3) , step: Number($5) , description: $6.replace('*/' ,'') };");
        this.sensify.rule("E", "block_comment uc number t description ",
            "return { id: Number($3)  , title: $5.replace('*/' ,'') };");
        this.sensify.rule("E", "block_comment uc number a description ",
            "return { id: Number($3)  , abstract: $5.replace('*/' ,'') };");
        this.sensify.rule("E", "block_comment description","return '';" );
        this.sensify.learn();
    }

    UseCaseExtractor.prototype.process = function (expression) {
        return this.sensify.process(expression);
    };

    function CodeTeller(  ) {
        this.inlineCommentExtractor = new InlineCommentExtractor();
        this.useCaseExtractor = new UseCaseExtractor();
    }

    CodeTeller.prototype.process = function( inputFilePaths , outputFileName ) {
        var self = this;
        var useCases = [];
        inputFilePaths.forEach( function( inputFilePath ) {
            useCases = useCases.concat( self.$processOne( inputFilePath ) );
        });


        useCases.sort( function (uc1, uc2) { return uc1.id == uc2.id ? uc1.step - uc2.step : uc1.id - uc2.id; });
        fs.writeFile(
            outputFileName + '.json',
            JSON.stringify( useCases ),
            function (err) { if (err) throw err; }
        );
    };

    CodeTeller.prototype.$processOne = function( inputFilePath ) {
        var content = fs.readFileSync( inputFilePath , "utf8");
        var useCases = this.inlineCommentExtractor.process( content );
        var self = this;
        var result = [];
        useCases.forEach(function  ( useCase ) {
            var extractedUsecase = self.useCaseExtractor.process( useCase.content );
            if(  extractedUsecase ) {
                extractedUsecase.line = useCase.line;
                extractedUsecase.file = path.basename( inputFilePath ) ;
                result.push( extractedUsecase );
            }
        });
        return result;
    };

    return new CodeTeller();
};


