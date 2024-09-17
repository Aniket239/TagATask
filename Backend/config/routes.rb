Rails.application.routes.draw do
  get 'tasks/create' to: 'tasks#create'
  post 'tasks/create' to: 'tasks#create'

  get 'tasks/update' to: 'tasks#update'
  post 'tasks/update' to: 'tasks#update'

  get 'tasks/delete' to: 'tasks#delete'
  post 'tasks/delete' to: 'tasks#delete'

  get 'tasks/read' to: 'tasks#read'
  post 'tasks/read' to: 'tasks#read'

end
