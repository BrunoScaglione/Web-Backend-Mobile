Rails.application.routes.draw do
  resources :pets
  resources :cuidadors
  resources :solicitantes
	root 'initial#initial'

	get 'home/solicitante', to: 'pages#home_solicitante'
	get 'home/cuidador', to: 'pages#home_cuidador'

	get 'login/solicitante', to: 'sessions_solicitante#new'
	post 'login/solicitante', to: 'sessions_solicitante#create'
	delete 'logout/solicitante', to: 'sessions_solicitante#destroy'

	get 'login/cuidador', to: 'sessions_cuidador#new'
	post 'login/cuidador', to: 'sessions_cuidador#create'
	delete 'logout/cuidador', to: 'sessions_cuidador#destroy'

	get 'cadastro/solicitante', to: 'solicitantes#new'
	post 'cadastro/solicitante', to: 'solicitantes#create'
	get 'solicitantes/:id', to: 'solicitantes#show', as: 'solicitante'
    get 'current_user', to: 'solicitantes#show_current'
	get 'solicitante/:id/edit', to: 'solicitantes#edit', as: 'edit_solicitante'
	patch 'solicitante/:id', to: 'solicitantes#update'
    delete 'solicitante/:id', to: 'solicitantes#destroy'



	get 'cadastro/cuidador', to: 'cuidadores#new'
	post 'cadastro/cuidador', to: 'cuidadores#create'
	get 'cuidador/:id', to: 'cuidadores#show', as: 'cuidador'
    get 'current_user', to: 'cuidadores#show_current'
	get 'cuidador/:id/edit', to: 'cuidadores#edit', as: 'edit_cuidador'
	patch 'cuidador/:id', to: 'cuidadores#update'
    delete 'cuidador/:id', to: 'cuidadores#destroy'

    get 'cadastro/pet', to: 'pets#new'
	post 'cadastro/pet', to: 'pets#create'
	get 'pet/:id', to: 'pets#show', as: 'pet'
	get 'pet/:id/edit', to: 'pets#edit', as: 'edit_pet'
	patch 'pet/:id', to: 'pets#update'
    delete 'pet/:id', to: 'pets#destroy'




  
 # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end








