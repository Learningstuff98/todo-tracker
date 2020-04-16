Rails.application.routes.draw do
  mount ActionCable.server => '/cable'
  devise_for :users
  root 'projects#index'
  resources :users, only: [:show]
  resources :projects, only: [:new, :create, :show, :destroy] do
    resources :contributors, only: [:create, :destroy]
    resources :stages, only: [:create, :index, :destroy] do
      resources :tickets, only: [:create]
    end
  end
  resources :projects do
    resources :tickets, only: [:index, :destroy, :update]
  end
end
