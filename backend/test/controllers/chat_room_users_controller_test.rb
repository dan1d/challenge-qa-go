require "test_helper"

class ChatRoomUsersControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get chat_room_users_create_url
    assert_response :success
  end

  test "should get destroy" do
    get chat_room_users_destroy_url
    assert_response :success
  end
end
