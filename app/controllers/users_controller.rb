class UsersController < ApplicationController
  
  def show
    @user = User.find(params[:id])
    @projects = @user.projects.all
  end
     
end
