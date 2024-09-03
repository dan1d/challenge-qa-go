Rails.application.routes.draw do
  get 'messages/index'
  get 'messages/create'
  get 'chat_room_users/create'
  get 'chat_room_users/destroy'
  get 'chat_rooms/index'
  get 'chat_rooms/create'
  get 'chat_rooms/show'
  get 'chat_rooms/destroy'
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
