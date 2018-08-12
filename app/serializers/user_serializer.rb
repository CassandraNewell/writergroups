class UserSerializer < ActiveModel::Serializer
  attributes :id, :fullname, :email, :role, :all_groups

  def all_groups
    object.groups + object.owned_groups
  end

  def fullname
    "#{object.first_name} #{object.last_name}"
  end
end
