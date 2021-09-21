class CreateTreinos < ActiveRecord::Migration[5.2]
  def change
    create_table :treinos do |t|
      t.string :nome
      t.string :descricao
      t.integer :group_id
      t.timestamps
    end
  end
end
