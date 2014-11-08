
// Get Json data
$.getJSON('output.json', function( usecases ) {
    render( usecases );
});

function render( usecases ) {
   var formattedUsecases = prepareToRender( usecases );
   renderSidebar( formattedUsecases );
   renderMain();
}

function prepareToRender( usecases ) {
    var result = {};
    usecases.forEach( function( usecase ) {
        result[ usecase.id ] =
            result[ usecase.id ] || { title: 'Use Case ' + usecase.id , steps: []};
        result[ usecase.id ].steps.push( { number: usecase.step , description: usecase.description } );
    });
    return result;
}

function renderSidebar( usecases ) {
    for( var key in usecases ) {
        var usecaseLink = $( document.createElement('a'));
        usecaseLink.append("Use Case " + key  );
        usecaseLink.click( function( k ) {
            return function () { onSelectedUsecase(usecases[ k ]);}
        }( key ) );
        $("#list-usecases").append( $(document.createElement('li') ).append( usecaseLink ) );
    }
}

function renderMain( usecase ) {
    if( ! usecase ) { renderEmptyMain() }
    else{ renderUsecaseMain( usecase );}
}

function renderEmptyMain() {
    $("#usecase-title").text( 'Bienvenue' );
}

function renderUsecaseMain( usecase ) {
    $("#usecase-title").text( usecase.title );
    $("#usecase-steps").empty();
    usecase.steps.forEach( function( step ) {
        $("#usecase-steps").append( "<h4>" + step.number + ". " + step.description + "</h4>" );
    });
}

function onSelectedUsecase( usecase ) {
    renderUsecaseMain( usecase );
}