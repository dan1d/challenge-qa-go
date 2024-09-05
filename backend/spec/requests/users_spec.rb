# spec/requests/users_spec.rb

require 'rails_helper'

RSpec.describe 'Users API', type: :request do
  let(:user) { create(:user) }
  let(:headers) { { 'Authorization' => "Bearer #{JsonWebToken.encode(user_id: user.id)}" } }

  describe 'POST /register' do
    let(:valid_attributes) { { email: 'user@example.com', display_name: 'User', password: 'password' } }

    context 'when the request is valid' do
      before { post '/register', params: valid_attributes }

      it 'creates a user' do
        expect(json['token']).not_to be_nil
        expect(response).to have_http_status(201)
      end
    end

    context 'when the request is invalid' do
      before { post '/register', params: { email: 'foo' } }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(response.body).to match(/Validation failed/)
      end
    end
  end

  describe 'POST /login' do
    context 'when the credentials are correct' do
      before { post '/login', params: { email: user.email, password: user.password } }

      it 'returns a token' do
        expect(json['token']).not_to be_nil
        expect(response).to have_http_status(200)
      end
    end

    context 'when the credentials are incorrect' do
      before { post '/login', params: { email: user.email, password: 'wrongpassword' } }

      it 'returns status code 401' do
        expect(response).to have_http_status(401)
      end

      it 'returns an error message' do
        expect(response.body).to match(/Invalid email or password/)
      end
    end
  end

  describe 'GET /profile' do
    context 'when the request is valid' do
      before { get '/profile', headers: headers }

      it 'returns the user profile' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the request is unauthorized' do
      before { get '/profile' }

      it 'returns status code 401' do
        expect(response).to have_http_status(401)
      end
    end
  end

  describe 'PUT /profile' do
    let(:valid_attributes) { { display_name: 'New Name' } }

    context 'when the request is valid' do
      before { put '/profile', params: valid_attributes, headers: headers }

      it 'updates the profile' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the request is invalid' do
      before { put '/profile', params: { display_name: '' }, headers: headers }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end
    end
  end
end
