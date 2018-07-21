class RemoveUserIdFromGroup < ActiveRecord::Migration[5.0]
  def change
    remove_column :groups, :user_id, :integer
  end
end
