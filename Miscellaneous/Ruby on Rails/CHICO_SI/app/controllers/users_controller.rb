class UsersController < ApplicationController

  before_action :set_user, only: [:edit, :update, :show, :destroy]
  before_action :require_authority_1, only: [:new, :index, :show]
  before_action :require_authority_2, only: [:destroy]

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      redirect_to user_path(@user)
    else
      render 'new'
    end
  end

  def index
    @users = User.all
  end

  def show
  end

  def show_current
    @user = User.find(session[:user_id])
  end

  def edit
    unless can_access_this_action?(current_user)
      flash[:error] = 'Você não pode editar esse usuário!'
      redirect_back fallback_location: root_path
    end
  end

  def update
    if @user.update(user_params)
      redirect_to user_path(@user)
    else
      render 'edit'
    end
  end

  def destroy
    @user.destroy
    redirect_to users_path
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :authority, :nome, :genero, :nascimento, :registro,
                                 :telefone, :rg, :cpf, :endereco, :estado_civil, :profissao, :plano,
                                 :data_filiacao, :inicio_plano, :agencia, :conta, :cref, group_ids: [])
  end

  def set_user
    @user = User.find(params[:id])
  end

  def can_access_this_action?(user)
    return true if user.authority > @user.authority
    user.id == @user.id
  end

  def require_authority_2
    if current_user.authority < 2
      flash[:danger] = 'Você não tem permissão para isso!'
      redirect_to root_path
    end
  end

  def require_authority_1
    if current_user.authority < 1
      flash[:danger] = 'Você não tem permissão para isso!'
      redirect_to root_path
    end
  end

end