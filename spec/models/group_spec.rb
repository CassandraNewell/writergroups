require 'rails_helper'

RSpec.describe Group, type: :model do
  describe "validations" do
    it "is valid with valid attributes" do
      group = FactoryBot.build(:group)
      expect(group).to be_valid
    end

    it "is not valid without name" do
      group_no_name = FactoryBot.build(:group, name: "")
      expect(group_no_name).to_not be_valid
    end

    it "is not valid without description" do
      group_no_desc = FactoryBot.build(:group, description: "")
      expect(group_no_desc).to_not be_valid
    end
  end
end
