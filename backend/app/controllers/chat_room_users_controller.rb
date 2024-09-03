class ChatRoomUsersController < ApplicationController
  before_action :set_chat_room

  # POST /chat_rooms/:chat_room_id/chat_room_users
  def create
    @chat_room_user = @chat_room.chat_room_users.new(user_id: params[:user_id])

    if @chat_room_user.save
      render json: @chat_room_user, status: :created
    else
      render json: @chat_room_user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /chat_rooms/:chat_room_id/chat_room_users/:id
  def destroy
    @chat_room_user = @chat_room.chat_room_users.find(params[:id])
    @chat_room_user.destroy
    head :no_content
  end

  private

  def set_chat_room
    @chat_room = ChatRoom.find(params[:chat_room_id])
  end
end
