class Api::V1::GroupsController < ApiController
  before_action :authorize_user, except: :index

  def authorize_user
    if !user_signed_in?
      raise ActionController::RoutingError.new("User is not signed in")
    end
  end

  def index
    if current_user
      if params[:scope] == "memberOf"
        payload = {
          groups: current_user.groups,
          current_user: current_user
        }
      elsif params[:scope] == "notMemberOf"
        other_groups = Group.where(
          "id NOT IN (:incumbent_group_ids)",
          incumbent_group_ids: current_user.groups.pluck(:id)
        )
        payload = {
          groups: other_groups,
          current_user: current_user
        }
      else
        payload = {
          groups: Group.all,
          current_user: current_user
        }
      end
    else
      payload = {
        groups: [],
        current_user: nil
      }
    end

    render json: payload
  end

end
