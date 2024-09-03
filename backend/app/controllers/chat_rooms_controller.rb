class ChatRoomsController < ApplicationController
  before_action :set_chat_room, only: [:show, :destroy]

  # GET /chat_rooms
  def index
    public_room = ChatRoom.public_rooms
    private_room = current_user.chat_rooms.where(is_private: true)

    chat_rooms = public_room + private_room

    render json: chat_rooms, each_serializer: ChatRoomSerializer, current_user: current_user
  end

  # GET /chat_rooms/:id
  def show
    render json: @chat_room, include: [:users, :messages]
  end

  # POST /chat_rooms
  def create
    @chat_room = ChatRoom.new(chat_room_params)

    if @chat_room.save
      render json: @chat_room, status: :created
    else
      render json: @chat_room.errors, status: :unprocessable_entity
    end
  end

  # DELETE /chat_rooms/:id
  def destroy
    @chat_room.destroy
    head :no_content
  end

  private

  def set_chat_room
    @chat_room = ChatRoom.find(params[:id])
  end

  def chat_room_params
    params.require(:chat_room).permit(:name, :is_private)
  end
end
