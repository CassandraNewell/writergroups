require 'rails_helper'

RSpec.describe Group, type: :model do
  xdescribe "validations" do
    let!(:user) { FactoryBot.build(:group) }

    it "is valid with valid attributes" do
      expect(group).to be_valid
    end
  end
end
