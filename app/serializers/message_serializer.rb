class MessageSerializer < ActiveModel::Serializer
  attributes :id, :body, :created_at_date, :created_at_time, :commenter_name

  def commenter_name
    "#{object.user.first_name} #{object.user.last_name}"
  end

  def created_at_date
    object.created_at.strftime("%B %d, %Y")
  end

  def created_at_time
    object.created_at.strftime("%l:%M %p")
  end
end
