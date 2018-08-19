class Api::V1::GroupsController < ApiController
  before_action :authorize_user, except: [:index]

  def index
    if current_user
      if params[:scope] == "memberOf"
        selectedGroups = current_user.assoc_groups
      elsif params[:scope] == "notMemberOf"
        selectedGroups = Group.all - current_user.assoc_groups
      else
        selectedGroups = Group.all
      end
    end

    render json: { groups: serializeArray(selectedGroups, GroupSerializer) }
  end

  def show
    group = Group.find(params[:id])

    payload = {
      group: GroupSerializer.new(group),
      messages: serializeArray(group.messages, MessageSerializer),
      members: serializeArray(group.users, UserSerializer),
      manuscripts: group.manuscripts
    }

    render json: payload
  end

  def create
    group = Group.new(group_data)
    group.owner = current_user

    if group.save
      render json: {
        groups: serializeArray(current_user.assoc_groups, GroupSerializer)
      }
    else
      render json: {
        errors: group.errors.full_messages
      }
    end
  end

  private
  def group_data
    params.require(:group).permit(:name, :description)
  end

  def serializeArray(data, serializer)
    ActiveModel::Serializer::CollectionSerializer.new(data, each_serializer: serializer)
  end

  def authorize_user
    if !user_signed_in?
      raise ActionController::RoutingError.new("User is not signed in")
    end
  end
end
