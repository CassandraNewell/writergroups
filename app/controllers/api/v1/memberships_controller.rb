class Api::V1::MembershipsController < ApiController
  def create
    membership = Membership.new({
      user: current_user,
      group_id: params[:group]
    })

    if membership.save
      # notMemberArray = (Group.all - current_user.groups - current_user.owned_groups).sort

      payload = {
        # groups: ActiveModel::Serializer::CollectionSerializer.new(notMemberArray, each_serializer: GroupSerializer)
      }
    else
      payload = { errors: membership.errors.full_messages }
    end
    render json: payload

  end
end
