class AddProjectIdToTickets < ActiveRecord::Migration[5.2]
  def change
    add_column :tickets, :project_id, :integer
  end
end
