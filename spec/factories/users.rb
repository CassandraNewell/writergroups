FactoryBot.define do
  factory :user, aliases: [:owner] do
    first_name Faker::Name.first_name
    last_name Faker::Name.last_name

    sequence(:bio) {|n| "Bio for user#{n} with some text." }
    email Faker::Internet.email

    profile_photo "https://pixel.nymag.com/imgs/daily/vulture/2017/03/24/barbie/24-barbie.w710.h473.jpg"

    password 'password'
    password_confirmation 'password'
  end
end
