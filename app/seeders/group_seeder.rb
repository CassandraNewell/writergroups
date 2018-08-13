class GroupSeeder

  def self.seed!
    10.times do |index|
      puts "*** Group ##{index + 1} ***"
      newgroup = Group.create!(
        name: Faker::Myst.age,
        description: Faker::Lebowski.quote,
        owner_id: Random.new.rand(1..5)
      )
    end
  end
end
