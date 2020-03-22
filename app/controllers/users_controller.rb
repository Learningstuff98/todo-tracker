class UsersController < ApplicationController
  
  def show
    @user = User.find(params[:id])
    @projects = @user.projects.order("title").page(params[:page]).per_page(2)
    # Project.order("title").page(params[:page]).per_page(2)
  end
     
end
