class UsersController < ApplicationController
  skip_before_action :authorize_request, only: %i[create login]

  # POST /register
  def create
    user = User.new(user_params)
    user.password = params[:password]
    if user.save
      token = JsonWebToken.encode(user_id: user.id)
      render json: { token: token }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # POST /login
  def login
    user = User.find_by_email(params[:email])
    if user&.authenticate(params[:password])
      token = JsonWebToken.encode(user_id: user.id)
      render json: { token: token, user: user }, status: :ok
    else
      render json: { errors: 'Invalid email or password' }, status: :unauthorized
    end
  end

  # GET /profile
  def show
    render json: current_user, status: :ok
  end

  # PUT /profile
  def update
    if current_user.update(user_params)
      render json: { message: 'Profile updated successfully' }, status: :ok
    else
      render json: { errors: current_user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.permit(:email, :display_name, :password, :avatar_url)
  end
end
