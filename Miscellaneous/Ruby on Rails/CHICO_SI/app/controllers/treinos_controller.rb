class TreinosController < ApplicationController
  before_action :set_treino, only: [:show, :edit, :update, :destroy]

  def group_index
    @groups = current_user.groups
  end

  def index
    @treinos = Treino.all
  end

  def show
    @group = Group.find_by(params[:group_id])
  end

  def new
    @treino = Treino.new
  end

  def edit
  end

  def create
    @treino = Treino.new(treino_params)
    @treino.group_id = params[:group_id]
    if @treino.save
      redirect_to treino_group_path(params[:group_id])
    else
      render :new
    end
  end

  def update
    @group = Group.find_by(params[:group_id])
    if @treino.update(treino_params)
      redirect_to treino_group_path(@group.id)
    else
      render :edit
    end
  end

  def destroy
    @group = Group.find_by(params[:group_id])
    @treino.destroy
    redirect_to treino_group_path(@group.id)
  end

  private
  def set_treino
    @treino = Treino.find(params[:id])
  end

  def treino_params
    params.require(:treino).permit(:nome, :descricao, :group_id)
  end
end