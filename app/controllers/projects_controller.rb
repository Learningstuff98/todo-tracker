class ProjectsController < ApplicationController
  before_action :authenticate_user!, only: [:new, :create]

  def index
    @projects = Project.order("title").page(params[:page]).per_page(2)
  end

  def new
    @project = Project.new
  end

  def create
    @project = current_user.projects.create(project_params)
    redirect_to root_path
  end

  private

  def project_params
    params.require(:project).permit(:title, :description)
  end

end
