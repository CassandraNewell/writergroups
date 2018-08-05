# Generate admin and member

User.create(
  first_name: "Casi",
  last_name: "Newell",
  email: "cassandra.newell@pm.me",
  password: "jjjjjj",
  role: "admin",
  profile_photo: Rack::Test::UploadedFile.new(Rails.root.join('app/assets/images/user/profile-default-photo.png'), 'image/png')
)

User.create(
  first_name: "Kara",
  last_name: "Manke",
  email: "cassandraleenewell@gmail.com",
  password: "jjjjjj",
  role: "member",
  profile_photo: Rack::Test::UploadedFile.new(Rails.root.join('app/assets/images/user/profile-default-photo.png'), 'image/png')
)

Group.create(
  name: ,
  size_max: 2,
  size_min: 1,
  intensity: 2,
  location: "Somerville, MA",
  mtg_frequency: "weekly",
  mtg_datetime: "tomorrow",
  owner: User.first,
  genre: "magical realism"
)
