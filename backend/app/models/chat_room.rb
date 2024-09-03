class ChatRoom < ApplicationRecord
  has_many :messages
  has_many :chat_room_users
  has_many :users, through: :chat_room_users

  validates :is_private, inclusion: { in: [true, false] }

  scope :public_rooms, -> { where(is_private: false) }

  def user_in_room?(user)
    return true unless is_private
    users.exists?(user.id)
  end
end
