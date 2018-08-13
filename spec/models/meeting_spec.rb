require 'rails_helper'

RSpec.describe Meeting, type: :model do
  describe "validations" do
    it "is valid with valid attributes" do
      user = FactoryBot.create(:user, email: "firsttest@sharklasers.com")
      meeting = FactoryBot.build(:meeting, creator_id: user.id)
      expect(meeting).to be_valid
    end

    it "is not valid without datetime" do
      user = FactoryBot.create(:user, email: "secondtest@sharklasers.com")

      meeting_no_datetime = FactoryBot.build(:meeting, datetime: "", creator_id: user.id)
      expect(meeting_no_datetime).to_not be_valid
    end

    it "is not valid without location" do
      user = FactoryBot.create(:user, email: "thirdtest@sharklasers.com")

      meeting_no_location = FactoryBot.build(:meeting, location: "", creator_id: user.id)
      expect(meeting_no_location).to_not be_valid
    end

    it "is not valid without creator" do
      meeting_no_creator = FactoryBot.build(:meeting, creator_id: nil)
      expect(meeting_no_creator).to_not be_valid
    end
  end
end
