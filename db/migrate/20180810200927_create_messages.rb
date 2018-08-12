class CreateMessages < ActiveRecord::Migration[5.2]
  def change
    create_table :messages do |t|
      t.string :body, null: false
      t.belongs_to :chat
      t.belongs_to :user

      t.timestamps null: false
    end
  end
end
