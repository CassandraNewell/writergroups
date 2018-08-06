class UpdateUserReqs < ActiveRecord::Migration[5.2]
  def change
    change_table :users do |t|
      t.string :first_name,         null: false
      t.string :last_name,          null: false
      t.string :role,               null: false, default: 'member'
    end
  end
end
