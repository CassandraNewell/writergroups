class AddMessageGroupRelation < ActiveRecord::Migration[5.2]
  def change
    add_reference :messages, :group, null: false
  end
end
