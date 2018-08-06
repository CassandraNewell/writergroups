class Api::V1::GroupsController < ApiController
  before_action :authorize_user

  def authorize_user
    if !user_signed_in? || !current_user.admin?
      raise ActionController::RoutingError.new("Not Found")
    end
  end

  def index
    if params[:scope] == "memberOf"
      # later: only groups user is a member of
      groups = [Group.first, Group.second]
    elsif params[:scope] == "notMemberOf"
      # later: only groups user is not a member of
      groups = [Group.third, Group.last]
    else
      groups = Group.all
    end

    render json: groups
  end

end
