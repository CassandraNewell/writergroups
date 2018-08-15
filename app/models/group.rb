class Group < ApplicationRecord
  has_many :memberships
  has_many :users, through: :memberships

  has_many :messages
  has_many :manuscripts

  has_many :meetings

  belongs_to :owner, class_name: "User"

  validates :name, :description, presence: true
end
