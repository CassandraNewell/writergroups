class Api::V1::MembershipsController < ApiController
  def create
    membership = Membership.new({
      user: current_user,
      group_id: params[:group]
    })

    if membership.save
      payload = {}
    else
      payload = {
        errors: membership.errors.full_messages
      }
    end
    render json: payload
  end
end
