class Api::V1::GroupsController < ApiController
  before_action :authorize_user

  def authorize_user
    if !user_signed_in?
      raise ActionController::RoutingError.new("User is not signed in")
    end
  end

  def index
    if params[:scope] == "memberOf"
      payload = { groups: current_user.groups }
    elsif params[:scope] == "notMemberOf"
      payload = {
        groups: Group.where(
          "id NOT IN (:incumbent_group_ids)",
          incumbent_group_ids: current_user.groups.pluck(:id)
        )
      }
    else
      payload = { groups: Group.all }
    end

    render json: payload
  end

  def create
    group = Group.new(group_data)
    group.users = [current_user]

    if group.save
      payload = { groups: current_user.groups }
    else
      payload = { errors: group.errors.full_messages }
    end

    render json: payload
  end

  private
  def group_data
    params.require(:group).permit(:name, :description)
  end
end
