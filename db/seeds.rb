# Generate admin and member

puts "****** Seeding admin ******"
if !User.first
  puts "Did not find preexisting admin"
  User.create!(
    first_name: "Casi",
    last_name: "Newell",
    email: "cassandra.newell@pm.me",
    password: "jjjjjj",
    role: "admin"
  )
end

puts "****** Seeding user 1 ******"
if !User.second
  User.create!(
    first_name: "Kara",
    last_name: "Manke",
    email: "cassandraleenewell@gmail.com",
    password: "jjjjjj"
  )
end

puts "****** Seeding users 3-5 ******"
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

puts "****** Seeding groups 1-5 ******"
5.times do
  Group.create!(
    name: Faker::Myst.age,
    description: Faker::Lebowski.quote,
    owner_id: Random.new.rand(1..5)
  )
end

puts "****** Seeding memberships ******"
Membership.create!(
  user: User.first,
  group: Group.first
)

Membership.create!(
  user: User.first,
  group: Group.third
)

Membership.create!(
  user: User.second,
  group: Group.second
)

Membership.create!(
  user: User.second,
  group: Group.fourth
)
