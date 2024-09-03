class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :display_name, :avatar_url
end
