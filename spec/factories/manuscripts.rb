FactoryBot.define do
  factory :manuscript do
    title Faker::Book.title
    user
    group
  end
end
