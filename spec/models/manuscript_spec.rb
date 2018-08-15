require 'rails_helper'

RSpec.describe Manuscript, type: :model do
  describe "validations" do
    it "is valid with valid attributes" do
      user = FactoryBot.create(:user, email: "fake1@sharklasers.com")
      manuscript = FactoryBot.build(:manuscript, user: user)
      expect(manuscript).to be_valid
    end

    it "is not valid without title" do
      user2 = FactoryBot.create(:user, email: "fake1@sharklasers.com")
      manuscript_no_name = FactoryBot.build(:manuscript, title: "", user: user2)
      expect(manuscript_no_name).to_not be_valid
    end
  end
end
