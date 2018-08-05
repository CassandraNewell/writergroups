class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # mount_uploader :profile_photo, ProfilePhotoUploader

  has_many :groups

  validates :email, :role, :first_name, :last_name, presence: true

  def admin?
    role == "admin"
  end
end
