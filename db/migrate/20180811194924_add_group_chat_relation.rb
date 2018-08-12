class AddGroupChatRelation < ActiveRecord::Migration[5.2]
  def change
    change_table :groups do |t|
      t.belongs_to :chat
    end
    remove_column :chats, :title, :string
    remove_column :chats, :description, :string
  end
end
