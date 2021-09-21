# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_12_10_090348) do

  create_table "events", force: :cascade do |t|
    t.string "titulo"
    t.string "local"
    t.string "descricao"
    t.integer "privacidade"
    t.integer "criador"
    t.date "date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "groups", force: :cascade do |t|
    t.string "nome"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "pagamentos", force: :cascade do |t|
    t.decimal "quantia", precision: 10, scale: 2
    t.date "date"
    t.integer "user_id"
  end

  create_table "planos", force: :cascade do |t|
    t.string "nome"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "posts", force: :cascade do |t|
    t.string "titulo"
    t.string "mensagem"
    t.integer "group_id"
    t.date "date"
  end

  create_table "treinos", force: :cascade do |t|
    t.string "nome"
    t.string "descricao"
    t.integer "group_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_groups", force: :cascade do |t|
    t.integer "user_id"
    t.integer "group_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.integer "authority", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "nome"
    t.string "genero"
    t.date "nascimento"
    t.string "registro"
    t.string "telefone"
    t.string "rg"
    t.string "cpf"
    t.string "endereco"
    t.string "estado_civil"
    t.string "profissao"
    t.integer "plano"
    t.date "data_filiacao"
    t.date "inicio_plano"
    t.string "agencia"
    t.string "conta"
    t.string "cref"
  end

end
