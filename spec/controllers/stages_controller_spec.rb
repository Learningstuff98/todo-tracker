require 'rails_helper'

RSpec.describe StagesController, type: :controller do
  describe "stages#create action" do
    it "should require that users be logged in" do
      project = FactoryBot.create(:project)
      contributor = FactoryBot.create(:contributor)
      project.contributors.push(contributor)
      user = FactoryBot.create(:user)
      user.update_attribute(:username, project.contributors.last.username)
      post :create, params: {
        project_id: project.id,
        stage: {
          name: "stage name"
        }
      }
      expect(response).to redirect_to new_user_session_path
    end

    it "should let contributors make stages" do
      project = FactoryBot.create(:project)
      contributor = FactoryBot.create(:contributor)
      project.contributors.push(contributor)
      user = FactoryBot.create(:user)
      user.update_attribute(:username, project.contributors.last.username)
      sign_in user
      post :create, params: {
        project_id: project.id,
        stage: {
          name: "stage name"
        }
      }
      expect(project.stages.last.name).to eq "stage name"
    end

    it "should only let project contributors make stages" do
      project = FactoryBot.create(:project)
      contributor = FactoryBot.create(:contributor)
      project.contributors.push(contributor)
      user = FactoryBot.create(:user)
      sign_in user
      post :create, params: {
        project_id: project.id,
        stage: {
          name: "stage name"
        }
      }
      expect(project.stages.last).to eq nil
    end
  end

  describe "stages#destroy action" do
    it "should require that users be logged in" do
      project = FactoryBot.create(:project)
      contributor = FactoryBot.create(:contributor)
      project.contributors.push(contributor)
      user = FactoryBot.create(:user)
      user.update_attribute(:username, project.contributors.last.username)
      stage = FactoryBot.create(:stage)
      delete :destroy, params: {
        project_id: project.id,
        id: stage.id
      }
      expect(response).to redirect_to new_user_session_path
    end

    it "should let project contributors delete stages" do
      project = FactoryBot.create(:project)
      contributor = FactoryBot.create(:contributor)
      project.contributors.push(contributor)
      user = FactoryBot.create(:user)
      user.update_attribute(:username, project.contributors.last.username)
      sign_in user
      stage = FactoryBot.create(:stage)
      project.stages.push(stage)
      delete :destroy, params: {
        project_id: project.id,
        id: stage.id
      }
      expect(project.stages.last).to eq nil
    end

    it "should only let project contributors delete stages" do
      project = FactoryBot.create(:project)
      contributor = FactoryBot.create(:contributor)
      project.contributors.push(contributor)
      user = FactoryBot.create(:user)
      sign_in user
      stage = FactoryBot.create(:stage)
      project.stages.push(stage)
      delete :destroy, params: {
        project_id: project.id,
        id: stage.id
      }
      expect(project.stages.last.name).to eq "stage name"
    end
  end
end
