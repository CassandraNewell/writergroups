class RemoveChatRefs < ActiveRecord::Migration[5.2]
  def change
    remove_reference :messages, :chat
    remove_reference :groups, :chat
  end
end
