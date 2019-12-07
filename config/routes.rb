Rails.application.routes.draw do
  #get 'home/index'
  root 'home#index'
  match '*path', to: 'home#index', via: :all
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
