class CreatePets < ActiveRecord::Migration[5.2]
  def change
    create_table :pets do |t|
      t.string :nome
      t.string :especie
      t.string :raca
      t.string :porte
      t.text :comentario
      t.references :solicitante, foreign_key: true

      t.timestamps
    end
  end
end
