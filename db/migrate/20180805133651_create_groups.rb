class CreateGroups < ActiveRecord::Migration[5.2]
  def change
    create_table :groups do |t|
      t.belongs_to :user, null: false

      t.string :owner, null: false

      t.string :location, null: false 
      t.string :frequency, null: false
      t.string :time, null: false
      t.string :genre, null: false
      t.integer :intensity, null: false

      t.timestamps null: false
    end
  end
end
