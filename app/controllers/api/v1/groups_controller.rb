class Api::V1::GroupsController < ApiController
  before_action :authorize_user

  def authorize_user
    if !user_signed_in?
      raise ActionController::RoutingError.new("User is not signed in")
    end
  end

  def index
    if params[:scope] == "memberOf"
      payload = { groups: Group.where(user_id: current_user.id) }
    elsif params[:scope] == "notMemberOf"
      payload = { groups: Group.where.not(user_id: current_user.id) }
    else
      payload = { groups: Group.all }
    end

    render json: payload
  end

end
