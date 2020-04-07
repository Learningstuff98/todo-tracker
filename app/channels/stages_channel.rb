class StagesChannel < ApplicationCable::Channel

  def subscribed
    stream_from 'stages'
  end

end
