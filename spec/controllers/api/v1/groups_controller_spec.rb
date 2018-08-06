require "rails_helper"

RSpec.describe Api::V1::GroupsController, type: :controller do
  let!(:group1) { FactoryBot.create(:group) }
  let!(:group2) { FactoryBot.create(:group) }

  describe "GET#index" do
    it "should return a list of all groups" do

      get :index
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 2
      expect(reviews[0]["name"]).to eq group1.name
      expect(reviews[1]["name"]).to eq group2.name
    end
  end
end
