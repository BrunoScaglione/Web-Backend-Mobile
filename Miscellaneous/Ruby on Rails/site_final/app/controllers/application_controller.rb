class ApplicationController < ActionController::Base

  protect_from_forgery with: :exception

  helper_method :current_user, :require_user, :logged_in?

  def current_user
    if !!session[:solicitante_id]
      @current_user = Solicitante.find(session[:solicitante_id])
    elsif !!session[:cuidador_id]
      @current_user = Cuidador.find(session[:cuidador_id])
    end
  end

  def logged_in?
     !!current_user
  end

  def require_user
    if !logged_in?
      flash[:danger] = 'Você precisa estar logado para fazer isso!'
      redirect_to root_path
    end
  end

end


