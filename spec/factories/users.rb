FactoryBot.define do
  first_name = Faker::Name.first_name
  last_name = Faker::Name.last_name
  email = first_name + last_name + "@sharklasers.com"

  factory :user, aliases: [:owner, :creator] do
    first_name first_name
    last_name last_name

    email email

    password 'password'
    password_confirmation 'password'
  end
end
