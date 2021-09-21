json.extract! cuidador, :id, :nome, :cep, :cpf, :telefone, :email, :senha, :paypal, :descricao, :avaliacao, :autoridade, :created_at, :updated_at
json.url cuidador_url(cuidador, format: :json)
