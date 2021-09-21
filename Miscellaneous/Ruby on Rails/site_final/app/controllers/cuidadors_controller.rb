class CuidadorsController < ApplicationController
  before_action :set_cuidador, only: [:show, :edit, :update, :destroy]


  # GET /cuidadors
  # GET /cuidadors.json
  def index
    @cuidadors = Cuidador.all
  end

  # GET /cuidadors/1
  # GET /cuidadors/1.json
  def show
  end

  # GET /cuidadors/new
  def new
    @cuidador = Cuidador.new
  end

  # GET /cuidadors/1/edit
  def edit
  end

  # POST /cuidadors
  # POST /cuidadors.json
  def create
    @cuidador = Cuidador.new(cuidador_params)

    respond_to do |format|
      if @cuidador.save
        format.html { redirect_to @cuidador, notice: 'Cuidador was successfully created.' }
        format.json { render :show, status: :created, location: @cuidador }
      else
        format.html { render :new }
        format.json { render json: @cuidador.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /cuidadors/1
  # PATCH/PUT /cuidadors/1.json
  def update
    respond_to do |format|
      if @cuidador.update(cuidador_params)
        format.html { redirect_to @cuidador, notice: 'Cuidador was successfully updated.' }
        format.json { render :show, status: :ok, location: @cuidador }
      else
        format.html { render :edit }
        format.json { render json: @cuidador.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /cuidadors/1
  # DELETE /cuidadors/1.json
  def destroy
    @cuidador.destroy
    respond_to do |format|
      format.html { redirect_to cuidadors_url, notice: 'Cuidador was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_cuidador
      @cuidador = Cuidador.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def cuidador_params
      params.require(:cuidador).permit(:nome, :cep, :cpf, :telefone, :email, :senha, :paypal, :descricao, :avaliacao, :autoridade)
    end
end
