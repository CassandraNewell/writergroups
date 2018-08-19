class Api::V1::UsersController < ApiController
  before_action :authorize_user, except: [:index]

  def index
    if params[:scope] == "checkUser"
      if current_user
        user_info = SimpleUserSerializer.new(current_user)
        render json: { current_user: user_info }
      else
        render json: { current_user: nil }
      end
    end
  end
end
