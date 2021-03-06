class CreateManuscripts < ActiveRecord::Migration[5.2]
  def change
    create_table :manuscripts do |t|
      t.string :title, null: false
      t.string :description

      t.belongs_to :user, null: false
      t.belongs_to :group, null: false

      t.timestamps null: false
    end
  end
end
