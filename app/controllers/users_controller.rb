class UsersController < ApplicationController
  
  def show
    @user = User.find(params[:id])
    @projects = @user.projects.order("title").page(params[:page]).per_page(2)
    @search = params["search"]
    if @search.present?
      @title = @search["title"]
      @projects = Project.where("title ILIKE ?", "%#{@title}%")
      @projects = @projects.order("title").page(params[:page]).per_page(2)
    end
  end
     
end
