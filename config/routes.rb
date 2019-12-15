Rails.application.routes.draw do
  namespace :v1, defaults: { format: "json" } do
    get "games", to: "games#index"
    get "games/new", to: "games#new"
    get "games/evaluate", to: "games#evaluate"
    
  end

  # Formward root to HomeController#index
  root "home#index"

  # match "*path", to: "home#index", via: :all

  # Forward all requests to HomeController#index
  # Except for ajax requests and HTML Mime types
  # This excludes the ('/') path.
  get "*page", to: "home#index", constraints: ->(req) do
                 !req.xhr? && req.format.html?
               end

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
