class TicketsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create, :update, :destroy]
  before_action :authenticate_user!, only: [:create, :update, :destroy]

  def index
    project = Project.find(params[:project_id])
    render json: project.tickets.as_json()
  end

  def create
    stage = Stage.find(params[:stage_id])
    project = Project.find(params[:project_id])
    if project.is_project_contributor?(current_user, project)
      ticket = stage.tickets.create(ticket_params.merge(user: current_user))
      ticket.update_attribute(:username, current_user.username)
      ActionCable.server.broadcast 'projects',
        update_is_needed: "for_tickets",
        project_id: stage.project_id
      head :ok
    end
  end

  def update
    project = Project.find(params[:project_id])
    if project.is_project_contributor?(current_user, project)
      if Ticket.find_by_id(params[:id])
        ticket = Ticket.find(params[:id])
        ticket.update_attributes(ticket_params)
        ActionCable.server.broadcast 'projects',
          update_is_needed: "for_tickets",
          project_id: ticket.project_id
        head :ok
      end
    end
  end

  def destroy
    project = Project.find(params[:project_id])
    if project.is_project_contributor?(current_user, project)
      ticket = Ticket.find(params[:id])
      ticket.destroy
      ActionCable.server.broadcast 'projects',
        update_is_needed: "for_tickets",
        project_id: project.id
      head :ok
    end
  end

  private

  def ticket_params
    params.require(:ticket).permit(:description, :project_id, :stage_id)
  end

end
