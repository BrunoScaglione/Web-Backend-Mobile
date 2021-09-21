class PlanosController < ApplicationController
  before_action :set_plano, only: [:show, :edit, :update, :destroy]

  def index
    @planos = Plano.all
  end

  def show
  end

  def new
    @plano = Plano.new
  end

  def edit
  end

  def create
    @plano = Plano.new(plano_params)
    if @plano.save
      redirect_to planos_path
    else
      render :new
    end
  end

  def update
    if @plano.update(plano_params)
      redirect_to planos_path
    else
      render :edit
    end
  end

  def destroy
    @plano.destroy
    redirect_to planos_path
  end

  private
  def set_plano
    @plano = Plano.find(params[:id])
  end

  def plano_params
    params.require(:plano).permit(:nome)
  end
end