Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'
  get "up" => "rails/health#show", as: :rails_health_check

  post '/register', to: 'users#create'
  post '/login', to: 'users#login'
  get '/profile', to: 'users#show'
  put '/profile', to: 'users#update'

  resources :users, only: [:show, :index]
  resources :chat_rooms, only: [:index, :create, :show, :destroy] do
    resources :chat_room_users, only: [:create, :destroy]

    resources :messages, only: [:index, :create]
  end
end
