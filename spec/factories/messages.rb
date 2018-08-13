FactoryBot.define do
  factory :message do
    body Faker::Community.quotes
    user
    group 
  end
end
