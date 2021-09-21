class SessionsController < ApplicationController

  def new
  end

  def create
    solicitante = Solicitante.find_by(email: params[:session][:email])
    if solicitante && solicitante.authenticate(params[:session][:password])
      session[:solicitante_id] = solicitante.id
      redirect_to_home_path
    else
      flash.now[:danger] = 'Usuario ou senha invalidos'
      render 'new'
    end
  end

  def destroy
    session[:solicitante_id] = nil
    redirect_to root_path
  end

end