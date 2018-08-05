class CreateGroups < ActiveRecord::Migration[5.2]
  def change
    create_table :groups do |t|
      t.belongs_to :user, null: false

      t.string :owner, null: false

      t.string :location
      t.string :frequency
      t.string :time
      t.string :genre
      t.integer :intensity 

      t.timestamps null: false
    end
  end
end
