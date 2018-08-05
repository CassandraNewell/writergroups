class Group < ApplicationRecord
  has_many :users

  # enum intensity: {chill: -1, average: 0, intense: 1}

  validates :owner, :location, :mtg_frequency, :mtg_datetime, :genre, :intensity, presence: true
end
