class AddGroupName < ActiveRecord::Migration[5.2]
  def change
    change_table :groups do |t|
      t.string :name, null: false
    end
  end
end
