class Api::V1::GroupsController < ApiController
  before_action :authorize_user

  def authorize_user
    if !user_signed_in?
      raise ActionController::RoutingError.new("User is not signed in")
    end
  end

  def index
    memberArray = (current_user.groups + current_user.owned_groups).sort
    if params[:scope] == "memberOf"
      payload = {
        groups: serializeGroupArray(memberArray)
      }
    elsif params[:scope] == "notMemberOf"
      payload = Group.all - memberArray

      #   groups: Group.joins(
      #     :users
      #   ).where.not(
      #     users: {id: [current_user.id]}
      #   ).where.not(
      #     owners: {id: [current_user.id]}
      #   ).order(
      #     id: :asc
      #   )
      # }

      # payload = {
      #   groups: Group.where(
      #     "id NOT IN (:incumbent_group_ids)",
      #     incumbent_group_ids: current_user.groups.pluck(:id)
      #   )
      # }
    else
      payload = { groups: serializeGroupArray(Group.all.order(id: :asc)) }
    end

    render json: payload
  end

  def create
    group = Group.new(group_data)
    group.owner = current_user

    if group.save

      payload = { groups: serializeGroupArray((current_user.groups + current_user.owned_groups).sort) }
    else
      payload = { errors: group.errors.full_messages }
    end
    render json: payload
  end

  private
  def group_data
    params.require(:group).permit(:name, :description)
  end

  def serializeGroupArray(data)
    ActiveModel::Serializer::ArraySerializer.new(data, each_serializer: GroupSerializer)
  end
end
