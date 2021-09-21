class PagamentosController < ApplicationController
  before_action :set_pagamento, only: [:show, :edit, :update, :destroy]

  def index
    @pagamentos = Pagamento.all
  end

  def show
  end

  def new
    @pagamento = Pagamento.new
  end

  def edit
  end

  def create
    @pagamento = Pagamento.new(pagamento_params)
    if @pagamento.save
      redirect_to pagamentos_path
    else
      render :new
    end
  end

  def update
    if @pagamento.update(pagamento_params)
      redirect_to pagamentos_path
    else
      render :edit
    end
  end

  def destroy
    @pagamento.destroy
    redirect_to pagamentos_path
  end

  private
  def set_pagamento
    @pagamento = Pagamento.find(params[:id])
  end

  def pagamento_params
    params.require(:pagamento).permit(:quantia, :date, :user_id)
  end
end