class SolicitantesController < ApplicationController
  before_action :set_solicitante, only: [:show, :edit, :update, :destroy]

  # GET /solicitantes
  # GET /solicitantes.json
  def index
    @solicitantes = Solicitante.all
  end

  # GET /solicitantes/1
  # GET /solicitantes/1.json
  def show
  end

  # GET /solicitantes/new
  def new
    @solicitante = Solicitante.new
  end

  # GET /solicitantes/1/edit
  def edit
  end

  # POST /solicitantes
  # POST /solicitantes.json
  def create
    @solicitante = Solicitante.new(solicitante_params)

    respond_to do |format|
      if @solicitante.save
        format.html { redirect_to @solicitante, notice: 'Solicitante was successfully created.' }
        format.json { render :show, status: :created, location: @solicitante }
      else
        format.html { render :new }
        format.json { render json: @solicitante.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /solicitantes/1
  # PATCH/PUT /solicitantes/1.json
  def update
    respond_to do |format|
      if @solicitante.update(solicitante_params)
        format.html { redirect_to @solicitante, notice: 'Solicitante was successfully updated.' }
        format.json { render :show, status: :ok, location: @solicitante }
      else
        format.html { render :edit }
        format.json { render json: @solicitante.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /solicitantes/1
  # DELETE /solicitantes/1.json
  def destroy
    @solicitante.destroy
    respond_to do |format|
      format.html { redirect_to solicitantes_url, notice: 'Solicitante was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_solicitante
      @solicitante = Solicitante.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def solicitante_params
      params.require(:solicitante).permit(:cep, :nome, :cpf, :telefone, :email, :senha, :paypal, :descricao, :avaliacao, :autoridade)
    end
end
