class CreateGroups < ActiveRecord::Migration[5.2]
  def change
    create_table :groups do |t|
      t.belongs_to :user, null: false
      t.string :name, null: false
      t.string :description, null: false

      t.timestamps null: false
    end
  end
end
