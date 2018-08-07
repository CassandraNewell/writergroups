class Api::V1::MembershipsController < ApiController
  def create
    membership = Membership.new({
      user: current_user,
      group_id: params[:group]
    })

    if membership.save
      payload = {
        groups: Group.where(
          "id NOT IN (:incumbent_group_ids)",
          incumbent_group_ids: current_user.groups.pluck(:id)
        )
      }
    else
      payload = { errors: membership.errors.full_messages }
    end

    render json: payload
  end
end
