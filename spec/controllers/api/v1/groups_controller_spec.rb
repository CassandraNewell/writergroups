require "rails_helper"

RSpec.describe Api::V1::GroupsController, type: :controller do
  let!(:user1) { FactoryBot.create(:user) }
  let!(:user2) { FactoryBot.create(:user, email: "somethingelse@sharklasers.com") }
  let!(:admin) { FactoryBot.create(:user, role: "admin", email: "somethingelseagainrs@sharklasers.com") }
  let!(:group1) { FactoryBot.create(:group, owner: user1) }
  let!(:group2) { FactoryBot.create(:group, owner: user2) }


  describe "GET#index" do
    it "should return a list of all groups" do
      sign_in admin

      get :index
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 1

      expect(returned_json["groups"][0]["name"]).to eq group1.name
      expect(returned_json["groups"][1]["name"]).to eq group2.name
    end
  end
end
