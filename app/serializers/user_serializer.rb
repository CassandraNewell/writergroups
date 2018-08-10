class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :role, :all_groups

  def all_groups
    object.groups + object.owned_groups
  end
end
