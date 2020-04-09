class StagesController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]
  before_action :authenticate_user!, only: [:create]

  def create
    project = Project.find(params[:project_id])
    stage = project.stages.create(stage_params)
    ActionCable.server.broadcast 'projects',
      update_needed: "for_stages",
      project_id: stage.project_id
    head :ok
  end

  def index
    project = Project.find(params[:project_id])
    render json: project.stages.as_json()
  end

  private

  def stage_params
    params.require(:stage).permit(:name)
  end

end
