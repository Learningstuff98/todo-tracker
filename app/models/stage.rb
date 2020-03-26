class Stage < ApplicationRecord
  belongs_to :project
  has_many :tickets
end
