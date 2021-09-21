class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.string :titulo
      t.string :mensagem
      t.integer :group_id
      t.date :date
    end
  end
end
