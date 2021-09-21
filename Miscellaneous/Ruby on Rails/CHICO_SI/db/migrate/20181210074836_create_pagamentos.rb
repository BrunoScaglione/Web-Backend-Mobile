class CreatePagamentos < ActiveRecord::Migration[5.2]
  def change
    create_table :pagamentos do |t|
      t.decimal :quantia, precision: 10, scale: 2
      t.date :date
      t.integer :user_id
    end
  end
end
