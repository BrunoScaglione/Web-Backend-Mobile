json.extract! solicitante, :id, :cep, :nome, :cpf, :telefone, :email, :senha, :paypal, :descricao, :avaliacao, :autoridade, :created_at, :updated_at
json.url solicitante_url(solicitante, format: :json)
