AdminSeeder.seed!

if !Rails.env.production?
  3.times do
    first_name = Faker::Name.first_name
    last_name = Faker::Name.last_name
    email = first_name + last_name + '@sharklasers.com'

    User.create!(
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: "jjjjjj"
    )
  end

  puts "****** Seeding Groups ******"
  15.times do |index|
    puts "Group ##{index + 1}"
    newgroup = Group.create!(
      name: Faker::Myst.age,
      description: Faker::Lebowski.quote,
      owner_id: Random.new.rand(1..5)
    )
  end
end
