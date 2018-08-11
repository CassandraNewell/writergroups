class Message < ApplicationRecord
  belongs_to :user
  belongs_to :chat
  belongs_to :group, through: :chat

end
