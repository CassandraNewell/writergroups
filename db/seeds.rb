# Generate admin and member

User.create!(
  first_name: "Casi",
  last_name: "Newell",
  email: "cassandra.newell@pm.me",
  password: "jjjjjj",
  role: "admin",
)

User.create!(
  first_name: "Kara",
  last_name: "Manke",
  email: "cassandraleenewell@gmail.com",
  password: "jjjjjj",
  role: "member",
)

5.times do
  Group.create!(
    name: Faker::Myst.age,
    description: Faker::Lebowski.quote
  )
end
