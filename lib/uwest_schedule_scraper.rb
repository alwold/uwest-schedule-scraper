require 'json'
require 'phantomjs'

class UwestScheduleScraper
  def get_class_status(term, course)
    script = File.expand_path("uwest-scraper.js")
    output = JSON.parse(Phantomjs.run(script, term, course))
    seats = output["seats"].to_i
    return (seats > 0 ? :open : :closed)
  end
end
