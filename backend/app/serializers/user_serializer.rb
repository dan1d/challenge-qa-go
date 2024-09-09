class UserSerializer < ActiveModel::Serializer
  include Camelize

  attributes :id, :email, :display_name, :avatar_url
end
