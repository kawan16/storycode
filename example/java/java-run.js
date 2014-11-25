

var StoryCode = require("../../storycode"),
    fs = require('fs'),
    output = StoryCode().process( [ "./SpringMVCSample.java" ] );

fs.writeFile('report/output.json', JSON.stringify( output ) , function (err) {
    if (err) throw err;
    console.log('The output.json file has been generated into the folder "report" ');
    console.log('Take a look at the index.html ( you need to serve it via a simple NodeJS/Express server for instance ). ');
});