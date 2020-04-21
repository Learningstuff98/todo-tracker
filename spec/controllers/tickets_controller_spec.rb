require 'rails_helper'

RSpec.describe TicketsController, type: :controller do
  describe "tickets#create action" do
    it "should let contributors make tickets" do
      project = FactoryBot.create(:project)
      stage = FactoryBot.create(:stage)
      contributor = FactoryBot.create(:contributor)
      project.contributors.push(contributor)
      user = FactoryBot.create(:user)
      user.update_attribute(:username, project.contributors.last.username)
      sign_in user
      post :create, params: {
        project_id: project.id,
        stage_id: stage.id,
        ticket: {
          description: "ticket description",
          username: user.username
        }
      }
      expect(stage.tickets.last.description).to eq "ticket description"
      expect(stage.tickets.last.username).to eq user.username
      expect(stage.tickets.last.stage_id).to eq stage.id
    end

    it "should require that users be logged in" do
      project = FactoryBot.create(:project)
      stage = FactoryBot.create(:stage)
      contributor = FactoryBot.create(:contributor)
      project.contributors.push(contributor)
      user = FactoryBot.create(:user)
      user.update_attribute(:username, project.contributors.last.username)
      post :create, params: {
        project_id: project.id,
        stage_id: stage.id,
        ticket: {
          description: "ticket description",
          username: user.username
        }
      }
      expect(response).to redirect_to new_user_session_path
    end

    it "should only let project contributors make tickets" do
      project = FactoryBot.create(:project)
      stage = FactoryBot.create(:stage)
      contributor = FactoryBot.create(:contributor)
      project.contributors.push(contributor)
      user = FactoryBot.create(:user)
      sign_in user
      post :create, params: {
        project_id: project.id,
        stage_id: stage.id,
        ticket: {
          description: "ticket description",
          username: user.username
        }
      }
      expect(stage.tickets.count).to eq 0
    end
  end

  describe "tickets#destroy action" do
    it "should let contributors delete tickets" do
      project = FactoryBot.create(:project)
      contributor = FactoryBot.create(:contributor)
      project.contributors.push(contributor)
      user = FactoryBot.create(:user)
      user.update_attribute(:username, project.contributors.last.username)
      sign_in user
      ticket = FactoryBot.create(:ticket)
      project.tickets.push(ticket)
      delete :destroy, params: {
        project_id: project.id,
        id: ticket.id
      }
      expect(project.tickets.count).to eq 0
    end

    it "should require that a user be logged in" do
      project = FactoryBot.create(:project)
      contributor = FactoryBot.create(:contributor)
      project.contributors.push(contributor)
      user = FactoryBot.create(:user)
      user.update_attribute(:username, project.contributors.last.username)
      ticket = FactoryBot.create(:ticket)
      project.tickets.push(ticket)
      delete :destroy, params: {
        project_id: project.id,
        id: ticket.id
      }
      expect(response).to redirect_to new_user_session_path
    end

    it "should only let project contributors delete tickets" do
      project = FactoryBot.create(:project)
      contributor = FactoryBot.create(:contributor)
      project.contributors.push(contributor)
      user = FactoryBot.create(:user)
      sign_in user
      ticket = FactoryBot.create(:ticket)
      project.tickets.push(ticket)
      delete :destroy, params: {
        project_id: project.id,
        id: ticket.id
      }
      expect(project.tickets.count).to eq 1
    end
  end
end
