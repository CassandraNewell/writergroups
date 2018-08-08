class Api::V1::GroupsController < ApiController
  before_action :authorize_user

  def authorize_user
    if !user_signed_in?
      raise ActionController::RoutingError.new("User is not signed in")
    end
  end

  def index
    if current_user
      signed_in_user = current_user
    else
      signed_in_user = nil
    end

    if params[:scope] == "memberOf"
      payload = { groups: current_user.groups, current_user: signed_in_user }
    elsif params[:scope] == "notMemberOf"
      payload = {
        groups: Group.where(
          "id NOT IN (:incumbent_group_ids)",
          incumbent_group_ids: current_user.groups.pluck(:id)
        ),
        current_user: signed_in_user
      }
    else
      payload = { groups: Group.all, current_user: signed_in_user }
    end

    render json: payload
  end

end
