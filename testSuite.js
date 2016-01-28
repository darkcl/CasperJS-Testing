// casper.test.begin('Google search retrieves 10 or more results', 5, function suite(test) {
//     casper.start("http://www.google.com/", function() {
//         test.assertTitle("Google", "google homepage title is the one expected");
//         test.assertExists('form[action="/search"]', "main form is found");
//         this.fill('form[action="/search"]', {
//             q: "Testing"
//         }, true);
//     });

//     casper.then(function() {
//         test.assertTitle("Testing - Google Search", "google title is ok");
//         test.assertUrlMatch(/q=Testing/, "search term has been submitted");
//         test.assertEval(function() {
//             return __utils__.findAll("h3.r").length >= 10;
//         }, "google search for \"Testing\" retrieves 10 or more results");
//         this.capture('foo.jpg', undefined, {
//             format: 'jpg',
//             quality: 75
//         });
//     });
    
//     casper.run(function() {
//         test.done();
//     });
// });

casper.test.begin('Page content tests', 3, function suite(test) {
    casper.start('./index.html', function() {
        test.assertExists('h1.page-title');
        test.assertSelectorHasText('h1.page-title', 'Hello');
        test.assertVisible('footer');
    }).run(function() {
        test.done();
    });
});