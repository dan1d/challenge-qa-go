# spec/requests/chat_rooms_spec.rb

require 'rails_helper'

RSpec.describe 'ChatRooms', type: :request do
  let(:user) { create(:user) }
  let(:headers) { { 'Authorization' => "Bearer #{JsonWebToken.encode(user_id: user.id)}" } }

  describe 'GET /chat_rooms' do
    context 'when the request is valid' do
      before { get '/chat_rooms', headers: headers }

      it 'returns chat rooms' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the request is missing a token' do
      before { get '/chat_rooms' }

      it 'returns unauthorized' do
        expect(response).to have_http_status(401)
        expect(response.body).to match(/Missing token/)
      end
    end

    context 'when the token is invalid' do
      let(:invalid_token) { 'Bearer ' + JsonWebToken.encode({ user_id: user.id }, Time.now.to_i - 10) } # Expired token
      let(:headers) { { 'Authorization' => invalid_token } }

      before { get '/chat_rooms', headers: headers }

      it 'returns unauthorized' do
        expect(response).to have_http_status(401)
        expect(response.body).to match(/Invalid token/)
      end
    end
  end
end
