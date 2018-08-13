class UserSeeder

  def self.seed!
    3.times do |index|
      puts "*** User ##{index + 1} ***"
      first_name = Faker::Name.first_name
      last_name = Faker::Name.last_name
      email = first_name + last_name + '@sharklasers.com'
      password = "jjjjjj"

      User.create!(
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password
      )
    end
  end
end
