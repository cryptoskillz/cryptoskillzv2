/*
We put the document ready here as we load the page specific JS Into the 11.ty file using its inline JS method so this always appears before our 
generic js file (app.js) there are many ways to achieve this, this one is ours please feel free to do it however you wish
*/
let whenDocumentReady = (f) => {
    /in/.test(document.readyState) ? setTimeout('whenDocumentReady(' + f + ')', 9) : f()
}
whenDocumentReady(isReady = () => {
    // Write Javascript code!

    //get the test element and pass a template into it vai hyperhtml
	//hyperHTML.bind(document.getElementById('test'))
	//`<h1>Hello, world!</h1>`;
})