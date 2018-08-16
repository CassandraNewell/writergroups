class Api::V1::ManuscriptsController < ApiController
  before_action :authorize_user

  def create
    manuscript = Manuscript.new({
      title: params[:title],
      description: params[:description],
      manuscript_file: params[:manuscript_file],
      group: Group.find(params[:group_id])
      })
    manuscript.user = current_user

    if manuscript.save
      payload = {
        manuscript: manuscript
      }
    else
      payload = {
        errors: manuscript.errors.full_messages
      }
    end
    render json: payload
  end

  private
  def manuscript_params
    params.require(:manuscript).permit(:title, :description, :file)
  end

end
