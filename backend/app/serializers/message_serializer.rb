class MessageSerializer < ActiveModel::Serializer
  include Camelize

  attributes :id, :content, :created_at
  belongs_to :user
end
