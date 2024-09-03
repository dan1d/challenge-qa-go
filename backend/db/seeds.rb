# db/seeds.rb

# Create Users
users = [
  { email: 'test1@example.com', display_name: 'Test User 1', password: 'password123' },
  { email: 'test2@example.com', display_name: 'Test User 2', password: 'password123' },
  { email: 'reviewer@example.com', display_name: 'Reviewer', password: 'review123' },
  { email: 'admin@example.com', display_name: 'Admin User', password: 'admin123' },
  { email: 'random@example.com', display_name: 'Random User', password: 'random123' }
]

users.each do |user_data|
  user = User.find_or_initialize_by(email: user_data[:email])
  user.display_name = user_data[:display_name]
  user.password = user_data[:password]
  user.save!
end

puts "Created #{users.size} users"

# Retrieve the created users
test1 = User.find_by(email: 'test1@example.com')
test2 = User.find_by(email: 'test2@example.com')
reviewer = User.find_by(email: 'reviewer@example.com')
admin = User.find_by(email: 'admin@example.com')
random = User.find_by(email: 'random@example.com')

# Create Common Chat Rooms
common_rooms = [
  { name: 'General Chat', is_private: false },
  { name: 'Random Discussions', is_private: false },
  { name: 'Announcements', is_private: false }
]

common_rooms.each do |room_data|
  chat_room = ChatRoom.find_or_create_by(room_data)
  chat_room.users << [test1, test2, reviewer, admin, random]
  chat_room.save!
end

puts "Created #{common_rooms.size} common chat rooms"

# Create 1-on-1 Chat Rooms
one_on_one_rooms = [
  { user1: test1, user2: test2 },
  { user1: test1, user2: reviewer },
  { user1: reviewer, user2: admin }
]

one_on_one_rooms.each do |room_data|
  chat_room = ChatRoom.create!(is_private: true)
  chat_room.users << [room_data[:user1], room_data[:user2]]
  chat_room.save!

  # Adding some initial messages
  Message.create!(content: "Hello, this is #{room_data[:user1].display_name}!", user: room_data[:user1], chat_room: chat_room)
  Message.create!(content: "Hi, #{room_data[:user1].display_name}! This is #{room_data[:user2].display_name}.", user: room_data[:user2], chat_room: chat_room)
end

puts "Created #{one_on_one_rooms.size} 1-on-1 chat rooms with initial messages"
