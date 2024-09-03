# spec/factories/chat_rooms.rb

FactoryBot.define do
  factory :chat_room do
    name { Faker::Lorem.word }
    is_private { false }

    trait :private do
      is_private { true }
    end
  end
end
