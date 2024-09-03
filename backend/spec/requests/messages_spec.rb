# spec/requests/messages_spec.rb

require 'rails_helper'

RSpec.describe 'Messages', type: :request do
  let(:user) { create(:user) }
  let(:chat_room) { create(:chat_room) }
  let(:headers) { { 'Authorization' => "Bearer #{JsonWebToken.encode(user_id: user.id)}" } }

  before do
    chat_room.users << user
  end

  describe 'GET /chat_rooms/:chat_room_id/messages' do
    context 'when the request is valid' do
      let!(:messages) { create_list(:message, 3, chat_room: chat_room, user: user) }

      before { get "/chat_rooms/#{chat_room.id}/messages", headers: headers }

      it 'returns messages' do
        expect(response).to have_http_status(200)
        expect(json.size).to eq(3) # Assuming `json` is a helper to parse JSON response
      end
    end

    context 'when the request is unauthenticated' do
      before { get "/chat_rooms/#{chat_room.id}/messages" }

      it 'returns unauthorized' do
        expect(response).to have_http_status(401)
        expect(response.body).to match(/Missing token/)
      end
    end
  end

  describe 'POST /chat_rooms/:chat_room_id/messages' do
    let(:valid_attributes) { { content: 'Hello, world!' } }

    context 'when the request is valid' do
      before { post "/chat_rooms/#{chat_room.id}/messages", params: { message: valid_attributes }, headers: headers }

      it 'creates a message' do
        expect(response).to have_http_status(201)
        expect(json['content']).to eq('Hello, world!')
      end
    end

    context 'when the request is unauthenticated' do
      before { post "/chat_rooms/#{chat_room.id}/messages", params: { message: valid_attributes } }

      it 'returns unauthorized' do
        expect(response).to have_http_status(401)
        expect(response.body).to match(/Missing token/)
      end
    end

    context 'when the message content is invalid' do
      before { post "/chat_rooms/#{chat_room.id}/messages", params: { message: { content: '' } }, headers: headers }

      it 'returns unprocessable entity' do
        expect(response).to have_http_status(422)
        expect(response.body).to match(/can't be blank/)
      end
    end
  end
end
