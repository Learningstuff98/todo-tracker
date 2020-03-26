class TicketsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]
  before_action :authenticate_user!, only: [:create]

  def create
    stage = Stage.find(params[:stage_id])
    ticket = stage.tickets.create(ticket_params.merge(user: current_user))
    ticket.update_attribute(:username, current_user.username)
  end

  def index
    project = Project.find(params[:project_id])
    stage = Stage.find(params[:stage_id])
    render json: stage.tickets.as_json()
  end

  private

  def ticket_params
    params.require(:ticket).permit(:name, :description)
  end

end
