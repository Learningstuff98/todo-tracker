require 'rails_helper'

RSpec.describe ContributorsController, type: :controller do
  describe "contributors#create action" do
    it "should require that a user be logged in" do
      project = FactoryBot.create(:project)
      post :create, params: {
        project_id: project.id,
        contributor: {
          username: "contributor username"
        }
      }
      expect(response).to redirect_to new_user_session_path
    end

    it "should let project owners add contributors" do
      project = FactoryBot.create(:project)
      sign_in project.user
      post :create, params: {
        project_id: project.id,
        contributor: {
          username: "contributor username"
        }
      }
      contributor = project.contributors.last
      expect(contributor.username).to eq "contributor username"
    end

    it "should only let project owners add contributors" do
      project = FactoryBot.create(:project)
      user = FactoryBot.create(:user)
      sign_in user
      post :create, params: {
        project_id: project.id,
        contributor: {
          username: "contributor username"
        }
      }
      contributor = project.contributors.last
      expect(contributor).to eq nil
    end
  end

  describe "contributors#destroy action" do
    it "should require that a user be logged in" do
      contributor = FactoryBot.create(:contributor)
      project = FactoryBot.create(:project)
      delete :destroy, params: {
        project_id: project.id,
        id: contributor.id
      }
      expect(response).to redirect_to new_user_session_path
    end

    it "should let project owners remove contributors" do
      contributor = FactoryBot.create(:contributor)
      project = FactoryBot.create(:project)
      sign_in project.user
      delete :destroy, params: {
        project_id: project.id,
        id: contributor.id
      }
      expect(response).to have_http_status(:found)
      contributor = Contributor.find_by_id(contributor.id)
      expect(contributor).to eq nil
    end

    it "should only let the projects owner remove contributors" do
      contributor = FactoryBot.create(:contributor)
      project = FactoryBot.create(:project)
      user = FactoryBot.create(:user)
      sign_in user
      delete :destroy, params: {
        project_id: project.id,
        id: contributor.id
      }
      contributor = Contributor.find_by_id(contributor.id)
      expect(contributor.username).to eq "contributor username"
    end
  end
end
