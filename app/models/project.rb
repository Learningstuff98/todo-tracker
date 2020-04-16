class Project < ApplicationRecord
  belongs_to :user
  has_many :stages
  has_many :tickets
  has_many :contributors
  validates :title, presence: true, length: { minimum: 1 }
  validates :description, presence: true, length: { minimum: 1 }

  def is_project_contributor?(user, project)
    self.all_contributor_usernames(project.contributors).include?(user.username)
  end

  def all_contributor_usernames(contributors)
    contributors.collect { |contributor| contributor[:username] }
  end

  def destroy_all_model_instances(project)
    project.contributors.destroy_all
    project.stages.destroy_all
    project.tickets.destroy_all
  end

end
