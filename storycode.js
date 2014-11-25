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
        this.sensify.term("[\\/][\\/].*", "inline_uc");
        this.sensify.term("[\\/][*](.|\\n|\\r)+?[*]\\/", "block_uc");
        this.sensify.term(".+", "noise");
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
        this.sensify.term("\\s*\\@[s|S]\\s*", "s");
        this.sensify.term("\\s*\\@[t|T]\\s*", "t");
        this.sensify.term("\\s*\\@[a|A]\\s*", "a");
        this.sensify.term("[0-9]+[\\.0-9]*[\\.a-z]?\\s*", "identifier");
        this.sensify.term(".*", "description");

        this.sensify.rule("E", "inline_comment uc identifier s identifier description",
            " return { id: Number($3) , step: $5.replace(' ','') , description: $6 };"  , true );
        this.sensify.rule("E", "inline_comment uc identifier t description",
            " return { id: Number($3) , title: $5 };"  );
        this.sensify.rule("E", "inline_comment uc identifier a description",
            " return { id: Number($3) , abstract: $5 };"  );
        this.sensify.rule("E", "inline_comment description"," return '';" );
        this.sensify.rule("E", "inline_comment a"," return '';" );
        this.sensify.rule("E", "inline_comment t"," return '';" );
        this.sensify.rule("E", "inline_comment s"," return '';" );
        this.sensify.rule("E", "block_comment uc identifier s identifier description",
            " return { id: Number($3) , step: $5.replace(' ','') , description: $6.replace('*/' ,'') };");
        this.sensify.rule("E", "block_comment uc identifier t description ",
            " return { id: Number($3)  , title: $5.replace('*/' ,'') };");
        this.sensify.rule("E", "block_comment uc identifier a description ",
            " return { id: Number($3)  , abstract: $5.replace('*/' ,'') };");
        this.sensify.rule("E", "block_comment description","return '';" );
        this.sensify.rule("E", "block_comment a"," return '';" );
        this.sensify.rule("E", "block_comment t"," return '';" );
        this.sensify.rule("E", "block_comment s"," return '';" );
        this.sensify.learn();
    }

    UseCaseExtractor.prototype.process = function (expression) {
        return this.sensify.process(expression);
    };

    function CodeTeller(  ) {
        this.inlineCommentExtractor = new InlineCommentExtractor();
        this.useCaseExtractor = new UseCaseExtractor();
    }

    CodeTeller.prototype.process = function( inputFilePaths ) {
        var self = this;
        var useCases = [];
        inputFilePaths.forEach( function( inputFilePath ) {
            useCases = useCases.concat( self.$processOne( inputFilePath ) );
        });

        useCases = useCases.sort( function (uc1, uc2) {
                if( ! uc1.step || ! uc2.step ) { return uc1.id - uc2.id; }
                return uc1.id == uc2.id ? uc1.step - uc2.step : uc1.id - uc2.id; }
        );

        return useCases;
    };

    CodeTeller.prototype.$processOne = function( inputFilePath ) {
        var content = fs.readFileSync( inputFilePath , "utf8"),
            useCases = this.inlineCommentExtractor.process( content ),
            self = this,
            result = [];
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

