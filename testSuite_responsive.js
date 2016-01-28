var casper = require("casper").create();

var screenshotUrl = './responsive.html',
    screenshotNow = new Date(),
    screenshotDateTime = screenshotNow.getFullYear() + pad(screenshotNow.getMonth() + 1) + pad(screenshotNow.getDate()) + '-' + pad(screenshotNow.getHours()) + pad(screenshotNow.getMinutes()) + pad(screenshotNow.getSeconds()),
    viewports = [
      {
        'name': 'smartphone-portrait',
        'viewport': {width: 320, height: 480}
      },
      {
        'name': 'smartphone-landscape',
        'viewport': {width: 480, height: 320}
      },
      {
        'name': 'tablet-portrait',
        'viewport': {width: 768, height: 1024}
      },
      {
        'name': 'tablet-landscape',
        'viewport': {width: 1024, height: 768}
      },
      {
        'name': 'desktop-standard',
        'viewport': {width: 1280, height: 1024}
      }
    ];
casper.start(screenshotUrl, function() {
  this.echo('Current location is ' + this.getCurrentUrl(), 'info');
});

casper.each(viewports, function(casper, viewport) {
  this.then(function() {
    this.viewport(viewport.viewport.width, viewport.viewport.height);
  });
  this.thenOpen(screenshotUrl, function() {
    this.wait(5000);
  });
  this.then(function(){
    this.echo('Screenshot for ' + viewport.name + ' (' + viewport.viewport.width + 'x' + viewport.viewport.height + ')', 'info');
    this.capture('screenshots/' + screenshotDateTime + '/' + viewport.name + '-' + viewport.viewport.width + 'x' + viewport.viewport.height + '.png', {
        top: 0,
        left: 0,
        width: viewport.viewport.width,
        height: viewport.viewport.height
    });
  });
});

casper.run();

function pad(number) {
  var r = String(number);
  if ( r.length === 1 ) {
    r = '0' + r;
  }
  return r;
}