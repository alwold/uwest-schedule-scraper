require 'json'
require 'phantomjs'
require 'uwest_class_info'

class UwestScheduleScraper
  def get_class_status(term, course, section)
    info = get_info(term, course, section)
    if info
      seats = info["seats"].to_i
      return (seats > 0 ? :open : :closed)
    else
      return nil
    end
  end

  def get_class_info(term, course, section)
    info = get_info(term, course, section)
    if info
      UwestClassInfo.new(info["name"], nil)
    else
      nil
    end
  end

  private

  def get_info(term, course, section)
    script = File.expand_path("../../uwest-scraper.js", __FILE__)
    # put quotes around the params because phantomjs.rb just concatenates all params together
    info = JSON.parse(Phantomjs.run(script, term, "'#{course}'", "'#{section}'"))
    if info["course"]
      return info
    else
      return nil
    end
  end
end
