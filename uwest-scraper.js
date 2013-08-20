phantom.onError = function(msg, trace) {
  console.log(JSON.stringify({
    error: msg,
    trace: trace
  }));
  phantom.exit(1);
};
var args = require('system').args;
if (args.length < 2) {
  console.log(JSON.stringify({
    error: "Usage: phantomjs uwest-scraper.js <termCode> <course>"
  }));
  phantom.exit(1);
} else {
  var termCode = args[1];
  var course = args[2];
}
var page = require('webpage').create();
page.onError = function(msg, trace) {
  console.log(JSON.stringify({
    error: msg,
    trace: trace
  }));
  phantom.exit(1);
};
var step = 1;
page.settings.loadImages = false;
page.open('https://myportal.uwest.edu/Common/CourseSchedule.aspx', function() {
  page.onLoadFinished = function(status) {
    if (step === 1) {
      step = 2;
      page.injectJs("click.js");
      var exit = page.evaluate(function() {
        var element = $("td[class='link1'] > a")[0];
        if (element) {
          clickElement(element);
          return false;
        } else {
          console.log(JSON.stringify({
            name: null,
            course: null,
            seats: null
          }));
          return true;
        }
      });
      if (exit) {
        phantom.exit();
      }
    } else {
      var info = page.evaluate(function() {
        return {
          name: $("span[id$='lbClassDesc']").text().trim(),
          course: $("span[id$='lbCode']").text().trim(),
          seats: $("span[id$='lbSeatsAvail']").text().trim()
        };
      });
      console.log(JSON.stringify(info));
      phantom.exit();
    }
  };
  page.onConsoleMessage = function(msg, lineNum, sourceId) {
    console.log(msg);
  };
  page.injectJs("click.js");
  page.evaluate(function(termCode, course) {
    $("select[name$='cbTerm']").val(termCode)
    $("input[name$='txtCode']").val(course);
    $("input[value='rbOC']").attr("checked", "checked");
    clickElement($("a[id$='btnSearch']")[0]);
    return true;
  }, termCode, course);
});
