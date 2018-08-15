class AddFileToManuscript < ActiveRecord::Migration[5.2]
  def change
    add_column :manuscripts, :manuscript_file, :string
  end
end
