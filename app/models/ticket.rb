class Ticket < ApplicationRecord
  belongs_to :stage
  belongs_to :user
end
