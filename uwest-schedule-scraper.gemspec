Gem::Specification.new do |s|
  s.name = "uwest-schedule-scraper"
  s.version = "0.1"
  s.date = "2013-08-15"
  s.authors = ["Al Wold"]
  s.email = "alwold@alwold.com"
  s.summary = "Scrapes schedule data for University of the West"
  s.files = ["lib/uwest_schedule_scraper.rb", "lib/uwest_class_info.rb"]
  s.add_runtime_dependency "phantomjs.rb"
end
