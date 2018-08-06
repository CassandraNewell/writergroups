FactoryBot.define do
  factory :group do
    size_max Random.new.rand(6..10)
    size_min Random.new.rand(1..5)
    intensity Random.new.rand(1..3)

    location Faker::TwinPeaks.location
    mtg_datetime Faker::Time.forward(60, :evening)
    mtg_frequency "Once every so often"

    genre Faker::Book.genre
  end
end
