class ChatRoomChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_room_#{params['chat_room_id']}"
  end

  def unsubscribed
    # Cleanup when channel is unsubscribed
  end
end
