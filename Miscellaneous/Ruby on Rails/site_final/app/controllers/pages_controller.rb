class PagesController < ApplicationController

	def home_solicitante
		@pets = #falta fazer query aqui pra pegar sh os do current user
	    @solicitantes = # fazer query pra pegar soh foto, descricao e avaliacao
	    #colocar a parte de busca, mensagens, link pra editar perfil, link pra adicionar pet tudo no mesmo html
	end
		

	def home_cuidador
	end
