class Group < ApplicationRecord
  has_many :memberships
  has_many :users, through: :memberships

  # enum intensity: {chill: -1, average: 0, intense: 1}

  validates :name, :description, presence: true
end
