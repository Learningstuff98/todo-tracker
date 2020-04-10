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
    if @project.valid?
      contributor = @project.contributors.create(username: current_user.username)
      redirect_to project_path(@project)
    else
      render :new, status: :unprocessable_entity
    end
  end

  def show
    @project = Project.find(params[:id])
    @contributor = Contributor.new
  end

  def edit
    project = Project.find(params[:id])
    all_tickets = []
    project.stages.each do |stage|
      stage.tickets.each do |ticket|
        all_tickets.push(ticket)
      end
    end
    render json: all_tickets.as_json()
  end

  private

  def project_params
    params.require(:project).permit(:title, :description)
  end

end
