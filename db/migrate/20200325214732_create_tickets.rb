class CreateTickets < ActiveRecord::Migration[5.2]
  def change
    create_table :tickets do |t|
      t.string :name
      t.string :description
      t.string :username
      t.integer :user_id
      t.integer :stage_id

      t.timestamps
    end
  end
end
