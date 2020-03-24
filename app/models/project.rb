class Project < ApplicationRecord
  belongs_to :user
  has_many :stages
  validates :title, presence: true, length: { minimum: 1 }
  validates :description, presence: true, length: { minimum: 1 }
end
