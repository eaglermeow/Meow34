function renameURL(fullPath){

    history.pushState(
        {},
        "",
        fullPath
    );

}





/*
    Open a new about:blank tab/window
*/

function launchBlank(){

    const win =
    window.open(
        "about:blank",
        "_blank"
    );


    return win;

}





/*
    Create and launch a Blob page
*/

function launchBlob(htmlContent){


    const blob =
    new Blob(
        [
            htmlContent
        ],
        {
            type:"text/html"
        }
    );



    const url =
    URL.createObjectURL(blob);



    window.open(
        url,
        "_blank"
    );



    return url;

}