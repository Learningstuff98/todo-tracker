require 'rails_helper'

RSpec.describe ProjectsController, type: :controller do
  describe "projects#index action" do
    it "should successfully load the page" do
      get :index
      expect(response).to have_http_status(:success)
    end
  end

  describe "projects#new action" do
    it "should require that a user be logged in" do
      get :new
      expect(response).to redirect_to new_user_session_path
    end

    it "should successfully load the page" do
      user = FactoryBot.create(:user)
      sign_in user
      get :new
      expect(response).to have_http_status(:success)
    end
  end

  describe "projects#create action" do
    it "should require that a user be logged in" do
      post :create, params: {
        project: {
          title: "project title",
          description: "project description"
        }
      }
      expect(response).to redirect_to new_user_session_path
    end

    it "should let users create projects" do
      user = FactoryBot.create(:user)
      sign_in user
      post :create, params: {
        project: {
          title: "project title",
          description: "project description"
        }
      }
      expect(response).to have_http_status(:found)
      project = Project.last
      expect(project.title).to eq("project title")
      expect(project.description).to eq("project description")
      expect(project.user).to eq(user)
    end
  end

  describe "projects#show action" do
    it "should successfully load the page" do
      project = FactoryBot.create(:project)
      get :show, params: { id: project.id }
      expect(response).to have_http_status(:success)
    end
  end

  describe "projects#destroy action" do
    it "should require that a user be logged in" do
      project = FactoryBot.create(:project)
      delete :destroy, params: { id: project.id }
      expect(response).to redirect_to new_user_session_path
    end

    it "should let users delete their projects" do
      project = FactoryBot.create(:project)
      sign_in project.user
      delete :destroy, params: { id: project.id }
      expect(response).to have_http_status(:found)
      project = Project.find_by_id(project.id)
      expect(project).to eq nil
    end

    it "should only let the projects owner delete it" do
      project = FactoryBot.create(:project)
      user = FactoryBot.create(:user)
      sign_in user
      delete :destroy, params: { id: project.id }
      project = Project.find_by_id(project.id)
      project.reload
      expect(project.title).to eq "project title"
      expect(project.description).to eq "project description"
    end
  end
end
