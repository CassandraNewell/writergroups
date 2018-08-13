class BaseUserSeeder
  USERS = [
    {
      first_name: "Cassandra",
      last_name: "Newell",
      email: "cassandraleenewell@gmail.com",
      password: "jjjjjj",
      role: "admin"
    },
    {
      first_name: "Kara",
      last_name: "Manke",
      email: "cassandra.newell@pm.me",
      password: "jjjjjj"
    }
  ]

  def self.seed!
    USERS.each do |user|
      user = User.create(user)
    end
  end
end
