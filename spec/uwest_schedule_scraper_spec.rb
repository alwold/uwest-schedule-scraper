require 'uwest_schedule_scraper'

describe UwestScheduleScraper, '#get_class_info' do
  scraper = UwestScheduleScraper.new
  it "open class shows open status" do
    scraper.get_class_status("162", "ENGL101").should eq(:open)
  end
end
