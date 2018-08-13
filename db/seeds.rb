puts "****** Seeding Base Users ******"
BaseUserSeeder.seed!

if !Rails.env.production?
  puts "****** Seeding Users ******"
  UserSeeder.seed!

  puts "****** Seeding Groups ******"
  GroupSeeder.seed!
end
