# spec/integration/users_spec.rb

require 'swagger_helper'

RSpec.describe 'Users API', type: :request do
  path '/register' do
    post 'Creates a user' do
      tags 'Users'
      consumes 'application/json'
      parameter name: :user, in: :body, schema: {
        type: :object,
        properties: {
          email: { type: :string },
          display_name: { type: :string },
          password: { type: :string }
        },
        required: ['email', 'password']
      }

      response '201', 'user created' do
        let(:user) { { email: 'user@example.com', display_name: 'User', password: 'password' } }
        run_test!
      end

      response '422', 'invalid request' do
        let(:user) { { email: 'foo' } }
        run_test!
      end
    end
  end

  path '/login' do
    post 'Logs in a user' do
      tags 'Users'
      consumes 'application/json'
      parameter name: :user, in: :body, schema: {
        type: :object,
        properties: {
          email: { type: :string },
          password: { type: :string }
        },
        required: ['email', 'password']
      }

      response '200', 'user logged in' do
        let(:user) { { email: 'user@example.com', password: 'password' } }
        run_test!
      end

      response '401', 'invalid credentials' do
        let(:user) { { email: 'user@example.com', password: 'wrongpassword' } }
        run_test!
      end
    end
  end

  path '/profile' do
    get 'Retrieves the user profile' do
      tags 'Users'
      security [bearerAuth: []]
      produces 'application/json'

      response '200', 'profile retrieved' do
        run_test!
      end

      response '401', 'unauthorized' do
        run_test!
      end
    end

    put 'Updates the user profile' do
      tags 'Users'
      security [bearerAuth: []]
      consumes 'application/json'
      parameter name: :user, in: :body, schema: {
        type: :object,
        properties: {
          display_name: { type: :string },
          password: { type: :string },
          avatar_url: { type: :string }
        }
      }

      response '200', 'profile updated' do
        let(:user) { { display_name: 'Updated Name', password: 'newpassword' } }
        run_test!
      end

      response '422', 'invalid request' do
        let(:user) { { display_name: '' } }
        run_test!
      end
    end
  end
end
