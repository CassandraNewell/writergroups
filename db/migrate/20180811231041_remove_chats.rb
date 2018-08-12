class RemoveChats < ActiveRecord::Migration[5.2]
  def change
    drop_table :chats do |t|
      t.string :title
      t.string :description

      t.timestamps null: false
    end
  end
end
