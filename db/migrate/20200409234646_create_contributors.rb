class CreateContributors < ActiveRecord::Migration[5.2]
  def change
    create_table :contributors do |t|
      t.string :username
      t.integer :project_id

      t.timestamps
    end
  end
end
