require 'rails_helper'

RSpec.describe User, type: :model do
  describe "validations" do
    let!(:user) { FactoryBot.build(:user) }
    let!(:user_no_first_name) { FactoryBot.build(:user, first_name: "") }
    let!(:user_no_last_name) { FactoryBot.build(:user, last_name: "") }
    let!(:user_no_email) { FactoryBot.build(:user, email: "") }
    let!(:user_no_bio) { FactoryBot.build(:user, bio: "") }
    let!(:user_no_photo) { FactoryBot.build(:user, profile_photo: "") }
    let!(:user_no_role) { FactoryBot.build(:user, role: "") }

    it "is valid with valid attributes" do
      expect(user).to be_valid
    end

    it "is not valid without a first name" do
      expect(user_no_first_name).to_not be_valid
    end

    it "is not valid without a last name" do
      expect(user_no_last_name).to_not be_valid
    end

    it "is not valid without an email" do
      expect(user_no_email).to_not be_valid
    end

    it "is valid without a bio" do
      expect(user_no_bio).to be_valid
    end

    it "is valid without a profile photo" do
      expect(user_no_photo).to be_valid
    end

    it "is not valid without a role" do
      expect(user_no_role).to_not be_valid
    end
  end

  describe "#admin?" do
    let!(:user) { FactoryBot.build(:user) }
    let!(:admin) { FactoryBot.build(:user, role: "admin") }

    it "is not an admin if the role is not admin" do
      expect(user.admin?).to eq(false)
    end

    it "is an admin if the role is admin" do
      expect(admin.admin?).to eq(true)
    end
  end
end
