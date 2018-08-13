class CreateMeetings < ActiveRecord::Migration[5.2]
  def change
    create_table :meetings do |t|
      t.datetime :datetime, null: false
      t.string :location, null: false

      t.integer :creator_id, null: false

      t.belongs_to :group, null: false

      t.timestamps null: false
    end
  end
end
