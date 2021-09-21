class AddAtletaToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :nome, :string
    add_column :users, :genero, :string
    add_column :users, :nascimento, :date
    add_column :users, :registro, :string
    add_column :users, :telefone, :string
    add_column :users, :rg, :string
    add_column :users, :cpf, :string
    add_column :users, :endereco, :string
    add_column :users, :estado_civil, :string
    add_column :users, :profissao, :string
    add_column :users, :plano, :integer
    add_column :users, :data_filiacao, :date
    add_column :users, :inicio_plano, :date
  end
end
