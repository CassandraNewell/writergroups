class Group < ApplicationRecord
  has_many :users

  # enum intensity: {chill: -1, average: 0, intense: 1}

  validates :owner, :location, :frequency, :time, :genre, :intensity, :timestamps, presence: true
end
