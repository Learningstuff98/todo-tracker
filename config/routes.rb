Rails.application.routes.draw do
  mount ActionCable.server => '/cable'
  devise_for :users
  root 'projects#index'
  resources :users, only: [:show]
  resources :projects, only: [:new, :create, :show, :edit] do
    resources :contributors, only: [:create]
    resources :stages, only: [:create, :index, :destroy] do
      resources :tickets, only: [:create]
    end
  end
  resources :projects do
    resources :tickets, only: [:index, :destroy, :update]
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
