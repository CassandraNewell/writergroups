FactoryBot.define do
  factory :group do
    size_min Random.new.rand(1..5)
    size_max Random.new.rand(6..10)
    sequence(:location) {|n| "Bio for user#{n} with some text." }
    sequence(:mtg_date) { Faker::Internet.email }
    sequence(:mtg_frequency) { Faker::Internet.email }
    sequence(:genre) { "https://pixel.nymag.com/imgs/daily/vulture/2017/03/24/barbie/24-barbie.w710.h473.jpg" }
    sequence(:intensity) { "https://pixel.nymag.com/imgs/daily/vulture/2017/03/24/barbie/24-barbie.w710.h473.jpg" }
    password 'password'
    password_confirmation 'password'
  end
end
