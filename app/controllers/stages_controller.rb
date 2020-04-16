class StagesController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create, :destroy]
  before_action :authenticate_user!, only: [:create, :destroy]

  def create
    project = Project.find(params[:project_id])
    if project.is_project_contributor?(current_user, project)
      stage = project.stages.create(stage_params)
      ActionCable.server.broadcast 'projects',
        update_is_needed: "for_stages",
        project_id: stage.project_id
      head :ok
    end
  end

  def index
    project = Project.find(params[:project_id])
    render json: project.stages.as_json()
  end

  def destroy
    project = Project.find(params[:project_id])
    if project.is_project_contributor?(current_user, project)
      stage = Stage.find(params[:id])
      stage.destroy
      stage.tickets.destroy_all
      ActionCable.server.broadcast 'projects',
        update_is_needed: "for_stages",
        project_id: stage.project_id
      head :ok
    end
  end

  private

  def stage_params
    params.require(:stage).permit(:name)
  end

end
