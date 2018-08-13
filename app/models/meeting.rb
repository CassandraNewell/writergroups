class Meeting < ApplicationRecond
  belongs_to :group
  belongs_to :creator, class_name: "User"

  validates :datetime, :location, :creator_id, presence: true
end
