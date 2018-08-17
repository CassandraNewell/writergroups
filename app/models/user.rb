class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # mount_uploader :profile_photo, ProfilePhotoUploader

  has_many :messages
  has_many :manuscripts

  has_many :memberships
  has_many :groups, through: :memberships

  has_many :owned_groups, class_name: "Group", foreign_key: "owner_id"

  validates :email, :role, :first_name, :last_name, :encrypted_password, presence: true

  def admin?
    role == "admin"
  end

  def assoc_groups
    self.groups + self.owned_groups
  end
end
