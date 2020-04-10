class ContributorsController < ApplicationController
  before_action :authenticate_user!
  
  def create
    project = Project.find(params[:project_id])
    if current_user == project.user
      project.contributors.create(contributor_params)
      redirect_to project_path(project)
    end
  end

  private

  def contributor_params
    params.require(:contributor).permit(:username)
  end

end
