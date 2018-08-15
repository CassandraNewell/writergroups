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
      first_name: "David",
      last_name: "Heinemeier Hansson",
      email: "dhh@sharklasers.com",
      password: "jjjjjj"
    }
  ]

  def self.seed!
    USERS.each do |user|
      user = User.create(user)
    end
  end
end
