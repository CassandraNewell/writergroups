class GroupSeeder

  GROUPS = [
    {
      name: "Fantasyists",
      description: "We write about unicorns and bicorns and such"
    },
    {
      name: "Crimelords",
      description: "Come share your thinly veiled murder fantasies"
    },
    {
      name: "Literary writers",
      description: "Why yes, we do think we're better than everyone else"
    },
    {
      name: "Graphic novels",
      description: '(╯°□°）╯︵ ┻━┻ ||| ┬─┬ノ( ゜-゜ノ) ||| (╯°□°）╯︵ /(.□ . \)'
    }
  ]

  def self.seed!
    GROUPS.each.with_index do |group, index|
      puts "*** Group ##{index + 1} ***"
      Group.create!(
        name: group[:name],
        description: group[:description],
        owner_id: Random.new.rand(1..5)
      )
    end
  end
end
