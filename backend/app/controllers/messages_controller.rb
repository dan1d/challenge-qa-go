class MessagesController < ApplicationController
  before_action :set_chat_room

  # GET /chat_rooms/:chat_room_id/messages
  def index
    if @chat_room.is_private && !@chat_room.user_in_room?(current_user)
      return render json: { error: 'Access denied' }, status: :forbidden
    end

    @messages = @chat_room.messages.order(created_at: :asc)
    render json: @messages, include: :user
  end

  # POST /chat_rooms/:chat_room_id/messages
  def create
    if @chat_room.is_private && !@chat_room.user_in_room?(current_user)
      return render json: { error: 'Access denied' }, status: :forbidden
    end

    @message = @chat_room.messages.new(message_params)
    @message.user = current_user

    if @message.save
      render json: @message, status: :created
    else
      render json: @message.errors, status: :unprocessable_entity
    end
  end

  private

  def set_chat_room
    @chat_room = ChatRoom.find(params[:chat_room_id])
  end

  def message_params
    params.require(:message).permit(:content)
  end
end
