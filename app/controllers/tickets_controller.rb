class TicketsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create, :update]
  before_action :authenticate_user!, only: [:create, :update]

  def create
    stage = Stage.find(params[:stage_id])
    ticket = stage.tickets.create(ticket_params.merge(user: current_user))
    ticket.update_attribute(:username, current_user.username)
  end

  def index
    project = Project.find(params[:project_id])
    render json: project.tickets.as_json()
  end

  def update
    ticket = Ticket.find(params[:id])
    ticket.update_attributes(ticket_params)
    render json: ticket.as_json()
  end

  private

  def ticket_params
    params.require(:ticket).permit(:description, :project_id, :stage_id)
  end

end
