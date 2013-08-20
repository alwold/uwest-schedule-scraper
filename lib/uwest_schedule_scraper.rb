require 'json'
require 'phantomjs'

class UwestScheduleScraper
  def get_class_status(term, course)
    info = get_info(term, course)
    if info
      seats = info["seats"].to_i
      return (seats > 0 ? :open : :closed)
    else
      return nil
    end
  end

  private

  def get_info(term, course)
    script = File.expand_path("uwest-scraper.js")
    info = JSON.parse(Phantomjs.run(script, term, course))
    if info["course"]
      return info
    else
      return nil
    end
  end
end
