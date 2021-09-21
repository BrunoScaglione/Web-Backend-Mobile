class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.string :titulo
      t.string :local
      t.string :descricao
      t.integer :privacidade
      t.integer :criador
      t.date :date
      t.timestamps
    end
  end
end
