  def initial
      if logged_in?
        if @current_user.autorithy == 1
          redirect_to home/solicitante_path
        elsif @current_user.autorithy == 2
          redirect_to home/cuidador_path
        end
      end
   end 