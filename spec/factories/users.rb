FactoryBot.define do
  factory :user do
    sequence(:first_name) { Faker::Name.first_name }
    sequence(:last_name) { Faker::Name.last_name }
    sequence(:bio) {|n| "Bio for user#{n} with some text." }
    sequence(:email) { Faker::Internet.email }
    sequence(:profile_photo) { "https://pixel.nymag.com/imgs/daily/vulture/2017/03/24/barbie/24-barbie.w710.h473.jpg" }
    password 'password'
    password_confirmation 'password'
  end
end
