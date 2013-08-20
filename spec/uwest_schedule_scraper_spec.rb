require 'uwest_schedule_scraper'

describe UwestScheduleScraper, '#get_class_info' do
  scraper = UwestScheduleScraper.new
  it "open class shows open status" do
    # open = get_class :open
    # scraper.get_class_status(open.term_code, open.abbrev, open.course_number, open.class_number).should eq(:open)
    scraper.get_class_status("162", "ENGL101").should eq(:open)
  end
  it "closed class shows closed status" do
    scraper.get_class_status("162", "REL636").should eq(:closed)
  end
  it "returns nil for non-existent class" do
    scraper.get_class_status('162', 'REL633').should eq(nil)
  end
end
