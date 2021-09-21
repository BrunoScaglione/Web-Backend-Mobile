class AddTreinadorToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :agencia, :string
    add_column :users, :conta, :string
    add_column :users, :cref, :string
  end
end
