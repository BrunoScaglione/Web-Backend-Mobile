require "application_system_test_case"

class SolicitantesTest < ApplicationSystemTestCase
  setup do
    @solicitante = solicitantes(:one)
  end

  test "visiting the index" do
    visit solicitantes_url
    assert_selector "h1", text: "Solicitantes"
  end

  test "creating a Solicitante" do
    visit solicitantes_url
    click_on "New Solicitante"

    fill_in "Autoridade", with: @solicitante.autoridade
    fill_in "Avaliacao", with: @solicitante.avaliacao
    fill_in "Cep", with: @solicitante.cep
    fill_in "Cpf", with: @solicitante.cpf
    fill_in "Descricao", with: @solicitante.descricao
    fill_in "Email", with: @solicitante.email
    fill_in "Nome", with: @solicitante.nome
    fill_in "Paypal", with: @solicitante.paypal
    fill_in "Senha", with: @solicitante.senha
    fill_in "Telefone", with: @solicitante.telefone
    click_on "Create Solicitante"

    assert_text "Solicitante was successfully created"
    click_on "Back"
  end

  test "updating a Solicitante" do
    visit solicitantes_url
    click_on "Edit", match: :first

    fill_in "Autoridade", with: @solicitante.autoridade
    fill_in "Avaliacao", with: @solicitante.avaliacao
    fill_in "Cep", with: @solicitante.cep
    fill_in "Cpf", with: @solicitante.cpf
    fill_in "Descricao", with: @solicitante.descricao
    fill_in "Email", with: @solicitante.email
    fill_in "Nome", with: @solicitante.nome
    fill_in "Paypal", with: @solicitante.paypal
    fill_in "Senha", with: @solicitante.senha
    fill_in "Telefone", with: @solicitante.telefone
    click_on "Update Solicitante"

    assert_text "Solicitante was successfully updated"
    click_on "Back"
  end

  test "destroying a Solicitante" do
    visit solicitantes_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Solicitante was successfully destroyed"
  end
end
