class Api::V1::GroupsController < ApiController
  before_action :authorize_user

  def authorize_user
    if !user_signed_in? || !current_user.admin?
      raise ActionController::RoutingError.new("Not Found")
    end
  end

  def index
    render json: Group.all
  end


end
