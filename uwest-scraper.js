var page = require('webpage').create();
var step = 1;
page.settings.loadImages = false;
page.open('https://myportal.uwest.edu/Common/CourseSchedule.aspx', function() {
  page.onLoadFinished = function(status) {
    if (step === 1) {
      step = 2;
      page.injectJs("click.js");
      page.evaluate(function() {
        clickElement($("td[class='link1'] > a")[0]);
      });
    } else {
      var info = page.evaluate(function() {
        return {
          name: $("span[id$='lbClassDesc']").text(),
          course: $("span[id$='lbCode']").text(),
          seats: $("span[id$='lbSeatsAvail']").text()
        };
      });
      console.log("Name: "+info.name);
      console.log("Course: "+info.course);
      console.log("Seats: "+info.seats);
      phantom.exit();
    }
  };
  page.onConsoleMessage = function(msg, lineNum, sourceId) {
    console.log(msg);
  };
  page.injectJs("click.js");
  page.evaluate(function() {
    $("select[name$='cbTerm']").val("162")
    $("input[name$='txtCode']").val("ENGL101");
    clickElement($("a[id$='btnSearch']")[0]);
    return true;
  });
});
