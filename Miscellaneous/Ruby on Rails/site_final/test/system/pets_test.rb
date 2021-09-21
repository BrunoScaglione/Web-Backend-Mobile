require "application_system_test_case"

class PetsTest < ApplicationSystemTestCase
  setup do
    @pet = pets(:one)
  end

  test "visiting the index" do
    visit pets_url
    assert_selector "h1", text: "Pets"
  end

  test "creating a Pet" do
    visit pets_url
    click_on "New Pet"

    fill_in "Comentario", with: @pet.comentario
    fill_in "Especie", with: @pet.especie
    fill_in "Nome", with: @pet.nome
    fill_in "Porte", with: @pet.porte
    fill_in "Raca", with: @pet.raca
    fill_in "Solicitante", with: @pet.solicitante_id
    click_on "Create Pet"

    assert_text "Pet was successfully created"
    click_on "Back"
  end

  test "updating a Pet" do
    visit pets_url
    click_on "Edit", match: :first

    fill_in "Comentario", with: @pet.comentario
    fill_in "Especie", with: @pet.especie
    fill_in "Nome", with: @pet.nome
    fill_in "Porte", with: @pet.porte
    fill_in "Raca", with: @pet.raca
    fill_in "Solicitante", with: @pet.solicitante_id
    click_on "Update Pet"

    assert_text "Pet was successfully updated"
    click_on "Back"
  end

  test "destroying a Pet" do
    visit pets_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Pet was successfully destroyed"
  end
end
