require "application_system_test_case"

class CuidadorsTest < ApplicationSystemTestCase
  setup do
    @cuidador = cuidadors(:one)
  end

  test "visiting the index" do
    visit cuidadors_url
    assert_selector "h1", text: "Cuidadors"
  end

  test "creating a Cuidador" do
    visit cuidadors_url
    click_on "New Cuidador"

    fill_in "Autoridade", with: @cuidador.autoridade
    fill_in "Avaliacao", with: @cuidador.avaliacao
    fill_in "Cep", with: @cuidador.cep
    fill_in "Cpf", with: @cuidador.cpf
    fill_in "Descricao", with: @cuidador.descricao
    fill_in "Email", with: @cuidador.email
    fill_in "Nome", with: @cuidador.nome
    fill_in "Paypal", with: @cuidador.paypal
    fill_in "Senha", with: @cuidador.senha
    fill_in "Telefone", with: @cuidador.telefone
    click_on "Create Cuidador"

    assert_text "Cuidador was successfully created"
    click_on "Back"
  end

  test "updating a Cuidador" do
    visit cuidadors_url
    click_on "Edit", match: :first

    fill_in "Autoridade", with: @cuidador.autoridade
    fill_in "Avaliacao", with: @cuidador.avaliacao
    fill_in "Cep", with: @cuidador.cep
    fill_in "Cpf", with: @cuidador.cpf
    fill_in "Descricao", with: @cuidador.descricao
    fill_in "Email", with: @cuidador.email
    fill_in "Nome", with: @cuidador.nome
    fill_in "Paypal", with: @cuidador.paypal
    fill_in "Senha", with: @cuidador.senha
    fill_in "Telefone", with: @cuidador.telefone
    click_on "Update Cuidador"

    assert_text "Cuidador was successfully updated"
    click_on "Back"
  end

  test "destroying a Cuidador" do
    visit cuidadors_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Cuidador was successfully destroyed"
  end
end
