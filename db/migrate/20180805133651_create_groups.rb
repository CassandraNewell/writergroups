class CreateGroups < ActiveRecord::Migration[5.2]
  def change
    create_table :groups do |t|
      t.belongs_to :user, null: false

      t.integer :size_max, null: false
      t.integer :size_min, null: false
      t.integer :intensity, null: false

      t.string :location, null: false
      t.string :mtg_frequency, null: false
      t.string :mtg_datetime, null: false

      t.string :owner, null: false
      t.string :genre, null: false

      t.timestamps null: false
    end
  end
end
