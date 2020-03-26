Rails.application.routes.draw do
  devise_for :users
  root 'projects#index'
  resources :users, only: [:show]
  resources :projects, only: [:new, :create, :show] do
    resources :stages, only: [:create, :index] do
      resources :tickets, only: [:create, :index]
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
