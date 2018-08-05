require 'rails_helper'

RSpec.describe Group, type: :model do
  describe "validations" do
    let!(:group) { FactoryBot.build(:group) }

    it "is valid with valid attributes" do
      expect(group).to be_valid
    end
  end
end
