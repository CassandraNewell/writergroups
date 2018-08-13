FactoryBot.define do
  factory :meeting do
    datetime Faker::Time.forward(4, :afternoon)
    location Faker::HarryPotter.location
    creator
    group 
  end
end
