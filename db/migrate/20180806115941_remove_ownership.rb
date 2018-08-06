class RemoveOwnership < ActiveRecord::Migration[5.2]
  def change
    remove_column :groups, :owner, :string, null: false
  end
end
