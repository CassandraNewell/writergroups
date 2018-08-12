class Group < ApplicationRecord
  has_many :memberships
  has_many :users, through: :memberships

  has_many :messages

  belongs_to :owner, class_name: "User"

  validates :name, :description, presence: true
end
