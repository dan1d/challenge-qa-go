# spec/factories/messages.rb

FactoryBot.define do
  factory :message do
    content { Faker::Lorem.sentence }
    association :user
    association :chat_room
  end
end
