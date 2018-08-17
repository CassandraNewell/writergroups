class Api::V1::UsersController < ApiController
  def index
    render json: User.all
  end

  def show
    if current_user
      render json: {current_user: current_user}
    else
      render json: {current_user: nil}
    end
  end
end
