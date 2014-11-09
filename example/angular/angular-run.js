

var StoryCode = require("../../src/storycode");
StoryCode().process( [ "./personController.js" , "./personService.js" , "./app.js" ] , "./report/output" );