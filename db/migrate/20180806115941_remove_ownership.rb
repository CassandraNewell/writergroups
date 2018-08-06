class RemoveOwnership < ActiveRecord::Migration[5.2]
  def change
    remove_column :groups, :owner, :string
  end
end
