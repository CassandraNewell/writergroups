class Group < ApplicationRecord
  has_many :memberships
  has_many :users, through: :memberships

  has_many :chats
  has_many :messages, through: :chats

  belongs_to :owner, class_name: "User"
  belongs_to :group

  validates :name, :description, presence: true
end
