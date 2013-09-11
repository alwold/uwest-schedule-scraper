require 'uwest_schedule_scraper'
# require './class_info'
# require 'csusb_spec_helpers.rb'

# RSpec.configure do |config|
#   config.include CsusbSpecHelpers
# end

describe UwestScheduleScraper, '#get_class_info' do
  scraper = UwestScheduleScraper.new
  # it "can load open class" do
  #   c = get_class :open
  #   c.should be_an_instance_of(ClassInfo)
  #   c.abbrev.should_not be_nil
  # end
  it "open class shows open status" do
    # open = get_class :open
    # scraper.get_class_status(open.term_code, open.abbrev, open.course_number, open.class_number).should eq(:open)
    scraper.get_class_status("162", "ENGL101", "").should eq(:open)
  end
  it "closed class shows closed status" do
    scraper.get_class_status("162", "REL636", "").should eq(:closed)
  end
  it "class info can be loaded" do
    info = scraper.get_class_info('162', 'ENGL101', '')
    info.name.should eq("English Composition")
    # info.schedule.should eq("TR 10:00 AM - 11:50 AM")
  end
  it "returns nil for non-existent class" do
    scraper.get_class_status('162', 'REL633', '').should eq(nil)
    scraper.get_class_info('162', 'REL633', '').should eq(nil)
  end
  it "blows up with not enough params" do
    expect { scraper.get_class_info("162", "ENGL101") }.to raise_error(ArgumentError)
  end
end
