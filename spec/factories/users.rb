FactoryBot.define do
  factory :user, aliases: [:owner, :creator] do
    user_first_name = Faker::Name.first_name
    user_last_name = Faker::Name.last_name
    user_email = user_first_name + user_last_name + "@sharklasers.com"

    first_name user_first_name
    last_name user_last_name

    email user_email

    password 'password'
    password_confirmation 'password'
  end
end
