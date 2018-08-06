class Group < ApplicationRecord
  # has_many :users

  # enum intensity: {chill: -1, average: 0, intense: 1}

  validates :name, :description, presence: true
end
