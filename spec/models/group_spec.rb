require 'rails_helper'

RSpec.describe Group, type: :model do
  describe "validations" do
    let!(:group) { FactoryBot.build(:group) }
    let!(:group_no_name) { FactoryBot.build(:group, name: "") }
    let!(:group_no_desc) { FactoryBot.build(:group, description: "") }

    it "is valid with valid attributes" do
      expect(group).to be_valid
    end

    it "is not valid without name" do
      expect(group_no_name).to_not be_valid
    end

    it "is not valid without description" do
      expect(group_no_desc).to_not be_valid
    end
  end
end
