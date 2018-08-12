class GroupSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :owner_fullname, :owner_id

  def owner_fullname
    "#{object.owner.first_name} #{object.owner.last_name}"
  end

  def owner_id
    object.owner.id
  end
end
