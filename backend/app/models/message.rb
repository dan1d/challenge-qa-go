class Message < ApplicationRecord
  belongs_to :user
  belongs_to :chat_room

  validates :content, presence: true

  after_create_commit do
    broadcast_message
  end

  private

  def broadcast_message
    serializer = MessageSerializer.new(self)
    ActionCable.server.broadcast(
      "chat_room_#{chat_room.id}",
      serializer.serializable_hash
    )
  end
end
