# spec/factories/users.rb

FactoryBot.define do
  factory :user do
    email { Faker::Internet.email }
    display_name { Faker::Name.name }
    password { 'password123' }
  end
end
