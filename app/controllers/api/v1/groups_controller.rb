class Api::V1::GroupsController < ApiController
  before_action :authorize_user, except: :index

  def index
    if current_user
      memberArray = current_user.groups + current_user.owned_groups
      if params[:scope] == "memberOf"
        payload = {
          groups: serializeGroupArray(memberArray),
          current_user: current_user
        }
      elsif params[:scope] == "notMemberOf"
        payload = {
          groups: serializeGroupArray(Group.all - memberArray),
          current_user: current_user
        }
      else
        payload = {
          groups: serializeGroupArray(Group.all),
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

  def show
    group = Group.find(params[:id])

    payload = {
      group: GroupSerializer.new(group),
      messages: serializeMessageArray(group.messages),
      members: serializeMemberArray(group.users),
      manuscripts: group.manuscripts
    }

    render json: payload
  end

  def create
    group = Group.new(group_data)
    group.owner = current_user

    if group.save
      payload = {
        groups: serializeGroupArray(current_user.groups + current_user.owned_groups)
      }
    else
      payload = {
        errors: group.errors.full_messages
      }
    end
    render json: payload
  end

  private
  def group_data
    params.require(:group).permit(:name, :description)
  end

  def serializeMessageArray(data)
    ActiveModel::Serializer::CollectionSerializer.new(data, each_serializer: MessageSerializer)
  end

  def serializeGroupArray(data)
    ActiveModel::Serializer::CollectionSerializer.new(data, each_serializer: GroupSerializer)
  end

  def serializeMemberArray(data)
    ActiveModel::Serializer::CollectionSerializer.new(data, each_serializer: UserSerializer)
  end

  def authorize_user
    if !user_signed_in?
      raise ActionController::RoutingError.new("User is not signed in")
    end
  end
end
