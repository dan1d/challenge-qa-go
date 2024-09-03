# app/models/user.rb

class User < ApplicationRecord
  has_secure_password

  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :display_name, presence: true
  validates :password, presence: true, length: { minimum: 6 }, if: :password_digest_changed?

  has_many :chat_room_users, dependent: :destroy
  has_many :chat_rooms, through: :chat_room_users
  has_many :messages, dependent: :destroy

  before_validation :downcase_email

  private

  def downcase_email
    self.email = email.downcase if email.present?
  end
end
