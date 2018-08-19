class SimpleUserSerializer < ActiveModel::Serializer
  # Serializer for homepage; checks whether user is signed in

  attributes :id
end
