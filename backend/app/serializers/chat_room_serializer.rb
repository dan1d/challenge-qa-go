class ChatRoomSerializer < ActiveModel::Serializer
  include Camelize

  attributes :id, :name, :is_private, :created_at, :updated_at

  has_many :messages
  has_many :users, through: :chat_room_users

  def name
    if object.is_private
      # Find the other user in the private chat room
      other_user = object.users.where.not(id: current_user.id).first
      "#{other_user.display_name}" if other_user
    else
      object.name
    end
  end
end
