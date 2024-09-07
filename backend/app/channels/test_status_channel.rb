class TestStatusChannel < ApplicationCable::Channel
  def subscribed
    stream_from "test_status"
  end

  def unsubscribed
    # Any cleanup needed when the channel is unsubscribed
  end
end
