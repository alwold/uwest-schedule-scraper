phantom.onError = function(msg, trace) {
  console.log(JSON.stringify({
    error: msg,
    trace: trace
  }));
  phantom.exit(1);
};
var args = require('system').args;
if (args.length < 3) {
  console.log(JSON.stringify({
    error: "Usage: phantomjs uwest-scraper.js <termCode> <course>"
  }));
  phantom.exit(1);
} else {
  var termCode = args[1];
  var course = args[2];
  var section = args[3];
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
      var exit = page.evaluate(function(course, section) {
        var table = $("table[id$='CourseList']");
        var rows = $("tr[class^='row']");
        var found = false;
        rows.each(function(index, row) {
          var thisCourse = $("span[id$='lblCourseCode']", row).text().trim();
          var thisSection = $("td", row)[3].innerHTML.replace("&nbsp;", "").trim();
          if (thisCourse === course && thisSection === section) {
            var link = $("td[class='link1'] > a", row)[0];
            if (link) {
              clickElement(link);
              found = true;
            }
          }
        });
        if (!found) {
          console.log(JSON.stringify({
            name: null,
            course: null,
            seats: null
          }));
          return true;
        } else {
          return false;
        }
      }, course, section);
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
