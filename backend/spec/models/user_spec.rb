# spec/models/user_spec.rb

require 'rails_helper'

RSpec.describe User, type: :model do
  before do
    create(:user)
  end

  it { should validate_presence_of(:email) }
  it { should validate_uniqueness_of(:email).case_insensitive }
  it { should validate_presence_of(:display_name) }
  it { should have_secure_password }
  it { should have_many(:chat_room_users) }
  it { should have_many(:chat_rooms).through(:chat_room_users) }
  it { should have_many(:messages) }
end
