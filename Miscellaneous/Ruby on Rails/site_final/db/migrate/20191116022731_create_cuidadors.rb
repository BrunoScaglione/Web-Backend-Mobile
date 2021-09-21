class CreateCuidadors < ActiveRecord::Migration[5.2]
  def change
    create_table :cuidadors do |t|
      t.string :nome
      t.string :cep
      t.string :cpf
      t.string :telefone
      t.string :email
      t.string :senha
      t.string :paypal
      t.text :descricao
      t.int :avaliacao
      t.int :autoridade

      t.timestamps
    end
  end
end
